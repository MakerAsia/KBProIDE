import util from "@/engine/utils";
import fs from "fs";

const os = require("os");
const request = require("request");
const progress = require("request-progress");

const getPlatformInfo = function(name) {
  return new Promise((resolve, reject) => {
    let query = { filter: { name: { eq: name } } };
    Vue.prototype.$db2.getItems("platforms", query).then((data, meta) => {
      resolve(data.data);
    }).catch(err => {
      console.error("list online platform error : " + err);
      reject(err);
    });
  });
};
const installPlatformByName = function(name, cb) {
  return new Promise((resolve, reject) => {
    getPlatformInfo(name).then(info=>{
      if(!info){
        reject("no platform info");
      }
      if(info.length === 0){
        reject("no platform info");
      }
      console.log("received platform");
      console.log(info);
      info = info[0];
      if (info.status !== "published"){
        reject("platform is not published yet");
      }
      if (info.platform && info.platform !== "") {
        return installPlatformByName(info.name);
      }
      if (info.zip == null){
        reject("platform not contain release zip file");
      }
      if (fs.readdirSync(util.platformDir).includes(info.name)) {
        reject("your already have this platform");
      } else { //download file
        let arch = require('os').arch();
        if (process.platform === "win32" && arch === "ia32") {
          info.zip =  info.zip + "-win32.zip";
        }else if(process.platform === "win32" && arch === "x64"){
          info.zip =  info.zip + "-win64.zip";
        }else if (process.platform === "darwin") {
          info.zip = info.zip + "-darwin.zip";
        } else if (process.platform === "linux") {
          if(arch.startsWith("armv7")){
            info.zip = info.zip + "-linux-armv7.zip";
          }else if(arch.startsWith("arm64")){
            info.zip = info.zip + "-linux-arm64.zip";
          }else{
            info.zip = info.zip + "-linux.zip";
          }
        }
        let zipUrl = info.zip;
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
          reject(err);
        }).on("end", function() { //downloaded
          util.unzip(zipFile, {dir: util.platformDir}, p => {
            cb && cb({process: "platform", status: "UNZIP", state: p});
          }).then(()=>{
            resolve();
          }).catch(err=>{
            reject(err);
          });
        }).pipe(fs.createWriteStream(zipFile));
      }
    });
  })
};

const updatePlatformByName = function(name) {

};

export default {
  installPlatformByName,
  updatePlatformByName,
};
