const codegen = require("./codegen");
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");
const log = require("./log");

var engine = Vue.prototype.$engine;
var G = Vue.prototype.$global;

const SerialPort = engine.util.requireFunc("serialport");
const moment = engine.util.requireFunc("moment");

//---- setup dir and config ----//
var boardDirectory = `${engine.util.boardDir}/${G.board.board}`;

var context = JSON.parse(
    fs.readFileSync(boardDirectory + "/context.json", "utf8"));
var config = require(boardDirectory + "/config");

var platformDir = `${engine.util.platformDir}/${config.platform}`;
var pluginDir = `${boardDirectory}/plugin`;
var toolDir = `${platformDir}/tools`;

var platformCompiler = require(platformDir + "/compiler");

function is_null(val) {
  return ((val == null) || (typeof (val) == "undefined"));
}

function is_not_null(val) {
  return (!((val == null) || (typeof (val) == "undefined")));
}

function listPort() {
  return new Promise(function(resolve, reject) {
    try {
      engine.util.requireFunc("serialport").list(function(err, ports) {
        if (err) reject(err);
        if (ports.length == 0) reject("No COM PORT found");

        var port_list_str = "none";
        var port_list = [];
        for (var i in ports) {
          if (is_not_null(ports[i].comName) &&
              is_not_null(ports[i].productId) &&
              is_not_null(ports[i].vendorId)) {
            var uid = ports[i].vendorId + ":" + ports[i].productId;
            if (context.port_vid_pid.indexOf(uid.toLowerCase()) >= 0) {
              port_list.push(ports[i].comName);
              if (i == 0) {
                port_list_str = ports[i].comName;
              } else {
                port_list_str += ", " + ports[i].comName;
              }
            }
          }
        }
        log.i("serial port enumerated (" + port_list_str + ")");
        if (port_list.length == 0) {
          reject("no COM port found");
        } else {
          resolve(port_list);
        }
      });
    } catch (err) {
      log.e("port read error : " + err);
      reject(err);
    }
  });
}

function compile(rawCode, boardName, config, cb) {
  return new Promise((resolve, reject) => {
    //--- init ---//
    var app_dir = `${boardDirectory}/build/${boardName}`;
    //--- step 1 load template and create full code ---//
    var template = fs.readFileSync(`${boardDirectory}/template.c`, "utf8");
    var {sourceCode, codeContext} = codegen.codeGenerate(rawCode, template,
                                                         config);
    //!fs.existsSync(app_dir) && fs.mkdirSync(app_dir, {recursive: true}); //create app_dir if not existing
    mkdirp.sync(app_dir);

    fs.writeFileSync(`${app_dir}/user_app.cpp`, sourceCode, "utf8");
    //--- step 3 load variable and flags ---//
    var cflags = context.cflags.map(
        f => f.replace("-Ilib", `-I"${boardDirectory}/lib`) + "\"");
    var ldflags = context.ldflags.map(
        f => f.startsWith("-Llib") ? (f.replace("-Llib",
                                                `-L"${boardDirectory}/lib`) +
            "\"") : f);
    ldflags = ldflags.map(f => f.startsWith("lib/") ? ("\"" +
        f.replace("lib/", `${boardDirectory}/lib/`) + "\"") : f);
    //--- step 4 compile
    var contextBoard = {
      board_name: boardName,
      app_dir: app_dir,
      process_dir: boardDirectory,
      cb,
    };
    var sourceFiles = codeContext.plugins_sources;
    sourceFiles.push(`${app_dir}/user_app.cpp`);
    var includeSwitch = codeContext.plugins_includes_switch;
    platformCompiler.setConfig(contextBoard);
    //(sources, boardCppOptions, boardcflags, plugins_includes_switch)
    platformCompiler.compileFiles(sourceFiles, [], cflags, includeSwitch).
    then(() => {
      return platformCompiler.archiveProgram(sourceFiles);
    }).
    then(() => {
      return platformCompiler.linkObject(ldflags);
    }).
    then(() => {
      return platformCompiler.createBin();
    }).
    then(() => {
      resolve();
    }).
    catch(msg => {
      console.log("error msg : " + msg);
      reject(msg);
    });

  });
}

function setClock(portname) {
  return new Promise((resolve, reject) => {
    var tx_str = moment().format("YYMMDD0eHHmmss");
    console.log("setting board real time clock... : " + tx_str);
    try {
      var port_name = portname;
      var serialport = new SerialPort(port_name, {
        baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
        parity: "none",
        rtscts: false,
        xon: false,
        xoff: false,
        xany: false,
        autoOpen: false,
      });
      serialport.open(function(err) {
        if (err) reject(err);
        serialport.write("rtc set " + tx_str + "\n", function(err) {
          if (err) {
            console.log("Error on write: ", err.message);
            reject(err);
          }
          // delay close port
          setTimeout(function() {
            serialport.close();
            resolve();
          }, 500);
        });
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}

var exp = {};
Object.assign(exp, platformCompiler);
Object.assign(exp,
              {
                setClock,
                listPort,
                compile,
              },
);
//console.log(exp);
module.exports = exp;
