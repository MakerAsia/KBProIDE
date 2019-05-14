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

  var mother = null;
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
        this.checkUpdate(true, true);
      });
    },
    mounted() {

    },
    destroyed() {

    },
    methods: {
      isOnline() {
        return window.navigator.onLine;
      },
      checkUpdate(showNotification = false, forceShowUpdate = false) {
        this.$db.collection("update").get().then(appData => {
          if (appData.size === 1) {
            let data = appData.docs[0].data();
            mother.update = data;
            if (this.update.type === "app") {
              //this.updateDialog = true;
              EAU.init({
                         "server": false, // Where to check. true: server side, false: client side, default: true.
                         "debug": false, // Default: false.
                       });
              EAU.process(data, function(error, last, body) {
                if (!error) {
                  if (mother.$global.setting.ignoreUpdateVersion === last && forceShowUpdate === false) {
                    console.log("User ignored update popup");
                    return false;
                  }
                  mother.updateDialog = true;
                } else if (error === "no_update_available") {
                  if (showNotification) {
                    mother.$dialog.notify.info("This is newest version");
                  }
                  return false;
                } else {
                  mother.$dialog.notify.error("check version error : " + error);
                  return false;
                }
              });
            } else if (this.update.type === "platform") {
              Updater.init(this.update);
              if (mother.$global.setting.ignorePlatformVersion === mother.update.version && forceShowUpdate === false) {
                console.log("User ignored this platform update popup");
                return;
              }
              mother.updateDialog = true;
            } else if (mother.update.type === "board") {
              //not support patching yet
            }
          }
        });
      },
      ignoreUpdate(type,version) {
        if(type === "app"){
          this.$global.setting.ignoreUpdateVersion = version;
        }else if(type === "platform"){
          this.$global.setting.ignorePlatformVersion = version;
        }else if(type === "board"){
          //not support yet!
        }
        this.updateDialog = false;
      },
      updateApp() {
        this.updateStatus = "UPDATING";
        this.updateText = "Downloading ... ";
        //======== app update ========//
        if (this.update.type === "app") {
          EAU.progress(mother.progress);
          EAU.download(function(error) {
            if (error) {
              console.log("update app error : " + error);
              mother.errorAndReset();
              return false;
            }
            console.log("Update success");
            mother.updateText = "Restarting ...";
            setTimeout(() => {
              electron.remote.app.relaunch();
              electron.remote.app.exit(0);
            }, 2000);
          });
        } else if (this.update.type === "platform") {
          Updater.progress(mother.progress);
          Updater.process(util.platformDir).then(() => {
            console.log("Update platform success");
            mother.updateText = "Reloading in 2 seconds ...";
            setTimeout(() => {
              document.location.reload();
            }, 2000);
          }).catch(err => {
            console.log("update platform error : " + err);
            mother.errorAndReset();
            return false;
          });
        }
      },
      progress(state) {
        if (state.size.total) {
          mother.updateValue = Math.round(state.percent * 100);
          mother.updateText = `Downloading ${util.humanFileSize(state.size.transferred)} of ${util.humanFileSize(
              state.size.total)}, speed : ${util.humanFileSize(state.speed)}/s`;
        } else {
          mother.updateText = `Downloading ${util.humanFileSize(
              state.size.transferred)} , speed : ${util.humanFileSize(speed)}/s`;
        }
      },
      errorAndReset(){
        mother.updateStatus = "ERROR";
        mother.updateText = error;
        setTimeout(() => {
          mother.updateStatus = "IDLE";
        }, 2000);
      }
    },
    watch: {
      /*pluginDialog : function(val){
          if(val){//on opening
              this.listOnlinePlugin();
          }
      }*/
    },
  };
</script>