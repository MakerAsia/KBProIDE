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
                            {{ updateValue }} %
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
                    <p v-html="update.info"></p>
                </template>
            </v-card-text>
            <v-card-actions v-if="updateStatus !== 'UPDATING'">
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn color="blue darken-1" flat v-on="on" @click="ignoreUpdate(update.type,update.version)">
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
        return new Promise((resolve, reject) => {
          mother.$db.collection("apps").orderBy("date", "desc").limit(1).get().then(appData => {
            if (appData.size >= 1) {
              let data = appData.docs[0].data();
              mother.update = data;
              mother.update.type = "app";
              let arch = require('os').arch();
              if (process.platform === "win32" && arch === "ia32") {
                data.asar =  data.asar + "-win32.zip";
              }else if(process.platform === "win32" && arch === "x64"){
                data.asar =  data.asar + "-win64.zip";
              }else if (process.platform === "darwin") {
                data.asar = data.asar + "-darwin.zip";
              } else if (process.platform === "linux") {
                data.asar = data.asar + "-linux.zip";
              }
              EAU.init({
                         server: false, // Where to check. true: server side, false: client side, default: true.
                         debug: false, // Default: false.
                       });

              EAU.process(data, function(error, last, body) {
                if (!error) {
                  if (
                      mother.$global.setting.ignoreUpdateVersion === last &&
                      forceShowUpdate === false
                  ) {
                    console.log("User ignored update popup");
                    resolve(false);
                    return false;
                  }
                  mother.updateDialog = true;
                  resolve(true);
                  return true;
                } else if (error === "no_update_available") {
                  if (showNotification) {
                    mother.$dialog.notify.info("This is newest version");
                  }
                  resolve(false);
                  return false;
                } else {
                  mother.$dialog.notify.error("check version error : " + error);
                  resolve(false);
                  return false;
                }
              });
            }
          });
        }).then(res => {
          if (!res) { //apps already ignored or updated
            mother.$db.collection("platforms").
            where("platform", "==", mother.$global.board.board_info.platform).
            orderBy("date", "desc").
            limit(1).
            get().
            then(appData => {
              if (appData.size >= 1) {
                let data = appData.docs[0].data();
                mother.update = data;
                mother.update.type = "platform";
                Updater.init(mother.update);
                let pinfoFile = `${util.platformDir}/${mother.$global.board.board_info.platform}/config.js`;
                if (!fs.existsSync(pinfoFile)) {
                  return;
                }
                let currentPlatformInfo = eval(fs.readFileSync(pinfoFile, "utf8"));
                if (mother.update.platform !== mother.$global.board.board_info.platform) {
                  return;
                }
                if (mother.update.version <= currentPlatformInfo.version) {
                  return;
                }
                if (mother.$global.setting.ignorePlatformVersion === mother.update.version && forceShowUpdate ===
                    false) {
                  console.log("User ignored this platform update popup");
                  return;
                }
                mother.updateDialog = true;
              }
            });
          }
        });
      },
      ignoreUpdate(type, version) {
        if (type === "app") {
          mother.$global.setting.ignoreUpdateVersion = version;
          //--tracking--//
          mother.$track.event("update", "ignore",
                            {evLabel: "app_version_" + version, evValue: 1, clientID: mother.$track.clientID})
                    .catch(err=>{ console.log(err)});
        } else if (type === "platform") {
          mother.$global.setting.ignorePlatformVersion = version;
          //--tracking--//
          mother.$track.event("update", "ignore", {
            evLabel: "platform_" + mother.update.platform + "_version_" + version,
            evValue: 1,
            clientID: mother.$track.clientID,
          }).catch(err=>{ console.log(err)});
        } else if (type === "board") {
          //not support yet!
        }
        mother.updateDialog = false;
      },
      updateApp() {
        mother.updateStatus = "UPDATING";
        mother.updateText = "Downloading ... ";
        //======== app update ========//
        if (mother.update.type === "app") {
          EAU.progress(mother.progress);
          EAU.download(function(error) {
            if (error) {
              console.log("update app error : " + error);
              mother.errorAndReset(error);
              return false;
            }
            console.log("Update success");
            mother.updateText = "Restarting ...";
            setTimeout(() => {
              electron.remote.app.relaunch();
              electron.remote.app.exit(0);
            }, 2000);
            //--tracking--//
            mother.$track.event("update", "success",
                              {evLabel: "app_" + mother.update.version, evValue: 1, clientID: mother.$track.clientID})
                        .catch(err=>{ console.log(err)});
          });
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
          )} , speed : ${util.humanFileSize(speed)}/s`;
        }
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
