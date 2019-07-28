import util from "@/engine/utils";
import fs from "fs";

const os = require("os");
const request = require("request");
const progress = require("request-progress");

const getPlatformInfo = function(name) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$db.collection("platforms")
    .where("name", "==", name)
    .get()
    .then(platformData => {
        platformData.forEach(element => {
        resolve(element.data());
      });
    }).
    catch(err => {
      reject(err);
    });
  });
};
const installPlatformByName = function(name, cb) {
  return new Promise((resolve, reject) => {
    return getPlatformInfo(name);
  }).then(info => {
    if (info.platform) {
      return installPlatformByName(info.name);
    }
    return info;
  }).then((info) => {
    if (info && info.zip) {
      if (fs.readdirSync(util.platformDir).includes(info.name)) {
        return null;
      } else { //download file
        let targetPlatform = process.platform;
        let arch = require('os').arch();
        if(targetPlatform === "win32" && arch === "ia32"){
          targetPlatform = "win32";
        }else if(targetPlatform === "win32" && arch === "x64"){
          targetPlatform = "win64";
        }
        let zipUrl = info.zip + "-" + targetPlatform +".zip";
        let zipFile = os.tmpdir() + "/" + util.randomString(10) + ".zip";
        progress(
            request(zipUrl),
            {
              throttle: 2000, // Throttle the progress event to 2000ms, defaults to 1000ms 
              delay: 1000,    // Only start to emit after 1000ms delay, defaults to 0ms 
              followAllRedirects: true,
              follow: true,
            },
        ).on("progress", function(state) {
          cb && cb({process: "platform", status: "DOWNLOAD", state: state});
        }).on("error", function(err) {
          return Promise.reject(err);
        }).on("end", function() { //downloaded
          return utils.unzip(zipFile, {dir: utils.platformDir}, p => {
            cb && cb({process: "platform", status: "UNZIP", state: p});
          });
        }).pipe(fs.createWriteStream(zipFile));
      }
    } else {
      return Promise.reject("no data passing");
    }
  }).then(() => {
    /*let dirs = fs.readdirSync(util.platformDir);
    for (let i = 0; i < dirs.length; i++) {
      let dirname = dirs[i];
      if (fs.statSync(dirname).isDirectory() && dirname.endsWith("-master")) {
        fs.renameSync(path.join(util.platformDir, dirname),
                      path.join(util.platformDir,
                                dirname.replace("-master", "")));
      }
    }*/
    return true;
  });
};

const updatePlatformByName = function(name) {

};

export default {
  installPlatformByName,
  updatePlatformByName,
};