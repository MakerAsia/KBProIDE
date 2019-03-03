const path = require('path');
const util = require('util');
const SerialPort = require('serialport');
const execPromise = util.promisify(require('child_process').exec);
const execSync = require('child_process').execSync;

var G = {};
const ospath = function (p) {
    if (process.platform == 'win32') {
        return p.replace(/\//g, '\\');
    }
    return p;
}

function esptool() {
    if (process.platform == 'win32') {
        return `${toolDir}/esptool.exe`;
    } else if (process.platform == 'darwin') {
        return `${toolDir}/esptool`;
    }
    return `${toolDir}/esptool.py`;
}

const getName = (file) => path.basename(file).split('.')[0]

async function readMac(portName)
{
    var cmd = util.format(
        '"%s" --chip esp32 %s read_mac',
        esptool(),
        '--port "' + portName + '" --baud 921600'
    ); 
    var res = execPromise(G.ospath(cmd), {cwd: './'});
    if(res){
        var board_id = '';
        var mac_addr = '';
        var strlst = String(stdout).split(/\r?\n/);
        for (var i in strlst) {
            var str = strlst[i];
            var chlst = str.split(':');
            if (chlst.length == 7) {
                board_id = chlst[4] + chlst[5] + chlst[6];
                mac_addr = (chlst[1] + ':' + chlst[2] + ':' + chlst[3] + ':' + chlst[4] + ':' + chlst[5] + ':' + chlst[6]).trim();
            }
        }
        log.i('reading board mac address (' + mac_addr + ')');
        return {boardId : board_id, mac : mac_addr};
    }
}

const compileFiles = async function (sources, boardCppOptions, boardcflags, plugins_includes_switch, cb) {    
    sources.forEach(async (file, idx, arr) => {
        let filename = getName(file)
        let fn_obj = `${G.app_dir}/${filename}.o`;
        
        let cflags = G.cflags.join(" ") + ' ' + boardcflags.join(" ")
        let cppOptions = G.cpp_options.join(" ") + boardCppOptions.join(" ")
        plugins_includes_switch = plugins_includes_switch.join(" ")

        let cmd = `"${G.COMPILER_CPP}" ${cppOptions} ${cflags} ${plugins_includes_switch} -c "${file}" -o "${fn_obj}"`;        
        try {
            const {stdout, stderr} = await execPromise(G.ospath(cmd), {cwd: G.process_dir})
            if (!stderr) {
                console.log(`compiling... ${path.basename(file)} ok.`);
                // console.log(`${stdout}`);
            } else {
                console.log(`compiling... ${path.basename(file)} ok. (with warnings)`);
                // console.log(`${stderr}`);
            }
        } catch (e) {
            console.log(`compiling... ${file} failed.`)
            cb && cb(e)
        }
        if (idx === arr.length - 1) {
            cb && cb()
        }
    })
}

const setConfig = (context) => {
    let localContext = JSON.parse(fs.readFileSync('./context.json','utf8'))
    G = Object.assign({}, localContext)
    G.Log = require('./log')
    G.board_name = context.board_name   //require boardname
    G.app_dir = context.app_dir         //require app_dir
    G.process_dir = context.process_dir //require working dir

    G.COMPILER_AR = `${G.toolchain_dir}/bin/xtensa-esp32-elf-ar`
    G.COMPILER_GCC = `${G.toolchain_dir}/bin/xtensa-esp32-elf-gcc`
    G.COMPILER_CPP = `${G.toolchain_dir}/bin/xtensa-esp32-elf-c++`
    G.ELF_FILE = `${app_dir}/${G.board_name}.elf`
    G.BIN_FILE = `${app_dir}/${G.board_name}.bin`
    G.ARCHIVE_FILE = `${G.app_dir}/libmain.a`
    G.ospath = ospath
    G.log.i(`process_dir=${G.process_dir}`)
}

async function archiveProgram(plugins_sources) {
    G.log.i(`archiving... ${G.ARCHIVE_FILE} `);
    let obj_files = plugins_sources.map(plugin => `${G.app_dir}/${getName(plugin)}.o`).join(" ")
    var cmd = `"${G.COMPILER_AR}" cru "${G.ARCHIVE_FILE}" ${obj_files}`
    return execPromise(G.ospath(cmd), {cwd: G.process_dir})
}

async function linkObject(ldflags) {
    G.log.i(`linking... ${G.ELF_FILE}`);
    var cmd = `"${G.COMPILER_GCC}"` + ` -nostdlib -u call_user_start_cpu0 -Wl,--gc-sections -Wl,-static -Wl,` +
        `--start-group ${ldflags} -L"${G.app_dir}" -lgcc -lstdc++ -lgcov -Wl,--end-group -Wl,-EL` +
        ` -o "${G.ELF_FILE}"`;

    return execPromise(G.ospath(cmd), {cwd: G.process_dir})
}

async function createBin(flash_mode="dio",flash_freq="40m",flash_size="4MB") {
    G.log.i(`creating bin image... ${G.BIN_FILE}`);
    let cmd = `"${G.esptool}" --chip esp32 elf2image --flash_mode "${flash_mode}" --flash_freq "${flash_freq}" --flash_size "${flash_size}" -o "${G.BIN_FILE}" "${G.ELF_FILE}"`
    return execPromise(G.ospath(cmd), {cwd: G.process_dir})
}

async function flash(port, baudrate, stdio, partition,flash_mode="dio",flash_freq="40m") {
    baudrate = baudrate || 480600
    partition = partition || {
        '0x1000':`./${G.library_dir}/bootloader.bin`,
        '0x8000':`./${G.library_dir}/partitions_singleapp.bin`,
        '0x10000':`./${G.app_dir}/${G.board_name}/${G.board_name}.bin`,
    }
    let formatStringPart = Object.keys(partition).map(p => `${p} "%s"`).join(" ")
    let formatValue = Object.values(partition)
    stdio = stdio || "inherit"
    var flash_cmd = util.format(
        `"${G.esptool}" --chip esp32 %s --before "default_reset" --after "hard_reset" write_flash -z --flash_mode "${flash_mode}" --flash_freq "${flash_freq}" --flash_size detect ${formatStringPart}`,
        `--port "${port}" --baud ${baudrate}`,formatValue        
    );
    execSync(flash_cmd, {cwd: G.process_dir, stdio})
}

module.exports = {
    setConfig,
    createBin,
    linkObject,
    archiveProgram
}