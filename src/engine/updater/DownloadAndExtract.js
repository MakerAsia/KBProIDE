const {remote} = require("electron");
const FileSystem = require("original-fs");
const Utils = require("util");
const admZip = require("adm-zip");
const fs = require("fs");
const crypto = require("crypto");
const os = require("os");
const path = require("path");
const request = require("request");
const progress = require("request-progress");

import util from "@/engine/utils";

const AppPath = remote.app.getAppPath() + "/";

const errors = [
  "version_not_specified",
  "cannot_connect_to_api",
  "no_update_available",
  "api_response_not_valid",
  "update_file_not_found",
  "failed_to_download_update",
  "failed_to_apply_update",
];

var Updater = {
  /**
   * The setup
   * */
  setup: {
    logFile: "updater-log.txt",
    requestOptions: {},
    callback: false,
    progresscallback: false,
    debug: false,
  },

  /**
   * The new update information
   * */
  update: {
    last: null,
    source: null,
    file: null,
    sha1: null,
  },

  /**
   * Init the module
   * */
  init: function(setup) {
    this.setup = Utils._extend(this.setup, setup);
    this.log("AppPath: " + AppPath);
  },

  /**
   * Sha1
   * */
  sha1: function(buffer) {
    let fsHash = crypto.createHash("sha1");
    fsHash.update(buffer);
    return fsHash.digest("hex");
  },

  /**
   * Logging
   * */
  log: function(line) {
    // Log it
    if (this.setup.debug) {
      console.log("Updater: ", line);
    }

    // Put it into a file
    if (this.setup.logFile) {
      if (this.setup.debug) {
        console.log("%s + %s + %s", AppPath, this.setup.logFile, line);
      }
      //FileSystem.appendFileSync(AppPathFolder + this.setup.logFile, line + "\n");
    }
  },

  /**
   * Triggers the callback you set to receive the result of the update
   * */
  end: function(error, body) {
    if (typeof this.setup.callback !== "function") return false;
    this.setup.callback.call(
        this,
        error !== "undefined" ? errors[error] : false,
        this.update.last,
        body,
    );
  },

  /**
   * Download the update file
   * */
  process: function(targetDir, callback) {
    if (callback) {
      this.setup.callback = callback;
    }

    return new Promise((resolve, reject) => { //download zip
      if (!this.setup.zip) { reject("no zip url found"); }
      const zipFile = `${os.tmpdir()}/${util.randomString(10)}.zip`;
      const file = fs.createWriteStream(zipFile);
      let targetUrl = "";
      let arch = require('os').arch();
      if(process.platform === "win32" && arch === "ia32"){
        targetUrl = `${Updater.setup.zip}-win32.zip`;
      }else if(process.platform === "win32" && arch === "x64"){
        targetUrl = `${Updater.setup.zip}-win64.zip`;
      }else if(process.platform === "darwin"){
        targetUrl = `${Updater.setup.zip}-darwin.zip`;
      }else if(process.platform === "linux"){
        targetUrl = `${Updater.setup.zip}-linux.zip`;
      }
      progress(
          request(targetUrl),
          {
            throttle: 2000, // Throttle the progress event to 2000ms, defaults to 1000ms
            delay: 1000,    // Only start to emit after 1000ms delay, defaults to 0ms
            followAllRedirects: true,
            follow: true,
          },
      ).on("progress", function(state) {
        if (Updater.setup.progresscallback) {
          Updater.setup.progresscallback(state);
        }
      }).on("error", function(err) {
        reject(err);
      }).on("end", function() {
        file.end();
        return resolve(zipFile);
      }).pipe(file);
    }).then((zipFile) => { //unzip file
      if (Updater.setup.sha1) {
        let buffer = FileSystem.readFileSync(zipFile);
        let sha1 = Updater.sha1(buffer);
        if (sha1 !== Updater.setup.sha1) {
          Updater.log("Upload failed! Sha1 code mismatch.");
          reject("Upload failed! Sha1 code mismatch.");
        }
      }
      process.noAsar = true;
      const zip = new admZip(zipFile);
      let unzipRes = zip.extractAllTo(targetDir, true);
      process.noAsar = true;
      return unzipRes;
    }).then(() => { //install platform
      return Promise.resolve();
    });
  },

  progress: function(callback) {
    if (callback) {
      this.setup.progresscallback = callback;
    }
  },
};

export default Updater;