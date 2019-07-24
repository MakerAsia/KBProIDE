import util from "@/engine/utils";
import RealBlockly from "vue-blockly";

const fs = require("fs");
const os = require("os");
const path = require("path");
const request = require("request");
const request_promise = require("request-promise");
const progress = require("request-progress");

let localBoardName = "";
let localPlugins = {};

const decodeArduinoLibraryConfig = function(targetFile){
  let tmpData = fs.readFileSync(targetFile,"utf8");
  let lines = tmpData.split('\n');
  let tdata = lines.map(l => l.split("="));
  let res = {};
  tdata.forEach(el=>{
    if(el.length && el.length === 2) {
      res[el[0].trim()] = el[1].trim();
    }
  });
  return res;
};

const listPlugin = function(dir) {
  let plugins = {};
  let blockFiles = fs.readdirSync(dir);
  if (blockFiles.length > 0) {
    blockFiles.forEach(blockFile => {
      let fblock = `${dir}/${blockFile}`;
      if (blockFile.endsWith(".js") && blockFile.startsWith("block") &&
          fs.lstatSync(fblock).isFile()) {
        // extract block definitions
        let blocks = [];
        var Blockly = {
          Blocks: [],
        };
        try {
          if (!document.BlockyPlugin) {
            document.BlocklyPlugin = {};
          }
          let pluginWorkspace = new RealBlockly.Workspace();
          eval(fs.readFileSync(fblock, "utf8"));
          for (let i in Blockly.Blocks) {
            document.BlocklyPlugin[i] = pluginWorkspace;
            blocks.push(i);
          }
        } catch (e) {
          console.log(`plugin "${blockFile}" blocks.js error`);
        }//----------------------//

        // extract block generators
        let fgen = `${dir}/${blockFile.replace("block", "generator")}`;
        var generators = [];
        var Blockly = {
          JavaScript: [],
        };
        try {
          eval(fs.readFileSync(fgen, "utf8"));
          for (let i in Blockly.JavaScript) {
            generators.push(i);
          }
        } catch (e) {
          console.log(`plugin "${plugin}" generator.js error`);
        }//----------------------//
        // TODO : check block and generator must eq
        plugins[blockFile] = {
          dir: dir,
          file: blockFile,
          blocks: blocks,
          generators: generators,
        };
        console.log(`plugin "${blockFile}" found ${blocks.length} block${blocks.length > 1 ? "s" : ""}`);
      }
    });
  }
  return plugins;
};

const listKidBrightPlugin = function(dir) {
  let plugins = {};
  let catPlugins = fs.readdirSync(dir);
  if (catPlugins.length > 0) {
    catPlugins.forEach(plugin => {
      let fdir = `${dir}/${plugin}`;
      if (fs.lstatSync(fdir).isDirectory()) {
        // extract block definitions
        var blocks = [];
        var Blockly = {
          Blocks: [],
        };
        try {
          eval(fs.readFileSync(`${fdir}/blocks.js`, "utf8"));
          for (let i in Blockly.Blocks) {
            blocks.push(i);
          }
        } catch (e) {
          console.log(`plugin "${plugin}" blocks.js error`);
        }//----------------------//

        // extrack block generators
        var generators = [];
        var Blockly = {
          JavaScript: [],
        };
        try {
          eval(fs.readFileSync(`${fdir}/generators.js`, "utf8"));
          for (var i in Blockly.JavaScript) {
            generators.push(i);
          }
        } catch (e) {
          console.log(`plugin "${plugin}" generator.js error`);
        }//----------------------//
        // TODO : check block and generator must eq
        plugins[plugin] = {
          dir: fdir,
          file: "blocks.js",
          name: plugin,
          blocks: blocks,
          generators: generators,
        };
        console.log(`plugin "${plugin}" found ${blocks.length} block${blocks.length > 1 ? "s" : ""}`);
      }
    });
  }
  return plugins;
};

