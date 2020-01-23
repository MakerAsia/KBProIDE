import util from "@/engine/utils";
import pfm from "@/engine/PlatformManager";
//import axios from 'axios';

const { promises: fs } = require("fs");
const rfs = require("fs");

const fileExists = async path => !!(await fs.stat(path).catch(e => false));

const os = require("os");
const path = require("path");
const request = require("request");
const progress = require("request-progress");
//const db = Vue.prototype.$db;
const request_promise = require("request-promise");

let listedBoards = [];
let listedPackages = {};
let listedPackagesBoard = "";

const listBoard = async function() {
  let context = [];
  let dirs = await fs.readdir(util.boardDir);
  for(let i in dirs){
    let dir = `${util.boardDir}/${dirs[i]}`;
    if ((await fs.lstat(dir)).isFile()) {
      continue;
    }
    let dirBoards = await fs.readdir(dir);
    if (!dirBoards.includes("config.js")) {
      continue; // only folder that contain config.js
    }
    let config = util.requireFunc(dir + "/config");
    config["dir"] = dir;
    context.push(config);
  }
  return context;
};

const listPackage = async function(boardName, includePlatform = true) {
  let targetBoardDir = `${util.boardDir}/${boardName}`;
  let targetBoardPackage = `${targetBoardDir}/package`;
  let context = {};
  if (await fileExists(targetBoardPackage)) {
    let packageName = await fs.readdir(targetBoardPackage);
    for (let i in packageName) {
      let element = packageName[i];
      let fullPathPackage = `${targetBoardPackage}/${element}`;
      let configFile = `${fullPathPackage}/config.js`;
      let packageJsFile = `${fullPathPackage}/dist/${element}.umd.js`;
      if ((await fs.lstat(fullPathPackage)).isFile()) {// skip file
        continue;
      }
      if (!await fileExists(configFile)) {//package must contain config.js
        continue;
      }
      if (!await fileExists(packageJsFile)) {//package must contain js umd file
        continue;
      }
      if (!(element in context)) {
        context[element] = {};
        try {
          context[element]["config"] = util.requireFunc(configFile);
          context[element]["dir"] = fullPathPackage;
          context[element]["js"] = packageJsFile;
          context[element]["scope"] = "board";
        } catch (error) {
          console.log("connot import config : " + fullPathPackage);
        }
      }
    }
  }
  if (includePlatform) {
    let targetBoard = (await boards()).find(obj => obj.name === boardName);
    let platformName = targetBoard.platform;
    let platformPackageDir = `${util.platformDir}/${platformName}/package`;
    if (await fileExists(platformPackageDir)) {
      let platformPackageName = await fs.readdir(platformPackageDir);
      for(let i in platformPackageName){
        let element = platformPackageName[i];
        let fullPathPackage = `${platformPackageDir}/${element}`;
        let configFile = `${fullPathPackage}/config.js`;
        let packageJsFile = `${fullPathPackage}/dist/${element}.umd.js`;
        if ((await fs.lstat(fullPathPackage)).isFile()) {// skip file
          continue;
        }
        if (!await fileExists(configFile)) {//package must contain config.js
          continue;
        }
        if (!await fileExists(packageJsFile)) {//package must contain js umd file
          continue;
        }
        if (!(element in context)) {
          context[element] = {};
          try {
            context[element]["config"] = util.requireFunc(configFile);
            context[element]["dir"] = fullPathPackage;
            context[element]["js"] = packageJsFile;
            context[element]["scope"] = "platform";
          } catch (error) {
            console.log("connot import config : " + fullPathPackage);
          }
        }
      }
    }
  }
  //sort menu by config index
  let orderedContext = {};
  Object.keys(context).sort(function(a, b) {
    if (context[a].config && context[b].config) {
      if ("index" in context[a].config && "index" in context[b].config)
        return context[a].config.index - context[b].config.index;
    }
    return 0;
  }).forEach(function(key) {
    orderedContext[key] = context[key];
  });
  return orderedContext;
};

