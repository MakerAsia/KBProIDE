<template>
    <!-- app updater -->
    <v-dialog v-model="updateDialog" scrollable persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">New version found!</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="height: 300px;">
                <template v-if="updateStatus === 'UPDATING'">
                    <div class="text-xs-center mt-3">
                        <v-progress-circular
                                :rotate="360"
                                :size="200"
                                :width="30"
                                :value="updateValue"
                                :indeterminate="updateValue < 0"
                                color="teal"
                        >
                            {{ (updateValue > 0)? (updateValue + "%") : "" }}
                        </v-progress-circular>
                    </div>
                    <div class="text-xs-center mt-4">
                        <span>{{updateText}}</span>
                    </div>
                </template>
                <template v-else-if="updateStatus === 'ERROR'">
                    <div class="text-xs-center mt-3">
                        <v-icon :size="200" color="red">fa-exclamation-triangle</v-icon>
                    </div>
                </template>
                <template v-else>
                    <p v-html="update.description"></p>
                </template>
            </v-card-text>
            <v-card-actions v-if="updateStatus !== 'UPDATING'">
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn color="blue darken-1" flat v-on="on" @click="ignoreUpdate(update.id)">
                            Ignore this version
                        </v-btn>
                    </template>
                    <span>Ignore this version but you can manually update by click 'help -> Update' on menubar</span>
                </v-tooltip>
                <v-btn color="blue darken-1" flat @click="updateDialog = false">Next time</v-btn>
                <v-btn color="primary" @click="updateApp">Update Now!</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- end update -->
</template>