const listExamples = function(exampleDir) {
  let exampleInfo = [];
  if (fs.existsSync(exampleDir)) {
    let exampleFolders = fs.readdirSync(exampleDir);
    exampleFolders.forEach(folder => {
      let targetDir = `${exampleDir}/${folder}`;
      if (fs.lstatSync(targetDir).isDirectory()) {
        let exampleContent = fs.readdirSync(targetDir);
        exampleInfo.push({
          folder: folder,
          dir: targetDir,
          files: exampleContent,
        });
      }
    });
  }
  return exampleInfo;
};
const listCategoryPlugins = function(pluginDir,boardInfo) {
  let categories = [];
  let allPlugin = {};
  if (fs.existsSync(pluginDir)) {
    let cats = fs.readdirSync(pluginDir);
    cats.forEach(cat => {
      let dir = `${pluginDir}/${cat}`;
      if(!fs.lstatSync(dir).isDirectory()){
        return;
      }
      //------- load kidbright plugins -------//
      let kbPluginInfoFile = `${dir}/${cat}.json`;
      if (fs.existsSync(kbPluginInfoFile)) {
        let catInfoFile = JSON.parse(fs.readFileSync(kbPluginInfoFile,"utf8"));
        let blockPlugins = listKidBrightPlugin(dir);
        categories.push({
                          directory: dir,
                          dirName: cat,
                          plugins: blockPlugins,
                          category: catInfoFile,
                        });
        Object.assign(allPlugin, blockPlugins);
      //------- load normal plugins ---------//
      }else{
        let pluginInfo = null;

        let infoFile = `${dir}/library.json`;
        let arduinoInfoFile = `${dir}/library.properties`;
        if(fs.existsSync(infoFile)) {
          pluginInfo = JSON.parse(fs.readFileSync(infoFile, "utf8"));
          if("frameworks" in pluginInfo && "platforms" in pluginInfo) { //this is platformIO config file
             if(pluginInfo.frameworks === "arduino") {
                if(pluginInfo.platforms === "*") {
                  pluginInfo.platform = ["*"];
                }
                if(typeof pluginInfo.platforms === "object" && pluginInfo.platforms.includes("espressif32")) {
                  pluginInfo.platform = ["arduino-esp32"];
                }
             }
             if(pluginInfo.repository && pluginInfo.repository.type === "git") {
                pluginInfo["git"] = pluginInfo.repository.url.replace(".git","/").trim();
             }else {
                return; //this plugin cannot update
             }
             if(pluginInfo.authors) {
               pluginInfo["author"] = pluginInfo.authors.name;
             }
             pluginInfo["title"] = pluginInfo["name"];
             pluginInfo["name"] = pluginInfo["name"].replace(/\s/g,"-").trim();
          }
        }else if(fs.existsSync(arduinoInfoFile)) {
          pluginInfo = decodeArduinoLibraryConfig(arduinoInfoFile);
          if("url" in pluginInfo) {
            pluginInfo["git"] = pluginInfo.url;
          }else {
            return; //reject
          }
          pluginInfo.title = pluginInfo.name;
          pluginInfo.name = pluginInfo.name.replace(/\s/g,"-").trim();
          pluginInfo.description = pluginInfo.sentence;
          pluginInfo.platform = pluginInfo.architectures;
        }else {
          return; //there are no info file in this library.
        }
        //---------- rejection other board platform ----------//
        if(boardInfo !== undefined && boardInfo.platform){
          if(typeof(pluginInfo.platform) === "string" //single param platform
              && !pluginInfo.platform.includes(",")
              && pluginInfo.platform !== boardInfo.platform
              && pluginInfo.platform !== "*"){ //any platform ? is that real!?
            return;
          }else if(typeof(pluginInfo.platform) === "string" //string with comma
              && pluginInfo.platform.includes(",")){
            let supportedPlugins = pluginInfo.platform.split(",").map(el=>el.trim());
            if(!supportedPlugins.includes(boardInfo.platform)){
              return;
            }
          }else if(pluginInfo.platform.constructor === Array){ //array of platform
            if(!pluginInfo.platform.includes(boardInfo.platform)){
              return;
            }
          }
        }
        //---------- load plugin ----------//
        let srcDir = `${dir}/src`;
        let blockDir = `${dir}/blocks`;
        let exampleDir = `${dir}/examples`;

        let blockPlugins = {};
        let srcFile = [];
        let srcIncDir = dir;
        if(fs.existsSync(blockDir)){
          blockPlugins = listPlugin(blockDir);
        }
        if(fs.existsSync(srcDir)){
          srcFile = fs.readdirSync(srcDir);
          srcIncDir = srcDir;
        }else if(fs.readdirSync(dir).find(el=>el.endsWith(".h"))){
          srcFile = fs.readdirSync(dir);
          srcIncDir = dir;
        }
        let exampleInfo = [];
        if (fs.existsSync(exampleDir)) {
          exampleInfo = listExamples(exampleDir);
        }
        categories.push({
                            directory: dir,
                            dirName: cat,
                            sourceFile: srcFile,
                            sourceIncludeDir : srcIncDir,
                            plugins: blockPlugins,
                            category: pluginInfo,
                            examples: exampleInfo,
                          });
        Object.assign(allPlugin, blockPlugins);
      }
    });
  }
  return {categories: categories, plugins: allPlugin};
};
//TODO : look for platform blocks

