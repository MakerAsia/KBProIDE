const util = require("util");
const fs = require("fs");
const path = require("path");
const execPromise = util.promisify(require("child_process").exec);
const log = require("./log");

var engine = Vue.prototype.$engine;
//---- setup dir and config ----//
var platformName = "arduino-esp32";
var motherPlatform = "esp-idf";

var motherPlatformDir = `${engine.util.platformDir}/${motherPlatform}`;
var platformDir = `${engine.util.platformDir}/${platformName}`;
var platformLibDir = `${platformDir}/lib`;
//---- idf platform ----//
const idf = require(`${motherPlatformDir}/compiler`);

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

var G = {};

const setConfig = (context) => {
  let localContext = JSON.parse(
      fs.readFileSync(`${platformDir}/context.json`, "utf8"));
  G = Object.assign({}, localContext);
  G.board_name = context.board_name;   //require boardname
  G.app_dir = context.app_dir;         //require app_dir
  G.process_dir = context.process_dir; //require working dir
  G.cb = context.cb || function() { };

  if (!G.cpp_options) {
    G.cpp_options = [];
  }
  G.cflags = G.cflags.map(f => f.replace(/\{platform\}/g, platformDir));
  G.ldflags = G.ldflags.map(f => f.replace(/\{platform\}/g, platformDir));
  G.ldlibflag = G.ldlibflag.map(f => f.replace(/\{platform\}/g, platformDir));

  G.COMPILER_AR = `${motherPlatformDir}/${G.toolchain_dir}/bin/xtensa-esp32-elf-ar`;
  G.COMPILER_GCC = `${motherPlatformDir}/${G.toolchain_dir}/bin/xtensa-esp32-elf-gcc`;
  G.COMPILER_CPP = `${motherPlatformDir}/${G.toolchain_dir}/bin/xtensa-esp32-elf-g++`;

  G.ELF_FILE = `${G.app_dir}/${G.board_name}.elf`;
  G.BIN_FILE = `${G.app_dir}/${G.board_name}.bin`;
  G.ARCHIVE_FILE = `${G.app_dir}/libmain.a`;

  idf.setConfig(context);
};

const compileFiles = function(sources, boardCppOptions, boardcflags,
    plugins_includes_switch) {
  fs.copyFileSync(`${platformDir}/main.cpp`, `${G.app_dir}/main.cpp`);
  sources.push(`${G.app_dir}/main.cpp`);
  return new Promise((resolve, reject) => {
    let cflags = `${G.cflags.join(" ")} ${boardcflags.join(" ")}`;
    let cppOptions = G.cpp_options.join(" ") + boardCppOptions.join(" ");
    let inc_switch = plugins_includes_switch.map(obj => `-I"${obj}"`).join(" ");

    //G.cb("callling compileFiles.");

    sources.forEach(async (file, idx, arr) => {
      let filename = getName(file);
      let fn_obj = `${G.app_dir}/${filename}.o`;

      let cmd = `"${G.COMPILER_CPP}" ${cppOptions} ${cflags} ${inc_switch} -c "${file}" -o "${fn_obj}"`;
      try {
        const {stdout, stderr} = await execPromise(ospath(cmd),
                                                   {cwd: G.process_dir});
        if (!stderr) {
          console.log(`compiling... ${path.basename(file)} ok.`);
          G.cb(`compiling... ${path.basename(file)} ok.`);
          // console.log(`${stdout}`);
        } else {
          //reject(stderr);
          console.log(
              `compiling... ${path.basename(file)} ok. (with warnings)`);
          G.cb(`compiling... ${path.basename(file)} ok. (with warnings)`);
          // console.log(`${stderr}`);
        }
      } catch (e) {
        console.log(`compiling... ${file} failed. with ${e}`);
        G.cb(`compiling... ${file} failed. with ${e}`);
        reject(`compiling... ${file} failed.`);
      }
      if (idx === arr.length - 1) {
        resolve();
      }
    });
  });
};

function linkObject(ldflags, extarnal_libflags) {
  console.log(`linking... ${G.ELF_FILE}`);
  G.cb(`linking... ${G.ELF_FILE}`);
  let flags = G.ldflags.concat(ldflags);
  let libflags = (extarnal_libflags) ? G.ldlibflag.concat(extarnal_libflags).
  join(" ") : G.ldlibflag.join(" ");
  flags = G.ldflags.join(" ") + " " + ldflags.join(" ");
  var cmd = `"${G.COMPILER_GCC}" ${flags} -Wl,--start-group ${libflags} -L"${G.app_dir}" -lmain -lgcov -Wl,--end-group -Wl,-EL -o "${G.ELF_FILE}"`;
  return execPromise(ospath(cmd), {cwd: G.process_dir});
}

//-------- heritance somefunction from esp-idf ----------//

var exp = {};
Object.assign(exp, idf);
Object.assign(exp,
              {
                setConfig,
                linkObject,
                compileFiles,
              },
);

module.exports = exp;
