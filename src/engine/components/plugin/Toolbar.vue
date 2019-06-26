<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="pluginDialog = !pluginDialog">
                <v-icon dark>fa-plug</v-icon>
            </v-btn>
            <span>Plugin Manager</span>
        </v-tooltip>
        <v-dialog v-model="pluginDialog" max-width="70%" max-height="80%" scrollable persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Plugin Manager</span>
                    <v-spacer class="hidden-xs-only"></v-spacer>
                    <v-text-field
                            prepend-icon="search"
                            label="plugin name"
                            class="ma-0 pa-0 search-board"
                            single-line
                            clearable
                            hide-details
                            :append-outer-icon="searchText ? 'fa-chevron-circle-right' : ''"
                            v-model="searchText"></v-text-field>
                </v-card-title>
                <v-divider></v-divider>
                <smooth-scrollbar>
                    <v-card-text>
                        <v-subheader>
                            Installed
                        </v-subheader>
                        <div>
                            <v-list three-line>
                                <template v-for="(data, index) in localPlugin">
                                    <v-list-tile :key="data.name" avatar class="list-title">
                                        <v-list-tile-avatar size="60px">
                                            <template v-if="data.category.image">
                                                <v-img contain v-if="data.category.image.startsWith('http') === true"
                                                       :src="data.category.image"/>
                                                <v-img contain v-else
                                                       :src="`file:///${data.directory}/${data.category.image}`"/>
                                            </template>
                                            <v-img contain v-else src="/static/images/noimage.jpg"/>
                                        </v-list-tile-avatar>
                                        <template v-if='data.category.name && typeof(data.category.name) === "string"'>
                                            <v-list-tile-content class="ml-2">
                                                <v-list-tile-title>
                                                    <strong>{{data.category.title}}</strong>
                                                    <span class="body-1">
                                                        [ v{{data.category.version}} by {{data.category.author}} ]
                                                        [ <a v-if="data.category.git"
                                                             @click="openLink(data.category.git)"> git </a> ]
                                                    </span>
                                                </v-list-tile-title>
                                                <v-list-tile-sub-title
                                                        v-html="data.category.description"></v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </template>
                                        <template v-else>
                                            <v-list-tile-content class="ml-2">
                                                <strong>Please migrate your json file to use this feature</strong>
                                                <span class="body-1">Plugin : {{data.category.name.en}} <br/>Tutorial : https://kbide.org/tutorials/plugin </span>
                                            </v-list-tile-content>
                                        </template>
                                        <v-list-tile-action
                                                v-if='data.category.name && typeof(data.category.name) === "string"'>
                                            <v-btn v-if="data.status != 'UPDATABLE'"
                                                   icon fab small dark
                                                   class="red"
                                                   :disabled="data.status != 'READY'"
                                                   @click="removePlugin(data.category.name)"
                                            >
                                                <v-icon v-if="data.status == 'READY'">fa-trash</v-icon>
                                                <v-progress-circular
                                                        v-else-if="data.status != 'READY'"
                                                        indeterminate
                                                        color="primary lighten-4"
                                                >
                                                </v-progress-circular>
                                            </v-btn>
                                            <template v-else>
                                                <v-btn
                                                        icon fab small dark
                                                        class="red"
                                                        @click="updatePlugin(data.category.name)"
                                                >
                                                    <v-icon>fa-retweet</v-icon>
                                                </v-btn>

                                            </template>
                                        </v-list-tile-action>
                                        <p v-if="data.status != 'READY'" class="text-info-status">{{statusText}}</p>
                                    </v-list-tile>
                                    <v-divider :key="index" inset></v-divider>
                                </template>
                            </v-list>
                        </div>

                        <v-divider></v-divider>

                        <v-subheader>
                            Online available
                        </v-subheader>

                        <div>
                            <v-flex v-if="isOnline() === false" xs12 md12 sm12 class="text-xs-center">
                                Please connect internet to use this feature.
                            </v-flex>

                            <v-flex v-else-if="onlinePluginStatus === 'wait'" xs12 md12 sm12 class="text-xs-center">
                                <v-progress-circular
                                        :size="50"
                                        color="primary"
                                        indeterminate
                                ></v-progress-circular>
                            </v-flex>

                            <v-list three-line v-else-if="onlinePluginStatus != 'wait'">
                                <template v-for="(data, index) in onlinePlugin">
                                    <v-list-tile
                                            :key="data.name"
                                            avatar
                                            class="list-title"
                                    >
                                        <v-list-tile-avatar size="60px">
                                            <v-img contain v-if="data.image.startsWith('http') === true"
                                                   :src="data.image"/>
                                            <v-img contain v-else :src="`${data.git}/raw/master/${data.image}`"/>
                                        </v-list-tile-avatar>
                                        <v-list-tile-content class="ml-2">
                                            <v-list-tile-title>
                                                <strong>{{data.title}}</strong>
                                                <span class="body-1">
                                                    [ v{{data.version}} by {{data.author}} ]
                                                    [ <a v-if="data.git" @click="openLink(data.git)"> git </a> ]
                                                </span>
                                            </v-list-tile-title>
                                            <v-list-tile-sub-title v-html="data.description"></v-list-tile-sub-title>
                                        </v-list-tile-content>

                                        <v-list-tile-action>
                                            <v-btn
                                                    icon fab small dark
                                                    class="primary"
                                                    :disabled="data.status !== 'READY'"
                                                    @click="installOnlinePlugin(data.name)"
                                            >
                                                <v-icon v-if="data.status === 'READY'">fa-download</v-icon>
                                                <v-progress-circular
                                                        v-else-if="data.status !== 'READY'"
                                                        indeterminate
                                                        color="primary lighten-4"
                                                >
                                                </v-progress-circular>
                                            </v-btn>
                                        </v-list-tile-action>
                                        <p v-if="data.status !== 'READY'" class="text-info-status">{{statusText}}</p>
                                    </v-list-tile>
                                    <v-divider :key="index" inset></v-divider>
                                </template>
                            </v-list>
                        </div>
                    </v-card-text>
                </smooth-scrollbar>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="$global.setting.devMode === true" color="blue darken-1" flat
                           @click.native="publishNewPlugin">Publish your plugin
                    </v-btn>
                    <v-btn color="blue darken-1" flat @click.native="pluginDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  const {shell} = require("electron");
  const fs = require("fs");
  const request = require("request-promise");

  import util from "@/engine/utils";
  import pm from "@/engine/PluginManager";

  var mother = null;

  export default {
    data() {
      return {
        pluginDialog: false,
        confirmRemoveDialog: false,
        confirmInstallDialog: false,
        searchText: "",
        isInstalling: false,

        installedPlugin: pm.plugins(this.$global.board.board_info).map(obj => {
          obj.status = "READY";
          return obj;
        }),
        localPlugin: pm.plugins(this.$global.board.board_info).map(obj => {
          obj.status = "READY";
          return obj;
        }),
        onlinePluginStatus: "wait",
        onlinePluginPage: 0,
        onlinePlugin: [],
        statusText: "",
        statusProgress: 0,
      };
    },
    methods: {
      getPluginByName(name) {
        return this.localPlugin.find(obj => {
          return obj.category.name === name;
        });
      },
      getOnlinePluginByName(name) {
        return this.onlinePlugin.find(obj => {
          return obj.name === name;
        });
      },
      openLink(url) {
        shell.openExternal(url);
      },
      isOnline() {
        return window.navigator.onLine;
      },
      listAllPlugins(name = "") {
        this.listOnlinePlugin(name);
        this.listLocalPlugin(name);
      },
      listOnlinePlugin(name = "") {
        this.onlinePluginStatus = "wait";
        var boardInfo = this.$global.board.board_info;
        pm.listOnlinePlugin(boardInfo, name).then(res => {
          //name,start return {end : lastVisible, plugins : onlinePlugins}
          this.onlinePluginPage = res.end;
          let filtered = [];
          res.plugins.forEach(obj => {
            let f = mother.localPlugin.find(
                elm => elm.category.name === obj.name,
            );
            if (f) {
              if (obj.version > f.category.version) {
                f.status = "UPDATABLE";
                f.nextVersion = obj.version;
              }
            } else {
              obj.status = "READY";
              filtered.push(obj);
            }
          });
          mother.onlinePlugin = filtered;
          //this.onlinePlugin = res.plugins.map(obj=>{ obj.status =  'READY'; return obj;});
          this.onlinePluginStatus = "OK";
        }).catch(err => {
          this.onlinePluginStatus = "ERROR";
        });
      },
      listLocalPlugin(name = "") {
        this.localPlugin = [];
        this.installedPlugin = pm.plugins(this.$global.board.board_info).map(obj => {
          obj.status = "READY";
          return obj;
        });
        if (name != "") {
          this.localPlugin = this.installedPlugin.filter(obj => {
            return obj.name.startsWith(name);
          });
        } else {
          this.localPlugin = this.installedPlugin;
        }
      },
      installOnlinePlugin(name) {
        let b = this.getOnlinePluginByName(name);
        b.status = "DOWNLOAD";
        this.statusText = "Downloading";
        this.statusProgress = 0;
        pm.installOnlinePlugin(b, progress => {
          //{process : 'board', status : 'DOWNLOAD', state:state }
          if (progress.status === "DOWNLOAD") {
            //when download just show to text
            this.statusText = `Downloading ... ${util.humanFileSize(
                progress.state.size.transferred,
            )} at ${(progress.state.speed / 1000.0 / 1000.0).toFixed(2)}Mbps`;
          } else if (progress.status === "UNZIP") {
            b.status = "UNZIP";
            this.statusText = `Unzip file ${progress.state.percentage}%`;
            this.statusProgress = progress.state.percentage;
          }
        }).then(() => {
          //install success
          b.status = "INSTALLED";
          this.statusText = "";
          this.listAllPlugins();
          this.$dialog.notify.info("Install success");
          this.$global.$emit("board-change", this.$global.board.board_info);
          //--tracking--//
          this.$track.event("plugin", "install", {evLabel: name, evValue: 1, clientID: this.$track.clientID}).catch(err => { console.log(err);});
        }).catch(err => {
          console.log(err);
          this.statusText = `Error : ${err}`;
          b.status = "ERROR";
          setTimeout(() => {
            b.status = "READY";
            this.statusText = "";
          }, 5000);
        });
      },
      removePlugin: async function(name) {
        const res = await this.$dialog.confirm({
          text:
              "Do you really want to remove " +
              name +
              "? , this process will clear your code.",
          title: "Warning",
        });
        if (res === true) {
          console.log("removing plugin : " + name);
          let b = this.getPluginByName(name);
          pm.removePlugin(b.category).then(() => {
            this.$global.blockCode = "";
            this.$dialog.notify.info("Remove plugin success");
            this.listAllPlugins();
            this.$global.$emit("board-change", this.$global.board.board_info);
            //--tracking--//
            this.$track.event("plugin", "remove", {evLabel: name, evValue: 1, clientID: this.$track.clientID}).catch(err => { console.log(err);});
          }).catch(err => {
            this.$dialog.notify.error("Cannot remove plugin : " + err);
            console.log("Error : cannot remove plugin");
            console.log(err);
          });
        }
      },
      updatePlugin: async function(name) {
        const res = await this.$dialog.confirm({
          text: "Do you want to update " + name + " plugin?",
          title: "Warning",
        });
        if (res === true) {
          var p = this.getPluginByName(name);
          var st = p.status;
          pm.backupPlugin(p.category).then(() => {
            console.log("update plugin : " + name);
            p.status = "DOWNLOAD";
            this.statusText = "Downloading";
            this.statusProgress = 0;
            return pm.installOnlinePlugin(p.category, progress => {
              //{process : 'board', status : 'DOWNLOAD', state:state }
              if (progress.status === "DOWNLOAD") {
                //when download just show to text
                this.statusText = `Downloading ... ${util.humanFileSize(
                    progress.state.size.transferred,
                )} at ${(progress.state.speed / 1000.0 / 1000.0).toFixed(
                    2,
                )}Mbps`;
              } else if (progress.status === "UNZIP") {
                p.status = "UNZIP";
                this.statusText = `Unzip file ${progress.state.percentage}%`;
                this.statusProgress = progress.state.percentage;
              }
            });
          }).then(() => {
            //install success
            p.status = "READY";
            this.statusText = "";
            pm.removePlugin(p.category, true).then(() => {
              this.$dialog.notify.info("Update plugin success");
              this.listAllPlugins();
              setTimeout(() => {
                this.$global.$emit(
                    "board-change",
                    this.$global.board.board_info,
                );
              }, 1000);
              //--tracking--//
              Vue.prototype.$track.event("plugin", "update", {evLabel: name, evValue: 1, clientID: this.$track.clientID}).catch(err => { console.log(err);});
            });

          }).catch(err => {
            this.statusText = `Error : ${err}`;
            p.status = "ERROR";
            setTimeout(() => {
              p.status = st;
              this.statusText = "";
            }, 5000);
            pm.restorePlugin(p.category).then(() => {});
          });
        }
      },
      publishNewPlugin: async function() {
        let res = await this.$dialog.prompt({
          text: "https://github.com/user/repo/",
          title: "Input Board Repository",
        });
        var json = null;
        if (util.regex.isValidGithubUrl(res)) {
          this.$dialog.notify.info("Please wait...");
          request(res + "raw/master/library.json?random=" + util.randomString()) //add randomstring prevent cached response
          .then(res => {
            json = JSON.parse(res);
            if (json.name) {
              //search if existing
              return Vue.prototype.$db.collection("plugins").where("name", "==", json.name) //search start with
              .get();
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
                this.$dialog.notify.success("submit your plugin success, please refresh again");
              }
            } else {
              this.$dialog.notify.error(
                  "Existing plugin name or is not newest version",
              );
              return false;
            }
          }).catch(err => {
            console.log("request error -----");
            console.log(err);
            this.$dialog.notify.error(
                "Error something went wrong, please check the log",
            );
          });
        } else {
          this.$dialog.notify.error(
              "Github link format error. Please check your link again",
          );
        }
      },
    },
    mounted() {
      //console.log(this.localPlugin);
      mother = this;
    },
    destroyed() {},
    watch: {
      pluginDialog: function(val) {
        if (val) {
          //on opening
          this.listAllPlugins();
        }
      },
    },
  };
</script>
<style>
    .list-title {
        background-color: white !important;
    }

    .v-list--three-line .v-list__tile__avatar {
        margin-top: unset !important;
        margin-left: -5px !important;
    }

    .list-title:hover {
        background: #eee !important;
    }

    .text-info-status {
        position: absolute;
        font-size: 12px;
        right: 0px;
        background-color: white;
        margin: 0;
        margin-right: 10px;
        bottom: 2px;
        z-index: 999;
    }

    .search-board {
        width: 40px;
        margin-bottom: -10px !important;
    }
</style>
