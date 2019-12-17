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

let listedPackages = {};

const listPackage = async function() {
  let targetPackage = `${util.packageDir}`;
  let context = {};
  if (await fileExists(targetPackage)) {
    let packageName = await fs.readdir(targetPackage);
    for (let i in packageName) {
      let element = packageName[i];
      let fullPathPackage = `${targetPackage}/${element}`;
      let configFile = `${fullPathPackage}/config.js`;
      let packageJsFile = `${fullPathPackage}/dist/${element}.umd.js`;
      let packageCssFile = `${fullPathPackage}/dist/${element}.css`;
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
      }
      try {
        context[element]["config"] = util.requireFunc(configFile);
        context[element]["dir"] = fullPathPackage;
        context[element]["js"] = packageJsFile;
        context[element]["css"] = packageCssFile;
        context[element]["scope"] = "package";
      } catch (error) {
        console.log("connot import config : " + fullPathPackage);
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

const listOnlinePackage = function(query) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$db2.getItems("packages", query).then((data, meta) => {
      resolve({ packages: data.data, meta: data.meta });
    }).catch(err => {
      console.error("list online packages error : " + err);
      reject(err);
    });
  });
};

const loadPackageManagerConfig = async function() {
  let configFile = util.packageDir + "/config.js";
  if (!await fileExists(configFile)) {
    return null;
  }
  return util.requireFunc(configFile);
};

const installOnlinePackage = function(info, cb) {
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
      cb && cb({ process: "package", status: "DOWNLOAD", state: state });
    }).on("error", function(err) {
      reject(err);
    }).on("end", function() {
      file.end();
      return resolve(zipFile);
    })
      .pipe(file);
  }).then((zipFile) => { //unzip file
    return util.unzip(zipFile, { dir: util.packageDir }, p => {
      cb && cb({ process: "package", status: "UNZIP", state: p });
    });
  }).then(() => { //rename folder
    //rename ended with word '-master' in packages
    let dirs = rfs.readdirSync(util.packageDir);
    for (let i = 0; i < dirs.length; i++) {
      let dirname = path.join(util.packageDir, dirs[i]);
      if (rfs.lstatSync(dirname).isDirectory() && dirname.endsWith("-master")) {
        let sourceDir = dirname;
        let targetDir = path.join(util.packageDir, info.name);
        rfs.renameSync(sourceDir, targetDir);
      }
    }
    return true;
  });
};

const removePackage = function(packageInfo) {
  return new Promise((resolve, reject) => {
    let target = `${packageInfo.dir}`;
    if ( rfs.existsSync(target)) {
      util.rmdirf(target);
      resolve();
    } else {
      reject("no directory");
    }
  });
};

const removeBackupPackage = function(packageInfo) {
  return new Promise((resolve, reject) => {
    let target = `${packageInfo.dir}-backup-package`;
    if (rfs.existsSync(target)) {
      util.rmdirf(target);
      resolve();
    } else {
      reject("no directory");
    }
  });
};

const backupPackage = function(packageInfo) {
  return new Promise((resolve, reject) => {
    let target = `${packageInfo.dir}`;
    let newer = `${packageInfo.dir}-backup-package`;
    rfs.renameSync(target, newer);
    resolve();
  });
};

const restorePackage = function(packageInfo) {
  return new Promise((resolve, reject) => {
    let target = `${packageInfo.dir}`;
    let newer = `${packageInfo.dir}-backup-package`;
    rfs.renameSync(newer, target);
    resolve();
  });
};

const publishPackage = function(url) {
  return new Promise((resolve, reject) => {
    if (!util.regex.isValidGithubUrl(url)) {
      reject("Invalid GitHub url");
      return;
    }
    let json = null;
    request_promise(url + "raw/master/config.js?random=" + util.randomString()) //add randomstring prevent cached response
      .then(res => {
        json = eval(res);
        if (json.name) { //search if existing
          let query = { filter: { name: { eq: json.name } } };
          return Vue.prototype.$db2.getItems("packages", query).then((data, meta) => {
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
        if (res) {
          delete json.homepage; //please use URL instead.
          json.status = "draft";
          if(json.data){ delete json.data; }
          if(json.persistence) { delete json.persistence; }
          if(json.menu) { delete json.menu; }
          if(typeof json.keywords === "string"){
            if(json.keywords.includes(",")){
              json.keywords = json.keywords.split(",").map(el => el.toLowerCase().trim())
            }else{
              json.keywords = [json.keywords]
            }
          }
          Vue.prototype.$db_dev.createItem("packages", json)
            .then(res => {
              //console.log(res);
              if (res) {
                resolve("submit your package success, please refresh again");
              } else {
                reject("Fail to add new package, please open console log to review.");
              }
            })
            .catch(err => {
              console.log("Publish data failed : ");
              console.log(err);
              reject(err);
            });
        } else {
          reject("Existing package name or is not newest version");
        }
      }).catch(err => {
      reject(err);
    });
  });
};

const clearListedPackage = function() {
  listedPackages = [];
  Object.keys(util.requireFunc.cache).map(file => {
    if ((/\/packages\/.*?\/config\.js/g).test(file) || (/\\packages\\.*?\\config\.js/g).test(file)) {
      delete util.requireFunc.cache[file];
    }
  });
};

const packages = async function() {
  if ((Object.entries(listedPackages).length === 0 && listedPackages.constructor === Object)) { // check empty object !!!
    listedPackages = await listPackage();
  }
  return listedPackages;
};

const filterPackageComponent = function(localPackage, name) {
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
  clearListedPackage,
  packages,
  listPackage,
  listOnlinePackage,
  listToolbar: async() => filterPackageComponent(await packages(), "Toolbar"),
  listActionbar: async() => filterPackageComponent(await packages(), "Actionbar"),
  listPage: async() => filterPackageComponent(await packages(), "Page"),
  listLeftDrawer: async()  => filterPackageComponent(await packages(), "LeftDrawer"),
  listRightDrawer: async()  => filterPackageComponent(await packages(), "RightDrawer"),
  listBottomPanel: async()  => filterPackageComponent(await packages(), "BottomPanel"),
  listRightTab: async()  => filterPackageComponent(await packages(), "RightTab"),
  listBottomTab: async()  => filterPackageComponent(await packages(), "BottomTab"),
  loadPackageManagerConfig,
  installOnlinePackage,
  removePackage,
  removeBackupPackage,
  backupPackage,
  restorePackage,
  publishPackage
};