<script>
  const fs = require("fs");
  import util from "@/engine/utils";
  import Updater from "@/engine/updater/DownloadAndExtract";

  const EAU = require("electron-asar-hot-updater");
  const electron = require("electron");
  const requests = require("request-promise");

  let mother = null;
  export default {
    name: "app-updater",
    components: {},
    data() {
      return {
        updateDialog: false,
        update: {
          info: "",
          version: "",
          id : -1
        },
        updateStatus: "IDLE",
        updateValue: 0,
        updateText: "",
      };
    },
    created() {
      mother = this;
      this.checkUpdate();
      electron.ipcRenderer.on("help-update", () => {
        mother.$dialog.notify.info("Checking new update");
        mother.checkUpdate(true, true);
      });
    },
    mounted() {},
    destroyed() {},
    methods: {
      isOnline() {
        return window.navigator.onLine;
      },
      checkUpdate(showNotification = false, forceShowUpdate = false) {
        return new Promise((resolve,reject)=> {
          let query = {
            limit : 1,
            "sort" : "-release_date"
          };
          Vue.prototype.$db2.getItems("version", query).then((res) => {
            if(res && res.data && res.data.length === 1 && res.data[0].status === "published"){
              let data = res.data[0];
              let arch = require('os').arch();
              if (process.platform === "win32" && arch === "ia32") {
                data.zip =  data.zip + "-win32.zip";
              }else if(process.platform === "win32" && arch === "x64"){
                data.zip =  data.zip + "-win64.zip";
              }else if (process.platform === "darwin") {
                data.zip = data.zip + "-darwin.zip";
              } else if (process.platform === "linux") {
                if(arch.startsWith("armv7")){
                  data.zip = data.zip + "-linux-armv7.zip";
                }else if(arch.startsWith("arm64")){
                  data.zip = data.zip + "-linux-arm64.zip";
                }else{
                  data.zip = data.zip + "-linux.zip";
                }
              }
              mother.update = data;
              console.log("checking new update ==>");
              console.log(data);

              EAU.init({
                server: false, // Where to check. true: server side, false: client side, default: true.
                debug: false, // Default: false.
              });
              if(data.type.length === 1 && data.type[0] === "platform"){
                //single platform update, let check
                let havePlatform = fs.readdirSync(util.platformDir);
                if(!havePlatform.includes(data.name)) {//found target platform
                  return resolve("no target platform");
                }
                let platformInfoFile = `${util.platformDir}/${data.name}/config.js`;
                if (!fs.existsSync(platformInfoFile)) {
                  return resolve("Target platform no config file");
                }
                if (mother.$global.setting.ignoreUpdateVersionID === data.id && forceShowUpdate === false){
                  console.log("User ignored update popup");
                  return resolve(false);
                }
                let currentPlatformInfo = eval(fs.readFileSync(platformInfoFile, "utf8"));
                if (data.version <= currentPlatformInfo.version) {
                  if (showNotification) {
                    mother.$dialog.notify.info("This is newest version");
                  }
                  return resolve(false); // no
                }
                EAU.update = { last: data.version, info : data, source : data.zip };
                mother.updateDialog = true;
                return resolve(true);
              }else if(data.type.includes("app")) {
                EAU.process(data, function(error, last, body) {
                  if (!error) {
                    if (
                      mother.$global.setting.ignoreUpdateVersionID === last &&
                      forceShowUpdate === false
                    ) {
                      console.log("User ignored update popup");
                      return resolve(false);
                    }
                    mother.updateDialog = true;
                    return resolve(true);
                  } else if (error === "no_update_available") {
                    if (showNotification) {
                      mother.$dialog.notify.info("This is newest version");
                    }
                    return resolve(false);
                  } else {
                    mother.$dialog.notify.error("check version error : " + error);
                    return resolve(false);
                  }
                });
              }
            }
          }).catch(err => {
            console.error("list online board error : " + err);
            reject(err);
          });
        });
      },
      ignoreUpdate(version) {
        mother.$global.setting.ignoreUpdateVersionID = version;
        //--tracking--//
        mother.$track.event("update", "ignore",
                            {evLabel: "app_version_" + version, evValue: 1, clientID: mother.$track.clientID})
                    .catch(err=>{ console.log(err)});
        mother.updateDialog = false;
      },
      updateApp() {
        mother.updateStatus = "UPDATING";
        mother.updateText = "Downloading ... ";
        //======== app update ========//
        let extractPath = util.baseDir;
        EAU.progress(mother.progress);
        EAU.registerUnzipCallback(mother.onUnzip);
        EAU.download(extractPath, function(error) {
          mother.updateValue = 100;
          if (error) {
            console.log("update app error : " + error);
            mother.errorAndReset(error);
            return false;
          }
          if (fs.existsSync(util.baseDir + "/migrate.js")){
            mother.updateText = "Migrating to new version ...";
            let mgFile = util.baseDir + "/migrate.js";
            let mg = util.requireFunc(mgFile);
            if("migrate" in mg){
              mg.migrate();
            }
          }else{
            console.log("not found migrate file.");
          }
          console.log("Update success");
          if(mother.update.type.includes("app")){ // app need to be restarted
            mother.updateText = "Restarting ...";
            setTimeout(() => {
              electron.remote.app.relaunch();
              electron.remote.app.exit(0);
            }, 2000);
          }else{                                  // others type just reload
            let timeout = 6;
            let reloader = function(){
              timeout--;
              mother.updateText = "Reloading in "+timeout+" second(s) ...";
              if(timeout < 0){
                document.location.reload();
              }else{
                setTimeout(()=> reloader(timeout),1000);
              }
            };
            reloader(timeout);
          }
          //--tracking--//
          mother.$track.event("update", "success",
                            {evLabel: "app_" + mother.update.version, evValue: 1, clientID: mother.$track.clientID})
                      .catch(err=>{ console.log(err)});
        });
        /*
        } else if (mother.update.type === "platform") {
          Updater.progress(mother.progress);
          //let currentPlatformDir = `${util.platformDir}/${mother.$global.board.board_info.platform}`;
          let currentPlatformDir = `${util.platformDir}`;
          Updater.process(currentPlatformDir).then(() => {
            console.log("Update platform success");
            mother.updateText = "Reloading in 2 seconds ...";
            setTimeout(() => {
              document.location.reload();
            }, 2000);
            //--tracking--//
            mother.$track.event("update", "success", {
              evLabel: "platform_" + mother.update.platform + "_version_" + mother.update.version,
              evValue: 1,
              clientID: mother.$track.clientID,
            }).catch(err=>{ console.log(err)});
          }).catch(err => {
            //--tracking--//
            mother.$track.event("update", "failed", {
              evLabel: mother.update.name + "_" + mother.update.version,
              evValue: 1,
              clientID: mother.$track.clientID,
            }).catch(err=>{ console.log(err)});
            console.log("update platform error : " + err);
            mother.errorAndReset(err);
            return false;
          });
        }
        */

      },
      progress(state) {
        if (state.size.total) {
          mother.updateValue = Math.round(state.percent * 100);
          mother.updateText = `Downloading ${util.humanFileSize(
              state.size.transferred,
          )} of ${util.humanFileSize(
              state.size.total,
          )}, speed : ${util.humanFileSize(state.speed)}/s`;
        } else {
          mother.updateText = `Downloading ${util.humanFileSize(
              state.size.transferred,
          )} , speed : ${util.humanFileSize(state.speed)}/s`;
        }
      },
      onUnzip(file){
        mother.updateText = "Unzip ... Please wait";
        mother.updateValue = -1;
      },
      errorAndReset(error) {
        mother.updateStatus = "ERROR";
        mother.updateText = error;
        setTimeout(() => {
          mother.updateStatus = "IDLE";
        }, 3000);
      },
    },
    watch: {

    },
  };
</script>
