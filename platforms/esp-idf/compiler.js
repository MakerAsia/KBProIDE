const path = require("path");
const util = require("util");
const fs = require("fs");
const execPromise = util.promisify(require("child_process").exec);
const log = require("./log");

var engine = Vue.prototype.$engine;

//---- setup dir and config ----//
var platformName = "esp-idf";
var platformDir = `${engine.util.platformDir}/${platformName}`;
var platformLibDir = `${platformDir}/lib`;
var toolDir = `${platformDir}/tools`;
var config = require(`${platformDir}/config`);

var G = {};
const ospath = function(p) {
    if (process.platform == "win32") {
        return p.replace(/\//g, "\\");
    }
    return p;
};

function esptool() {
    if (process.platform == "win32") {
        return `${toolDir}/esptool.exe`;
    } else if (process.platform == "darwin") {
        return `${toolDir}/esptool`;
    }
    return `${toolDir}/esptool.py`;
}

const getName = (file) => path.basename(file).split(".")[0];

async function readMac(portName) {
    var cmd = util.format(
        "\"%s\" --chip esp32 %s read_mac",
        esptool(),
        "--port \"" + portName + "\" --baud 921600",
    );
    const {stdout, stderr} = await execPromise(ospath(cmd), {cwd: "./"});
    if (!stderr) {
        var board_id = "";
        var mac_addr = "";
        var strlst = String(stdout).split(/\r?\n/);
        for (var i in strlst) {
            var str = strlst[i];
            var chlst = str.split(":");
            if (chlst.length == 7) {
                board_id = chlst[4] + chlst[5] + chlst[6];
                mac_addr = (chlst[1] + ":" + chlst[2] + ":" + chlst[3] + ":" +
                    chlst[4] + ":" + chlst[5] + ":" + chlst[6]).trim();
            }
        }
        log.i("reading board mac address (" + mac_addr + ")");
        return {
            boardId: board_id,
            mac: mac_addr,
        };
    }
}

const compileFiles = function(sources, boardCppOptions, boardcflags,
    plugins_includes_switch) {
    return new Promise((resolve, reject) => {
        let cflags = G.cflags.join(" ") + " " + boardcflags.join(" ");
        let cppOptions = G.cpp_options.join(" ") + boardCppOptions.join(" ");
        let inc_switch = plugins_includes_switch.map(obj => `-I"${obj}"`).
        join(" ");

        sources.forEach(async (file, idx, arr) => {
            let filename = getName(file);
            let fn_obj = `${G.app_dir}/${filename}.o`;

            let cmd = `"${G.COMPILER_CPP}" ${cppOptions} ${cflags} ${inc_switch} -c "${file}" -o "${fn_obj}"`;
            try {
                const {stdout, stderr} = await execPromise(ospath(cmd),
                                                           {cwd: G.process_dir});
                if (!stderr) {
                    console.log(`compiling... ${path.basename(file)} ok.`);
                    // console.log(`${stdout}`);
                } else {
                    console.log(`compiling... ${path.basename(
                        file)} ok. (with warnings)`);
                    // console.log(`${stderr}`);
                }
            } catch (e) {
                console.log(`compiling... ${file} failed.`);
                reject(`compiling... ${file} failed.`);
            }
            if (idx === arr.length - 1) {
                resolve();
            }
        });
    });
};

const setConfig = (context) => {
    let localContext = JSON.parse(
        fs.readFileSync(`${platformDir}/context.json`, "utf8"));
    G = Object.assign({}, localContext);
    G.board_name = context.board_name;   //require boardname
    G.app_dir = context.app_dir;         //require app_dir
    G.process_dir = context.process_dir; //require working dir
    G.cb = context.cb;

    if (!G.cpp_options) {
        G.cpp_options = [];
    }
    G.cflags = G.cflags.map(
        f => f.replace("-Ilib", `-I"${platformDir}/lib`) + "\"");
    G.ldflags = G.ldflags.map(f => f.startsWith("-Llib") ? (f.replace("-Llib",
                                                                      `-L"${platformDir}/lib`) +
        "\"") : f);
    G.ldflags = G.ldflags.map(f => f.startsWith("lib/") ? ("\"" +
        f.replace("lib/", `${platformDir}/lib/`) + "\"") : f);

    G.COMPILER_AR = `${platformDir}/${G.toolchain_dir}/bin/xtensa-esp32-elf-ar`;
    G.COMPILER_GCC = `${platformDir}/${G.toolchain_dir}/bin/xtensa-esp32-elf-gcc`;
    G.COMPILER_CPP = `${platformDir}/${G.toolchain_dir}/bin/xtensa-esp32-elf-c++`;

    G.ELF_FILE = `${G.app_dir}/${G.board_name}.elf`;
    G.BIN_FILE = `${G.app_dir}/${G.board_name}.bin`;
    G.ARCHIVE_FILE = `${G.app_dir}/libmain.a`;
    log.i(`process_dir=${G.process_dir}`);
};

function archiveProgram(plugins_sources) {
    log.i(`archiving... ${G.ARCHIVE_FILE} `);
    let obj_files = plugins_sources.map(
        plugin => `${G.app_dir}/${getName(plugin)}.o`).join(" ");
    var cmd = `"${G.COMPILER_AR}" cru "${G.ARCHIVE_FILE}" ${obj_files}`;
    return execPromise(ospath(cmd), {cwd: G.process_dir});
}

function linkObject(ldflags) {
    log.i(`linking... ${G.ELF_FILE}`);
    let flags = G.ldflags.join(" ") + " " + ldflags.join(" ");
    var cmd = `"${G.COMPILER_GCC}"` +
        ` -nostdlib -u call_user_start_cpu0 -Wl,--gc-sections -Wl,-static -Wl,` +
        `--start-group ${flags} -L"${G.app_dir}" -lgcc -lstdc++ -lgcov -Wl,--end-group -Wl,-EL` +
        ` -o "${G.ELF_FILE}"`;
    return execPromise(ospath(cmd), {cwd: G.process_dir});
}

function createBin(flash_mode = "dio", flash_freq = "40m", flash_size = "4MB") {
    log.i(`creating bin image... ${G.BIN_FILE}`);
    let esptoolPath = esptool();
    let cmd = `"${esptool()}" --chip esp32 elf2image --flash_mode "${flash_mode}" --flash_freq "${flash_freq}" --flash_size "${flash_size}" -o "${G.BIN_FILE}" "${G.ELF_FILE}"`;
    return execPromise(ospath(cmd), {cwd: G.process_dir});
}

function flash(port, baudrate, stdio, partition, flash_mode = "dio",
    flash_freq = "40m") {
    baudrate = baudrate || 480600;
    partition = partition || {
        "0x1000": `${platformLibDir}/bootloader.bin`,
        "0x8000": `${platformLibDir}/partitions_singleapp.bin`,
        "0x10000": `${G.app_dir}/${G.board_name}.bin`,
    };
    let formatStringPart = Object.keys(partition).
    map(p => `${p} "%s"`).
    join(" ");
    let formatValue = Object.values(partition);
    stdio = stdio || "inherit";
    var flash_cmd = util.format(
        `"${esptool()}" --chip esp32 %s --before "default_reset" --after "hard_reset" write_flash -z --flash_mode "${flash_mode}" --flash_freq "${flash_freq}" --flash_size detect ${formatStringPart}`,
        `--port "${port}" --baud ${baudrate}`,
        ...formatValue,
    );
    return execPromise(ospath(flash_cmd), {
        cwd: G.process_dir,
        stdio,
    });
}

module.exports = {
    setConfig,
    createBin,
    linkObject,
    archiveProgram,
    readMac,
    flash,
    compileFiles,
};