const loadPlugin = function(boardInfo) {
  if ((Object.entries(localPlugins).length === 0 && localPlugins.constructor ===
      Object) || (boardInfo.name !== localBoardName)) { // check empty object !!!
    //load mother platform
    //TODO : implement look up in mother of platform again
    //load from platform
    let platformPlugins = listCategoryPlugins(
        `${util.platformDir}/${boardInfo.platform}/plugin`,
        boardInfo);
    //load from board
    let boardPlugins = listCategoryPlugins(
        `${util.boardDir}/${boardInfo.name}/plugin`,
        boardInfo);
    //load global plugin
    let globalPlugins = listCategoryPlugins(
        util.pluginDir,
        boardInfo
    );
    //join all together
    let allPlugins = {};
    Object.assign(allPlugins, platformPlugins.plugins);
    Object.assign(allPlugins, boardPlugins.plugins);
    Object.assign(allPlugins, globalPlugins.plugins);
    let allPluginsCat = globalPlugins.categories.concat(platformPlugins.categories,boardPlugins.categories);
    localPlugins = {
      categories: allPluginsCat,
      plugins: allPlugins,
    };
  }
  return localPlugins;
};

const clearListedPlugin = function() {
  localPlugins = {};
};

const plugins = function(boardInfo) {
  let lpg = loadPlugin(boardInfo);
  return lpg.categories;
};
const performPluginSearch = function(name,queryMode, value, start = 0) {
  return new Promise((resolve, reject) => {
    let onlinePlugins = [];
    Vue.prototype.$db.collection("plugins").
    where(name, queryMode, value).
    orderBy("name").
    startAfter(start).
    limit(50).
    get().
    then(data => {
      const lastVisible = data.docs[data.docs.length - 1];
      data.forEach(element => {
        onlinePlugins.push(element.data());
      });
      resolve({end: lastVisible, plugins: onlinePlugins});
    }).
    catch(err => {
      reject(err);
    });
  });
};
const performPluginNameSearch = function(name, column, value, start = 0) {
  return new Promise((resolve, reject) => {
    let onlinePlugins = [];
    let strSearch = name;
    let strlength = strSearch.length;
    let strFrontCode = strSearch.slice(0, strlength - 1);
    let strEndCode = strSearch.slice(strlength - 1, strSearch.length);
    let startcode = strSearch;
    let endcode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

    Vue.prototype.$db.collection("plugins").where("name", ">=", startcode) //search start with
    .where("name", "<", endcode).where(column, "==", value).orderBy("name")
    //.startAfter(start)
    .limit(50).get().then(data => {
      let lastVisible = data.docs[data.docs.length - 1];
      data.forEach(element => {
        onlinePlugins.push(element.data());
      });
      resolve({end: lastVisible, plugins: onlinePlugins});
    }).catch(err => {
      reject(err);
    });
  });
};
const listOnlinePlugin = function(boardInfo, name = "", start = 0) {
  return new Promise((resolve, reject) => {
    let onlinePlugins = [];
    if (name === "") { //list all
      performPluginSearch("board","==", boardInfo.name).then(res => {
        onlinePlugins = onlinePlugins.concat(res.plugins);
        return performPluginSearch("platform","array-contains",boardInfo.platform);
      }).then(res => {
        onlinePlugins = onlinePlugins.concat(res.plugins);
        resolve({plugins: onlinePlugins});
      }).catch(err => {
        reject(err);
      });
    } else {
      performPluginNameSearch(name, "board", boardInfo.name).then(res => {
        onlinePlugins = onlinePlugins.concat(res.plugins);
        return performPluginNameSearch(name, "platform", boardInfo.platform);
      }).then(res => {
        onlinePlugins = onlinePlugins.concat(res.plugins);
        resolve({plugins: onlinePlugins});
      }).catch(err => {
        reject(err);
      });
    }
  });
};