const listOnlineBoard = function(query)
{
  return new Promise((resolve, reject) => {
    Vue.prototype.$db2.getItems("boards", query).then((data, meta) => {
      resolve({ boards: data.data, meta: data.meta });
    }).catch(err => {
      console.error("list online board error : " + err);
      reject(err);
    });
  });
};

const loadBoardManagerConfig = async function() {
  let configFile = util.boardDir + "/config.js";
  if (!await fileExists(configFile)) {
    return null;
  }
  return util.requireFunc(configFile);
};

const installOnlineBoard = function(info, cb) {
  return new Promise((resolve, reject) => { //download zip
    if (!info.git) { reject("no git found"); }
    let zipUrl = info.git + "/archive/master.zip";
    let zipFile = os.tmpdir() + "/" + util.randomString(10) + ".zip";
    let file = rfs.createWriteStream(zipFile);
    progress(
      request(zipUrl),
      {
        throttle: 2000, // Throttle the progress event to 2000ms, defaults to 1000ms
        delay: 1000,    // Only start to emit after 1000ms delay, defaults to 0ms
        followAllRedirects: true,
        follow: true
      }
    ).on("progress", function(state) {
      cb && cb({ process: "board", status: "DOWNLOAD", state: state });
    }).on("error", function(err) {
      reject(err);
    }).on("end", function() {
      file.end();
      return resolve(zipFile);
    })
      .pipe(file);
  }).then((zipFile) => { //unzip file
    return util.unzip(zipFile, { dir: util.boardDir }, p => {
      cb && cb({ process: "board", status: "UNZIP", state: p });
    });
  }).then(() => { //rename folder
    //rename ended with word '-master' in boards
    let dirs = rfs.readdirSync(util.boardDir);
    for (let i = 0; i < dirs.length; i++) {
      let dirname = path.join(util.boardDir, dirs[i]);
      if (rfs.lstatSync(dirname).isDirectory() && dirname.endsWith("-master")) {
        let sourceDir = dirname;
        let targetDir = path.join(util.boardDir, info.name);
        rfs.renameSync(sourceDir, targetDir);
      }
    }
    return true;
  }).then(() => { //install platform
    let havePlatform = rfs.readdirSync(util.platformDir);
    let nonExistPlatform;
    if(typeof info.platform === "string"){
      nonExistPlatform = havePlatform.includes(info.platform) ? [] : [info.platform];
    }else{
      nonExistPlatform = info.platform.filter(el => !havePlatform.includes(el));
    }
    if(nonExistPlatform && nonExistPlatform.length === 1){ //we only support single platform only
      let np = nonExistPlatform[0];
      return pfm.installPlatformByName(np,cb);
    }
    return true;
  }).then(()=>{
    return Promise.resolve();
  });
};

const removeBoard = function(boardInfo) {
  return new Promise((resolve, reject) => {
    let target = `${boardInfo.dir}`;
    if ( rfs.existsSync(target)) {
      util.rmdirf(target);
      resolve();
    } else {
      reject("no directory");
    }
  });
};

const removeBackupBoard = function(boardInfo) {
  return new Promise((resolve, reject) => {
    let target = `${boardInfo.dir}-backup-board`;
    if (rfs.existsSync(target)) {
      util.rmdirf(target);
      resolve();
    } else {
      reject("no directory");
    }
  });
};

const backupBoard = function(boardInfo) {
  return new Promise((resolve, reject) => {
    let target = `${boardInfo.dir}`;
    let newer = `${boardInfo.dir}-backup-board`;
    rfs.renameSync(target, newer);
    resolve();
  });
};

const restoreBoard = function(boardInfo) {
  return new Promise((resolve, reject) => {
    let target = `${boardInfo.dir}`;
    let newer = `${boardInfo.dir}-backup-board`;
    rfs.renameSync(newer, target);
    resolve();
  });
};


