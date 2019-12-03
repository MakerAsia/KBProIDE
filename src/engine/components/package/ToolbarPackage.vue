<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="packageDialog = !packageDialog">
                <v-icon dark>fa-cubes</v-icon>
            </v-btn>
            <span>Package Manager</span>
        </v-tooltip>
        <v-dialog v-model="packageDialog" max-width="70%" max-height="80%" scrollable persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Package Manager</span>
                    <v-spacer class="hidden-xs-only"></v-spacer>
                    <v-text-field
                            prepend-icon="search"
                            label="package name"
                            class="ma-0 pa-0 search-board"
                            single-line
                            clearable
                            hide-details
                            :append-outer-icon="searchText ? 'fa-chevron-circle-right' : ''"
                            @click:append-outer="listAllPackages(searchText)"
                            @click:clear="listAllPackages()"
                            @change="listAllPackages(searchText)"
                            v-model="searchText"></v-text-field>
                    <v-menu v-model="filter.menu" :close-on-content-click="false" :nudge-width="200" left>
                        <v-btn slot="activator" icon>
                            <v-icon>filter_list</v-icon>
                        </v-btn>
                        <v-card class="filter" max-width=350>
                            <v-card-title class="subheading">Filter</v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-list-tile-content>
                                    <v-list-tile-action>
                                        <v-flex xs12 sm12 md12>
                                            <v-combobox
                                                    v-model="filter.order.sortby"
                                                    :items="filter.order.init_orders"
                                                    label="Sort by"
                                            ></v-combobox>
                                        </v-flex>
                                    </v-list-tile-action>
                                </v-list-tile-content>
                                <v-divider></v-divider>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" flat @click="filter.menu = false">Cancel</v-btn>
                                <v-btn color="primary" @click="applyFilter">Apply</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </v-card-title>
                <v-divider></v-divider>
                <smooth-scrollbar ref="scrollbar">
                    <v-card-text>
                        <v-subheader>
                            Installed
                        </v-subheader>
                        <div>
                            <v-list three-line>
                                <template v-for="(data, index) in localPackage">
                                    <v-list-tile :key="data.name" avatar class="list-title">
                                        <v-list-tile-avatar size="60px">
                                            <template v-if="data.config.image">
                                                <v-img contain v-if="data.config.image.startsWith('http') === true"
                                                       :src="data.config.image"/>
                                                <v-img contain v-else
                                                       :src="`file:///${data.dir}/${data.config.image}`"/>
                                            </template>
                                            <v-img contain v-else src="/static/images/noimage.jpg"/>
                                        </v-list-tile-avatar>
                                        <template>
                                            <v-list-tile-content class="ml-2">
                                                <v-list-tile-title>
                                                    <strong v-if="data.config.title || data.config.name">{{data.config.title ? data.config.title :
                                                        typeof(data.config.name) === "string" ? data.config.name : typeof(data.config.name.en) === "string" ?
                                                        data.config.name.en : data.dirName}}</strong>
                                                    <strong v-else>{{data.dirName}}</strong>
                                                    <span class="body-1">
                                                        <span v-if='data.config.version || data.config.author'> [ {{data.config.version ? "v" + data.config.version + " " : ""}}{{data.config.author ? "by " + data.config.author : ""}} ] </span>
                                                        <span v-if='data.config.git'>[ <a @click="openLink(data.config.git)"> git </a> ]</span>
                                                    </span>
                                                </v-list-tile-title>
                                                <v-list-tile-sub-title
                                                        v-html="data.config.description"></v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </template>
                                        <v-list-tile-action>
                                            <v-btn v-if="data.status != 'UPDATABLE'"
                                                   icon fab small dark
                                                   class="red"
                                                   :disabled="data.status != 'READY'"
                                                   @click="removePackage(data.config.name)"
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
                                                        class="green"
                                                        @click="updatePackage(data.config.name)"
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

                            <v-flex v-else-if="onlinePackageStatus === 'wait'" xs12 md12 sm12 class="text-xs-center">
                                <v-progress-circular
                                        :size="50"
                                        color="primary"
                                        indeterminate
                                ></v-progress-circular>
                            </v-flex>

                            <v-list three-line v-else-if="onlinePackageStatus != 'wait'">
                                <template v-for="(data, index) in onlinePackage">
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
                                                    @click="installOnlinePackage(data.name)"
                                            >
                                                <v-icon v-if="data.status === 'READY'">fa-download</v-icon>
                                                <v-icon v-if="data.status === 'DRAFT'">fa-pause</v-icon>
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
                    <v-btn v-if="$global.setting.devMode === true" class="btn-primary" flat
                           @click.native="publishNewPackage">Publish your package
                    </v-btn>
                    <v-btn class="btn-danger" flat @click.native="packageDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  import SmoothScrollbar from "../../views/widgets/list/SmoothScrollbar";
  const { shell } = require("electron");
  const fs = require("fs");
  const request = require("request-promise");

  import util from "@/engine/utils";
  import pm from "@/engine/PackageManager";

  let mother = null;

  export default {
    components: { SmoothScrollbar },
    created: function() {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          if (this.packageDialog === true) {
            console.log("---------> Do something when detect escape / Package Manager");
            this.packageDialog = false;
          }
        }
      });
    },
    data() {
      return {
        packageDialog: false,
        publishPackageDialog: false,
        confirmRemoveDialog: false,
        confirmInstallDialog: false,
        searchText: "",
        isInstalling: false,

        installedPackage: [],
        localPackage: [],
        onlinePackageStatus: "wait",
        onlinePackage: [],
        statusText: "",
        statusProgress: 0,

        filter: {
          defaultLimit: 20,
          currentPage: 1,
          nextOffset: 0,
          menu: false,
          order: {
            init_orders: ["Name", "Newest", "Popular", "Recommended"],
            actual_value: { Name: "title", Newest: "-modified_on", Popular: "installed", Recommended: "rating" },
            sortby: this.$global.package.sortby
          }
        }
      };
    },
    methods: {
      getPackageByName(name) {
        return this.localPackage.find(obj => {
          return obj.name === name;
        });
      },
      getOnlinePackageByName(name) {
        return this.onlinePackage.find(obj => {
          return obj.name === name;
        });
      },
      openLink(url) {
        shell.openExternal(url);
      },
      isOnline() {
        return window.navigator.onLine;
      },
      onScroll(status) {
        if (status.offset.y >= status.limit.y) {
          console.log("load more packages");
          this.listOnlinePackage(this.searchText, true);
        }
      },
      listAllPackages(name = "") {
        this.listOnlinePackage(name);
        this.listLocalPackage(name);
      },
      listOnlinePackage(name = "", loadNext = false) {
        this.onlinePackageStatus = (loadNext)
          ? "OK"
          : "wait";
        //------------//
        let query = {
          "limit": this.filter.defaultLimit,
          "page": this.filter.currentPage,
          "meta": "page",
          "sort": this.filter.order.actual_value[this.filter.order.sortby]
        };
        if (name !== "") {
          query.filter.filter2 = {
            logical: "nest",
            title: { logical: "or", contains: name },
            keywords: { logical: "or", contains: name }
          };
        }
        if (loadNext) {
          query.page = query.page + 1;
          query.offset = this.filter.nextOffset;
          if (this.filter.nextOffset == null) {
            return;
          }
        }
        //--------------//
        pm.listOnlinePackage(query).then(res => {
          //name,start return {end : lastVisible, packages : onlinePackages}
          mother.filter.currentPage = res.meta.page;
          mother.filter.nextOffset = res.meta.next_offset;
          let filtered = [];
          res.packages.forEach(obj => {
            let f = mother.localPackage.find(elm => {
              let lc = elm.config.name.en
                ? elm.config.name.en.toLowerCase()
                : elm.config.name.toLowerCase();
              let rm = obj.name.en
                ? obj.name.en.toLowerCase()
                : obj.name.toLowerCase();
              return lc === rm;
            });
            if (f) {
              if (obj.version > f.config.version && obj.status !== "draft") {
                f.status = "UPDATABLE";
                f.nextVersion = obj.version;
              }
            } else {
              obj.status = obj.status === "published"
                ? "READY"
                : (obj.status === "draft"
                  ? "DRAFT"
                  : "ERROR");
              filtered.push(obj);
            }
          });
          if (loadNext) {
            mother.onlinePackage.push(...filtered);
          } else {
            mother.onlinePackage = filtered;
          }

          //this.onlinePackage = res.packages.map(obj=>{ obj.status =  'READY'; return obj;});
          this.onlinePackageStatus = "OK";
        }).catch(err => {
          this.onlinePackageStatus = "ERROR";
        });
      },
      async listLocalPackage(name = "") {
        console.log("find package = " + name);
        this.localPackage = [];
        let installedPackage = await pm.packages();
        let listedInstalledPackages = [];
        Object.keys(installedPackage).map(name=>{
          let objData = {
            'name' : name,
            'status' : 'READY'
          };
          Object.assign(objData,installedPackage[name]);
          listedInstalledPackages.push(objData);
        });
        this.installedPackage = listedInstalledPackages;
        if (name !== "") {
          this.localPackage = this.installedPackage.filter(obj => {
            return obj.config.title.includes(name);
          });
          this.localPackage = this.localPackage.concat(...this.installedPackage.filter(obj => {
            return (obj.config.keywords)
              ? obj.config.keywords.includes(name)
              : false;
          }));

        } else {
          this.localPackage = this.installedPackage;
        }
      },
      applyFilter() {
        this.filter.menu = false;
        let sortby = this.filter.order.sortby;
        this.$global.package.sortby = sortby;
        this.listAllPackages();
      },
      installOnlinePackage(name) {
        let b = this.getOnlinePackageByName(name);
        b.status = "DOWNLOAD";
        this.statusText = "Downloading";
        this.statusProgress = 0;
        pm.installOnlinePackage(b, progress => {
          //{process : 'board', status : 'DOWNLOAD', state:state }
          if (progress.status === "DOWNLOAD") {
            //when download just show to text
            this.statusText = `Downloading ... ${util.humanFileSize(
              progress.state.size.transferred
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
          //==========================//
          this.listAllPackages();
          this.$dialog.notify.info("Install success");
          this.$global.$emit("render-packages", this.$global.board.board_info);
          //==========================//
          //--tracking--//
          this.$track.event("package", "install", { evLabel: name, evValue: 1, clientID: this.$track.clientID }).catch(err => { console.log(err);});
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
      removePackage: async function(name) {
        const res = await this.$dialog.confirm({
          text: "Do you really want to remove " + name + "? , this process will clear your code.",
          title: "Warning"
        });
        if (res === true) {
          console.log("removing package : " + name);
          let b = this.getPackageByName(name);
          pm.removePackage(b).then(() => {
            this.$global.blockCode = "";
            this.$dialog.notify.info("Remove package success");
            pm.clearListedPackage();
            this.listAllPackages();
            this.$global.$emit("board-change", this.$global.board.board_info);
            //--tracking--//
            this.$track.event("package", "remove", { evLabel: name, evValue: 1, clientID: this.$track.clientID }).catch(err => { console.log(err);});
          }).catch(err => {
            this.$dialog.notify.error("Cannot remove package : " + err);
            console.log("Error : cannot remove package");
            console.log(err);
          });
        }
      },
      updatePackage: async function(name) {
        const res = await this.$dialog.confirm({
          text: "Do you want to update " + name + " package?",
          title: "Warning"
        });
        if (res === true) {
          let p = this.getPackageByName(name);
          let st = p.status;
          pm.backupPackage(p).then(() => {
            console.log("update package : " + name);
            p.status = "DOWNLOAD";
            this.statusText = "Downloading";
            this.statusProgress = 0;
            return pm.installOnlinePackage(p.config, progress => {
              //{process : 'board', status : 'DOWNLOAD', state:state }
              if (progress.status === "DOWNLOAD") {
                //when download just show to text
                this.statusText = `Downloading ... ${util.humanFileSize(
                  progress.state.size.transferred
                )} at ${(progress.state.speed / 1000.0 / 1000.0).toFixed(
                  2
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
            pm.removePackage(p, true).then(() => {
              this.$dialog.notify.info("Update package success");
              this.listAllPackages();
              setTimeout(() => {
                this.$global.$emit(
                  "board-change",
                  this.$global.board.board_info
                );
              }, 1000);
              //--tracking--//
              Vue.prototype.$track.event("package", "update", { evLabel: name, evValue: 1, clientID: this.$track.clientID }).catch(err => { console.log(err);});
            });

          }).catch(err => {
            this.statusText = `Error : ${err}`;
            p.status = "ERROR";
            setTimeout(() => {
              p.status = st;
              this.statusText = "";
            }, 5000);
            pm.restorePackage(p).then(() => {});
          });
        }
      },
      publishNewPackage: async function() {
        let res = await this.$dialog.prompt({
          text: "https://github.com/user/repo/",
          title: "Input Package Repository"
        });
        if (res === false) { // user cancel
          return;
        }
        this.$dialog.notify.info("Please wait...");
        if (!res.endsWith("/")) { res += "/"; }
        pm.publishPackage(res).then(_ => {
          this.$dialog.notify.success("submit your package success, please refresh again");
        }).catch(err => {
          if (typeof err === "string") {
            this.$dialog.notify.error(err);
          } else {
            this.$dialog.notify.error("Error something went wrong, please check the log");
          }
          console.log("publish package error -----");
          console.error(err);
        });
      }
    },
    mounted() {
      mother = this;
      if (this.$refs.scrollbar) {
        this.$refs.scrollbar.scrollbar.addListener(this.onScroll);
      }
    },
    destroyed() {
      if (this.$refs.scrollbar) {
        this.$refs.scrollbar.scrollbar.removeListener(this.onScroll);
      }
    },
    watch: {
      packageDialog: function(val) {
        if (val) {
          //on opening
          this.searchText = "";
          this.filter.nextOffset = 0;
          this.filter.currentPage = 1;
          this.listAllPackages();
        }
      }
    }
  };
</script>
<style lang="stylus">
    @import "../../../theme/component-design.styl"

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
