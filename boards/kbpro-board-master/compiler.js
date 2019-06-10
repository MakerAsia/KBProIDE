const fs = require("fs");
const path = require("path");
var engine = Vue.prototype.$engine;
var G = Vue.prototype.$global;
const mkdirp = engine.util.requireFunc("mkdirp");

//---- setup dir and config ----//
var boardDirectory = `${engine.util.boardDir}/${G.board.board}`;
var pluginDir = `${boardDirectory}/plugin`;
var boardIncludeDir = `${boardDirectory}/include`;
var platfromIncludeDir = `${boardDirectory}/include`;

var context = JSON.parse(
    fs.readFileSync(boardDirectory + "/context.json", "utf8"));
var config = require("./config");
var platformDir = `${engine.util.platformDir}/${config.platform}`;
var platformCompiler = engine.util.requireFunc(`${platformDir}/compiler`);

function compile(rawCode, boardName, config, cb) {
  console.log(`[kbpro] compiler.compile platformDir = ${platformDir}`);
  return new Promise((resolve, reject) => {
    //--- init ---//
    if (fs.existsSync(`${boardDirectory}/codegen.js`)) {
      var codegen = require("./codegen");
    } else {
      var codegen = engine.util.requireFunc(`${platformDir}/codegen`);
    }
    //---- inc folder ----//
    var app_dir = `${boardDirectory}/build/${boardName}`;
    let inc_src = engine.util.walk(boardIncludeDir).
    filter(file => path.extname(file) == ".cpp" || path.extname(file) == ".c");
    inc_src = inc_src.concat(engine.util.walk(platfromIncludeDir).
                             filter(file => path.extname(file) == ".cpp" ||
                                 path.extname(file) == ".c"));
    let inc_switch = [];
    //--- step 1 load template and create full code ---//
    if (config.isSourceCode) {
      var sourceCode = rawCode;
      //searching all include to find matched used plugin file
      var codeContext = {
        plugins_sources: [],
        plugins_includes_switch: [],
      };
      let pluginInfo = G.plugin.pluginInfo;
      let incsRex = /#include\s*(?:\<|\")(.*?\.h)(?:\>|\")/gm;
      var m;
      while (m = incsRex.exec(sourceCode)) {
        let incFile = m[1].trim();
        //lookup plugin
        let includedPlugin = pluginInfo.categories.filter(
            obj => obj.sourceFile.includes(incFile));
        if (includedPlugin.length > 0) {
          codeContext.plugins_includes_switch.push(
              includedPlugin[0].directory + "/src");
          let targetCppFile = includedPlugin[0].directory + "/src/" +
              incFile.replace(".h", ".cpp");
          codeContext.plugins_sources.push(targetCppFile);
        }
      }
    } else {
      var {sourceCode, codeContext} = codegen.generate(rawCode);
    }
    //----- plugin file src ----//
    inc_src = inc_src.concat(codeContext.plugins_sources);
    inc_switch = inc_switch.concat(codeContext.plugins_includes_switch);
    //------ clear build folder and create new one --------//
    if (fs.existsSync(app_dir)) {
      engine.util.rmdirf(app_dir);
    }
    mkdirp.sync(app_dir);
    //-----------------------------------------------------//
    fs.writeFileSync(`${app_dir}/user_app.cpp`, sourceCode, "utf8");
    //--- step 3 load variable and flags ---//
    var cflags = [];
    var ldflags = [];
    var libflags = [];
    if (context.cflags) {
      cflags = context.cflags.map(f => f.replace(/\{board\}/g, boardDirectory));
    }
    if (context.ldflags) {
      ldflags = context.ldflags.map(
          f => f.replace(/\{board\}/g, boardDirectory));
    }
    if (context.libflags) {
      libflags = context.libflags.map(
          f => f.replace(/\{board\}/g, boardDirectory));
    }
    //--- step 4 compile
    var contextBoard = {
      board_name: boardName,
      app_dir: app_dir,
      process_dir: boardDirectory,
      cb,
    };

    inc_src.push(`${app_dir}/user_app.cpp`);
    platformCompiler.setConfig(contextBoard);

    engine.util.promiseTimeout(1000).then(() => {
      return platformCompiler.compileFiles(inc_src, [], cflags, inc_switch);
    }).then(() => {
      return engine.util.promiseTimeout(2000);
    }).then(() => {
      return platformCompiler.archiveProgram(inc_src);
    }).then(() => {
      return engine.util.promiseTimeout(1000);
    }).then(() => {
      return platformCompiler.linkObject(ldflags, libflags);
    }).then(() => {
      return engine.util.promiseTimeout(1000);
    }).then(() => {
      return platformCompiler.createBin();
    }).then(() => {
      return engine.util.promiseTimeout(1000);
    }).then(() => {
      resolve();
    }).catch(msg => {
      console.log("error msg : " + msg);
      reject(msg);
    });
  });
}

var exp = {};
Object.assign(exp, platformCompiler);
Object.assign(exp, {
  compile,
});
//console.log(exp);
module.exports = exp;