const publishBoard = function(url) {
  return new Promise((resolve, reject) => {
    if (!util.regex.isValidGithubUrl(url)) {
      reject("Invalid GitHub urrl");
      return;
    }
    let json = null;
    request_promise(url + "raw/master/config.js?random=" + util.randomString()) //add randomstring prevent cached response
      .then(res => {
        json = eval(res);
        if (json.name) { //search if existing
          let query = { filter: { name: { eq: json.name } } };
          return Vue.prototype.$db2.getItems("boards", query).then((data, meta) => {
            return data.data && data.data.length === 1 && data.data[0];
          }).catch(err => {
            console.error("list online plugin error : " + err);
            return false;
          });
        } else {
          return false;
        }
      })
      .then(res => {
        if (res && res.version) {
          return json.version > res.version;
        } else {
          return true;
        }
      })
      .then(res => {
        /*if (res) {
          //Vue.prototype.$db_dev.setItems() .collection("boards").doc(json.name).set(json);
          if (res) {
            resolve();
          }
        } else {
          reject("Existing board name or is not newest version");
        }*/
        if (res) {
          delete json.homepage; //please use URL instead.
          json.status = "draft";
          if(typeof json.platform === "string"){
            if(json.platform.includes(",")){
              json.platform = json.platform.split(",").map(el => el.toLowerCase().trim())
            }else{
              json.platform = [json.platform]
            }
          }
          Vue.prototype.$db_dev.createItem("boards", json)
            .then(res => {
              //console.log(res);
              if (res) {
                resolve("submit your board success, please refresh again");
              } else {
                reject("Fail to add new board, please open console log to review.");
              }
            })
            .catch(err => {
              console.log("Publish data failed : ");
              console.log(err);
              reject(err);
            });
        } else {
          reject("Existing board name or is not newest version");
        }
      }).catch(err => {
      reject(err);
    });
  });
};

const boards = async function() {
  if (listedBoards.length === 0) { // check empty object !!!
    listedBoards = await listBoard();
  }
  return listedBoards;
};
const clearListedBoard = function() {
  listedBoards = [];
  Object.keys(util.requireFunc.cache).map(file => {
    if ((/\/boards\/.*?\/config\.js/g).test(file) || (/\\boards\\.*?\\config\.js/g).test(file)) {
      delete util.requireFunc.cache[file];
    }
  });
};
const packages = async function(selectedBoard) {
  if ((Object.entries(listedPackages).length === 0 && listedPackages.constructor === Object) || (listedPackagesBoard != selectedBoard)) { // check empty object !!!
    listedPackages = await listPackage(selectedBoard);
    listedPackagesBoard = selectedBoard;
  }
  return listedPackages;
};

const filerBoardPackageComponent = function(localPackage, name) {
  let components = {};
  Object.keys(localPackage).forEach(packageName => {
    if ("config" in localPackage[packageName]) {
      let conf = localPackage[packageName].config;
      components[packageName] = [];
      if ("components" in conf) {
        conf.components.forEach(componentName => {
          if (componentName.toLowerCase().startsWith(name.toLowerCase())) {
            if (!components[packageName].includes(componentName)) {
              components[packageName].push(componentName);
            }
          }
        });
      }
    }
  });
  return components;
};

export default {
  boards,
  clearListedBoard,
  packages,
  listBoard,
  listOnlineBoard,
  listPackage,
  listToolbar: async selectedBoard => filerBoardPackageComponent(await packages(selectedBoard), "Toolbar"),
  listActionbar: async selectedBoard => filerBoardPackageComponent(await packages(selectedBoard), "Actionbar"),
  listPage: async selectedBoard => filerBoardPackageComponent(await packages(selectedBoard), "Page"),
  listLeftDrawer: async selectedBoard => filerBoardPackageComponent(await packages(selectedBoard), "LeftDrawer"),
  listRightDrawer: async selectedBoard => filerBoardPackageComponent(await packages(selectedBoard), "RightDrawer"),
  listBottomPanel: async selectedBoard => filerBoardPackageComponent(await packages(selectedBoard), "BottomPanel"),
  listRightTab: async selectedBoard => filerBoardPackageComponent(await packages(selectedBoard), "RightTab"),
  listBottomTab: async selectedBoard => filerBoardPackageComponent(await packages(selectedBoard), "BottomTab"),
  loadBoardManagerConfig,
  installOnlineBoard,
  removeBoard,
  removeBackupBoard,
  backupBoard,
  restoreBoard,
  publishBoard
};