const installPluginByName = function(name, cb) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$db.collection("plugins").
    where("name", "==", name).
    get().
    then(platfromData => {
      platfromData.forEach(element => {
        return resolve(element.data());
      });
    }).
    catch(err => {
      reject(err);
    });
  }).then((info) => {
    return installOnlinePlugin(info, cb);
  });
};
const installOnlinePlugin = function(info, cb) {
  let targetDir = util.pluginDir;
  if(info.board === "kidbright"){
    targetDir = `${util.boardDir}/kidbright/plugin`;
  }
  return new Promise((resolve, reject) => { //download zip
    if (!info.git) { reject("no git found"); }
    let zipUrl = info.git + "/archive/master.zip";
    let zipFile = os.tmpdir() + "/" + util.randomString(10) + ".zip";
    let file = fs.createWriteStream(zipFile);
    progress(
        request(zipUrl),
        {
          throttle: 2000, // Throttle the progress event to 2000ms, defaults to 1000ms
          delay: 1000,    // Only start to emit after 1000ms delay, defaults to 0ms
          followAllRedirects: true,
          follow: true,
        },
    ).on("progress", function(state) {
      cb && cb({process: "board", status: "DOWNLOAD", state: state});
    }).on("error", function(err) {
      reject(err);
    }).on("end", function() {
      file.end();
      return resolve(zipFile);
    }).pipe(file);
  }).then((zipFile) => { //unzip file
    return util.unzip(zipFile, {dir: targetDir}, p => {
      cb && cb({process: "board", status: "UNZIP", state: p});
    });
  }).then(() => { //rename folder
    //rename ended with word '-master' in boards
    let dirs = fs.readdirSync(targetDir);
    for (let i = 0; i < dirs.length; i++) {
      let dirname = path.join(targetDir, dirs[i]);
      if (fs.lstatSync(dirname).isDirectory() && dirname.endsWith("-master")) {
        let source = dirname;
        let target = path.join(targetDir, info.name);
        fs.renameSync(source, target);
      }
    }
    return true;
  });
};

const removePlugin = function(pluginInfo, isBackupRemove = false) {
  return new Promise((resolve, reject) => {
    let target = pluginInfo.directory;
    if (isBackupRemove) {
      target += "-backup-plugin";
    }
    if (fs.existsSync(target)) {
      util.rmdirf(target);
      resolve();
    } else {
      reject("no directory");
    }
  });
};

const backupPlugin = function(pluginInfo) {
  return new Promise((resolve, reject) => {
    let target = pluginInfo.directory;
    if(target.endsWith("/")){
      target = target.substring(0,target.length - 1);
    }
    let newer = `${target}-backup-plugin`;
    if (!fs.existsSync(target)) {
      reject("no directory");
    }else{
      fs.renameSync(target, newer);
      resolve();
    }
  });
};

const restorePlugin = function(pluginInfo) {
  let target = pluginInfo.directory;
  if(target.endsWith("/")){
    target = target.substring(0,target.length - 1);
  }
  let newer = `${target}-backup-plugin`;
  fs.renameSync(newer, target);
  resolve();
};

const publishPlugin = function(url){
  return new Promise((resolve,reject)=>{
    let json = null;
    if (!util.regex.isValidGithubUrl(url)) {
      reject("wrong github url format");
      return;
    }
    request_promise(url + "raw/master/library.json?random=" + util.randomString()) //add randomstring prevent cached response
    .then(res => {
      json = JSON.parse(res);
      if(json.name) { //search if existing
        return Vue.prototype.$db.collection("plugins").where("name", "==", json.name).get();
      } else {
        return false;
      }
    }).then(res => {
      if (res && res.size >= 1) {
        return json.version > res.docs[0].data().version;
      } else {
        return true;
      }
    }).then(res => {
      if (res) {
        Vue.prototype.$db.collection("plugins").doc(json.name).set(json);
        if (res) {
          resolve("submit your plugin success, please refresh again");
        }
      } else {
        reject("Existing plugin name or is not newest version");
      }
    }).catch(err => {
      console.log("Plugin Publishing Error : ");
      console.log(err);
      reject(err);
    });
  });
};

export default {
  listPlugin,
  loadPlugin,
  plugins,
  listOnlinePlugin,
  installOnlinePlugin,
  clearListedPlugin,
  removePlugin,
  backupPlugin,
  restorePlugin,
  publishPlugin
};