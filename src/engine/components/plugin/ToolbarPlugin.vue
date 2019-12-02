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
                            @click:append-outer="listAllPlugins(searchText)"
                            @click:clear="listAllPlugins()"
                            @change="listAllPlugins(searchText)"
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
                                <v-list-tile-content>
                                    <v-list-tile-title>Categories</v-list-tile-title>
                                    <div>
                                        <v-btn flat small color="primary"
                                               @click="filter.categories.selected = filter.categories.init_selected">select all
                                        </v-btn>
                                        <v-btn flat small color="primary"
                                               @click="filter.categories.selected = []">select none
                                        </v-btn>
                                    </div>
                                    <v-list-tile-action>
                                        <v-item-group multiple v-model="filter.categories.selected">
                                            <v-item v-for="(data,index) in filter.categories.name" :key="index">
                                                <v-chip
                                                        slot-scope="{active,toggle}"
                                                        :selected="active"
                                                        @click="toggle"
                                                        :color="active ? 'primary' : ''"
                                                        :text-color="active ? 'white' : ''"
                                                >
                                                    {{data}}
                                                </v-chip>
                                            </v-item>
                                        </v-item-group>
                                    </v-list-tile-action>
                                </v-list-tile-content>
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
                                        <template>
                                            <v-list-tile-content class="ml-2">
                                                <v-list-tile-title>
                                                    <strong v-if="data.category.title || data.category.name">{{data.category.title ? data.category.title :
                                                        typeof(data.category.name) === "string" ? data.category.name : typeof(data.category.name.en) === "string" ?
                                                        data.category.name.en : data.dirName}}</strong>
                                                    <strong v-else>{{data.dirName}}</strong>
                                                    <span class="body-1">
                                                        <span v-if='data.category.version || data.category.author'> [ {{data.category.version ? "v" + data.category.version + " " : ""}}{{data.category.author ? "by " + data.category.author : ""}} ] </span>
                                                        <span v-if='data.category.git'>[ <a @click="openLink(data.category.git)"> git </a> ]</span>
                                                    </span>
                                                </v-list-tile-title>
                                                <v-list-tile-sub-title
                                                        v-html="data.category.description"></v-list-tile-sub-title>
                                            </v-list-tile-content>
                                        </template>
                                        <v-list-tile-action>
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
                                                        class="green"
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
                           @click.native="publishNewPlugin">Publish your plugin
                    </v-btn>
                    <v-btn class="btn-danger" flat @click.native="pluginDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  import SmoothScrollbar from "../../views/widgets/list/SmoothScrollbar";
  import PluginPublishForm from "./PluginPublishForm";

  const { shell } = require("electron");
  const fs = require("fs");
  const request = require("request-promise");

  import util from "@/engine/utils";
  import pm from "@/engine/PluginManager";

  let mother = null;

  export default {
    components: { SmoothScrollbar, PluginPublishForm },
    created: function() {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          if (this.pluginDialog === true) {
            console.log("---------> Do something when detect escape / Plugin Manager");
            this.pluginDialog = false;
          }
        }
      });
    },
    data() {
      return {
        pluginDialog: false,
        publishPluginDialog: false,
        confirmRemoveDialog: false,
        confirmInstallDialog: false,
        searchText: "",
        isInstalling: false,

        installedPlugin: [],
        localPlugin: [],
        onlinePluginStatus: "wait",
        onlinePlugin: [],
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
            sortby: this.$global.plugin.sortby
          },
          categories: {
            init_selected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            selected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            name: [
              "Display",
              "Communication",
              "Signal Input/Output",
              "Sensors",
              "Device Control",
              "Timing",
              "Data Storage",
              "Data Processing",
              "Other",
              "Uncategorized"
            ]
          }
        }
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
      onScroll(status) {
        if (status.offset.y >= status.limit.y) {
          console.log("load more plugins");
          this.listOnlinePlugin(this.searchText, true);
        }
      },
      listAllPlugins(name = "") {
        //let selected_categories = this.filter.categories.name.filter((el,ind) => this.filter.categories.selected.includes(ind));
        this.listOnlinePlugin(name);
        this.listLocalPlugin(name);
      },
      listOnlinePlugin(name = "", loadNext = false) {
        this.onlinePluginStatus = (loadNext)
          ? "OK"
          : "wait";
        let boardInfo = this.$global.board.board_info;
        //------------//
        let selected_categories = this.filter.categories.selected.map(el => this.filter.categories.name[el]);
        let query = {
          "limit": this.filter.defaultLimit,
          "page": this.filter.currentPage,
          "meta": "page",
          "sort": this.filter.order.actual_value[this.filter.order.sortby],
          filter: {
            filter1: {
              logical: "nest",
              platform: { logical: "or", contains: boardInfo.platform },
              board: { logical: "or", contains: boardInfo.name }
            },
            category: {
              in: selected_categories
            }
          }
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
        pm.listOnlinePlugin(query).then(res => {
          //name,start return {end : lastVisible, plugins : onlinePlugins}
          mother.filter.currentPage = res.meta.page;
          mother.filter.nextOffset = res.meta.next_offset;
          let filtered = [];
          res.plugins.forEach(obj => {
            let f = mother.localPlugin.find(elm => {
              let lc = elm.category.name.en
                ? elm.category.name.en.toLowerCase()
                : elm.category.name.toLowerCase();
              let rm = obj.name.en
                ? obj.name.en.toLowerCase()
                : obj.name.toLowerCase();
              return lc === rm;
            });
            if (f) {
              if (obj.version > f.category.version && obj.status !== "draft") {
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
            mother.onlinePlugin.push(...filtered);
          } else {
            mother.onlinePlugin = filtered;
          }

          //this.onlinePlugin = res.plugins.map(obj=>{ obj.status =  'READY'; return obj;});
          this.onlinePluginStatus = "OK";
        }).catch(err => {
          this.onlinePluginStatus = "ERROR";
        });
      },
      listLocalPlugin(name = "") {
        console.log("find pluging = " + name);
        this.localPlugin = [];
        this.installedPlugin = pm.plugins(this.$global.board.board_info).map(obj => {
          obj.status = "READY";
          return obj;
        });
        if (name !== "") {
          this.localPlugin = this.installedPlugin.filter(obj => {
            return obj.category.title.includes(name);
          });
          this.localPlugin = this.localPlugin.concat(...this.installedPlugin.filter(obj => {
            return (obj.category.keywords)
              ? obj.category.keywords.includes(name)
              : false;
          }));

        } else {
          this.localPlugin = this.installedPlugin;
        }
      },
      applyFilter() {
        this.filter.menu = false;
        let sortby = this.filter.order.sortby;
        this.$global.plugin.sortby = sortby;
        this.listAllPlugins();
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
          this.listAllPlugins();
          this.$dialog.notify.info("Install success");
          this.$global.$emit("board-change", this.$global.board.board_info);
          //--tracking--//
          this.$track.event("plugin", "install", { evLabel: name, evValue: 1, clientID: this.$track.clientID }).catch(err => { console.log(err);});
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
          text: "Do you really want to remove " + name + "? , this process will clear your code.",
          title: "Warning"
        });
        if (res === true) {
          console.log("removing plugin : " + name);
          let b = this.getPluginByName(name);
          pm.removePlugin(b).then(() => {
            this.$global.blockCode = "";
            this.$dialog.notify.info("Remove plugin success");
            this.listAllPlugins();
            this.$global.$emit("board-change", this.$global.board.board_info);
            //--tracking--//
            this.$track.event("plugin", "remove", { evLabel: name, evValue: 1, clientID: this.$track.clientID }).catch(err => { console.log(err);});
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
          title: "Warning"
        });
        if (res === true) {
          let p = this.getPluginByName(name);
          let st = p.status;
          pm.backupPlugin(p).then(() => {
            console.log("update plugin : " + name);
            p.status = "DOWNLOAD";
            this.statusText = "Downloading";
            this.statusProgress = 0;
            return pm.installOnlinePlugin(p.category, progress => {
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
            pm.removePlugin(p, true).then(() => {
              this.$dialog.notify.info("Update plugin success");
              this.listAllPlugins();
              setTimeout(() => {
                this.$global.$emit(
                  "board-change",
                  this.$global.board.board_info
                );
              }, 1000);
              //--tracking--//
              Vue.prototype.$track.event("plugin", "update", { evLabel: name, evValue: 1, clientID: this.$track.clientID }).catch(err => { console.log(err);});
            });

          }).catch(err => {
            this.statusText = `Error : ${err}`;
            p.status = "ERROR";
            setTimeout(() => {
              p.status = st;
              this.statusText = "";
            }, 5000);
            pm.restorePlugin(p).then(() => {});
          });
        }
      },
      publishNewPlugin: async function() {
        let res = await this.$dialog.prompt({
          text: "https://github.com/user/repo/",
          title: "Input Plugin Repository"
        });
        if (res === false) { // user cancel
          return;
        }
        this.$dialog.notify.info("Please wait...");
        if (!res.endsWith("/")) { res += "/"; }
        pm.publishPlugin(res).then(_ => {
          this.$dialog.notify.success("submit your plugin success, please refresh again");
        }).catch(err => {
          if (typeof err === "string") {
            this.$dialog.notify.error(err);
          } else {
            this.$dialog.notify.error("Error something went wrong, please check the log");
          }
          console.log("publish plugin error -----");
          console.error(err);
        });
      }
    },
    mounted() {
      //console.log(this.localPlugin);
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
      pluginDialog: function(val) {
        if (val) {
          //on opening
          this.searchText = "";
          this.filter.categories.selected = this.filter.categories.init_selected;
          this.filter.nextOffset = 0;
          this.filter.currentPage = 1;
          this.listAllPlugins();
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
