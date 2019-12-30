<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="boardDialog = !boardDialog">
                <v-icon dark>fa-microchip</v-icon>
            </v-btn>
            <span>Board Manager</span>
        </v-tooltip>
        <v-dialog v-model="boardDialog" max-width="80%" max-height="81%" scrollable persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Current board : {{ this.$global.board.board_info.title }}</span>
                    <v-spacer class="hidden-xs-only"></v-spacer>
                    <v-text-field
                            prepend-icon="search"
                            label="Board name"
                            class="ma-0 pa-0 search-board"
                            single-line
                            clearable
                            hide-details
                            :append-outer-icon="searchText ? 'fa-chevron-circle-right' : ''"
                            @click:append-outer="listAllBoard(searchText)"
                            @click:clear="listAllBoard()"
                            @change="listAllBoard(searchText)"
                            v-model="searchText"
                    ></v-text-field>
                    <v-menu bottom left>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <!--v-list-tile @click="changeOrder('vendor')">
                                              <v-list-tile-title>Order by vendor</v-list-tile-title>
                                          </v-list-tile-->
                            <v-list-tile @click="changeOrder('recommended')">
                                <v-list-tile-title>Order by recommended</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click="changeOrder('name')">
                                <v-list-tile-title>Order by name</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click="changeOrder('platform')">
                                <v-list-tile-title>Order by platform</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click="changeOrder('vendor')">
                                <v-list-tile-title>Order by vendor</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-card-title>
                <v-divider></v-divider>
                <smooth-scrollbar ref="scrollbar">
                    <v-card-text>
                        <div v-for="(boardData, index) in localBoards" :key="index">
                            <v-subheader>
                                {{ humanize(index) }}
                            </v-subheader>
                            <div>
                                <v-container grid-list-xl fluid>
                                    <v-layout wrap>
                                        <v-flex sm6 md4 lg3 v-for="data in boardData" :key="data.name">
                                            <v-hover>
                                                <v-card slot-scope="{ hover }" :class="`elevation-${ hover? 12 : selectingBoard.name === data.name ? 8: 2}`">
                                                    <v-responsive @click.native="selectingBoard = data">
                                                        <h4 v-if="selectingBoard.name === data.name" class="bg-success text-white pa-1 pl-2 mb-1">
                                                            {{ data.title }}
                                                        </h4>
                                                        <h4 v-else class="bg-gray-400 pa-1 pl-2 mb-1">
                                                            {{ data.title }}
                                                        </h4>
                                                        <img
                                                                class="board-image"
                                                                :src="`file:///${data.dir}/${data.image}`"
                                                                alt="board image"
                                                                style="object-fit: contain;"
                                                        />
                                                    </v-responsive>
                                                    <v-card-text>
                                                        <v-btn v-if="data.status !== 'UPDATABLE'" icon fab absolute right bottom small dark
                                                               class="red"
                                                               style="bottom:25px; right:5px"
                                                               @click="removeBoard(data)"
                                                               :disabled="(data.status !== 'READY' &&
                                                                            data.status !== 'INSTALLED') ||
                                                                            $global.board.board_info.name === data.name"
                                                        >
                                                            <v-progress-circular
                                                                    v-if="data.status !== 'READY'"
                                                                    indeterminate
                                                                    color="primary lighten-4"
                                                            >
                                                            </v-progress-circular>
                                                            <v-icon v-else>fa-trash-o</v-icon>
                                                        </v-btn>
                                                        <v-btn v-else icon fab absolute right bottom small dark
                                                               class="btn-success"
                                                               style="bottom:25px; right:5px"
                                                               @click="updateBoard(data)"
                                                        >
                                                            <v-icon>fa-retweet</v-icon>
                                                        </v-btn>
                                                        <div class="board-desc-text" @click="e =>e.target.classList.toggle('board-desc-text-more')">
                                                            <div class="board-desc-more">
                                                                <v-icon>fa-chevron-down</v-icon>
                                                            </div>
                                                            {{ data.description }}
                                                        </div>

                                                        <transition name="fade">
                                                            <div v-if="selectingBoard.name === data.name" class="selected-board-icon">
                                                                <div class="corner-icon">
                                                                    <v-icon size="70" color="light-green">
                                                                        fa-check-circle-o
                                                                    </v-icon>
                                                                </div>
                                                                <div class="corner-select"></div>
                                                            </div>
                                                        </transition>
                                                    </v-card-text>
                                                    <v-divider></v-divider>
                                                    <p v-if="data.status !== 'READY'" class="text-info-status">
                                                        {{ statusText }}
                                                    </p>
                                                    <v-progress-linear
                                                            v-if="data.status !== 'READY'"
                                                            height="2"
                                                            style="position:absolute; margin-top: -2px;"
                                                            color="primary"
                                                            v-model="statusProgress"
                                                            :indeterminate="data.status === 'DOWNLOAD'"
                                                    >
                                                    </v-progress-linear>
                                                    <v-card-actions>
                                                        <span class="ml-2"><strong>{{ data.version }}</strong></span>
                                                        <v-spacer></v-spacer>
                                                        <v-btn flat small color="primary" dark class="right pa-0 ma-0"
                                                               style="min-width:40px"
                                                               @click="openLink(data.website)"
                                                               v-if="data.website"
                                                        >
                                                            <v-icon>fa-link</v-icon>
                                                        </v-btn>
                                                        <v-btn flat small color="primary" dark class="right pa-0 ma-0"
                                                               style="min-width:40px"
                                                               @click="openLink('mailto:' + data.email)"
                                                               v-if="data.email"
                                                        >
                                                            <v-icon>fa-envelope-o</v-icon>
                                                        </v-btn>
                                                        <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5"
                                                               style="min-width:40px"
                                                               @click="openLink(data.git)"
                                                               v-if="data.git"
                                                        >
                                                            <v-icon>fa-github</v-icon>
                                                        </v-btn>
                                                    </v-card-actions>
                                                </v-card>
                                            </v-hover>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                                <!--v-divider></v-divider-->
                            </div>
                        </div>

                        <v-divider></v-divider>
                        <h3 class="ml-2 mt-2">
                            Online available
                        </h3>

                        <div>
                            <v-container grid-list-xl fluid>
                                <v-layout wrap>
                                    <v-flex v-if="isOnline() === false" xs12 md12 sm12 class="text-xs-center">
                                        Please connect internet to use this feature.
                                    </v-flex>
                                    <v-flex v-else-if="onlineBoardStatus === 'wait'" xs12 md12 sm12 class="text-xs-center">
                                        <v-progress-circular
                                                :size="50"
                                                color="primary"
                                                indeterminate
                                        ></v-progress-circular>
                                    </v-flex>
                                    <v-flex sm6 md4 lg3 v-else-if="onlineBoardStatus !== 'wait'" v-for="data in onlineBoards" :key="data.name">
                                        <template v-if="data.status !== 'INSTALLED'">
                                            <v-card>
                                                <v-responsive>
                                                    <h4 class="white--text pa-1 pl-2 primary darken-1 mb-1">
                                                        {{ data.title }}
                                                    </h4>
                                                    <v-img contain v-if="data.image.startsWith('http') === true" class="board-image" :src="data.image"/>
                                                    <v-img contain v-else class="board-image" :src="`${data.git}raw/master/${data.image}`"/>
                                                </v-responsive>
                                                <v-card-text>
                                                    <v-btn icon fab absolute right bottom small dark
                                                           style="bottom:25px; right:5px" class="primary"
                                                           :disabled="data.status !== 'READY'"
                                                           @click="installOnlineBoard(data)"
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
                                                    <div class="board-desc-text"
                                                         @click="e => e.target.classList.toggle('board-desc-text-more')"
                                                    >
                                                        <div class="board-desc-more">
                                                            <v-icon>fa-chevron-down</v-icon>
                                                        </div>
                                                        {{data.status === 'DRAFT' ? '(Under review) ' : ''}}{{ data.description }}
                                                    </div>
                                                </v-card-text>
                                                <v-divider></v-divider>
                                                <p v-if="data.status !== 'READY'" class="text-info-status">
                                                    {{ statusText }}
                                                </p>
                                                <v-progress-linear
                                                        v-if="data.status !== 'READY'"
                                                        height="2"
                                                        style="position:absolute; margin-top: -2px;"
                                                        color="primary"
                                                        v-model="statusProgress"
                                                        :indeterminate="data.status === 'DOWNLOAD'"
                                                >
                                                </v-progress-linear>
                                                <v-card-actions>
                                                    <span class="ml-2"><strong>{{ data.version }}</strong></span>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat small color="primary" dark
                                                           class="right pa-0 ma-0"
                                                           style="min-width:40px"
                                                           @click="openLink(data.url)"
                                                           v-if="data.url"
                                                    >
                                                        <v-icon>fa-link</v-icon>
                                                    </v-btn>
                                                    <v-btn flat small color="primary" dark class="right pa-0 ma-0"
                                                           style="min-width:40px"
                                                           @click="openLink('mailto:' + data.email)"
                                                           v-if="data.email"
                                                    >
                                                        <v-icon>fa-envelope-o</v-icon>
                                                    </v-btn>
                                                    <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5"
                                                           style="min-width:40px"
                                                           @click="openLink(data.git)"
                                                           v-if="data.git"
                                                    >
                                                        <v-icon>fa-github</v-icon>
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </div>
                    </v-card-text>
                </smooth-scrollbar>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="$global.setting.devMode == true"
                           class="btn-primary"
                           flat
                           @click.native="publishNewBoard"
                    >
                        Publish your board
                    </v-btn>
                    <v-btn :class="{'btn-gray-400': this.$global.board.board_info.name === this.selectingBoard.name,
                                    'btn-success': this.$global.board.board_info.name !== this.selectingBoard.name}"
                           flat
                           @click="changeBoard(selectingBoard)"
                           :disabled="this.$global.board.board_info.name === this.selectingBoard.name"
                    >
                        Change Board
                    </v-btn>
                    <v-btn class="btn-danger" flat @click.native="boardDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  const { shell } = require("electron");
  const fs = require("fs");
  import bm from "@/engine/BoardManager";
  import util from "@/engine/utils";
  import {setTimeout} from "timers";

  let mother = null;
  export default {
    created: function() {
      window.addEventListener("keydown", e => {
        if (e.key === "Escape") {
          if (this.boardDialog === true) {
            console.log(
              "---------> Do something when detect escape / ToolbarBoard"
            );
            this.boardDialog = false;
          }
        }
      });
    },
    data() {
      return {
        selectingBoard: this.$global.board.board_info,
        boardDialog: false,
        searchText: "",
        boardOrderBy: this.$global.board_selector.sortby,
        installedBoard: [],
        localBoards: {},
        onlineBoards: {},
        onlineBoardStatus: "wait",
        statusText: "",
        statusProgress: 0,
        //--- feature use ---//
        onlineBoardPage: 0,
        filter: {
          defaultLimit: 20,
          currentPage: 1,
          nextOffset: 0,
          menu: false,
          order: {
            init_orders: [],
            actual_value: { Name: "title", Newest: "-modified_on", Popular: "installed", Recommended: "rating" },
            sortby: "none"
          },
        }
      };
    },
    methods: {
      humanize: util.humanize,
      changeOrder : async function(orderName) {
        this.boardOrderBy = orderName;
        await this.listLocalBoard(this.searchText);
        this.$global.board_selector.sortby = orderName;
      },
      orderBoardBy(obj, orderBy, defaultName) {
        let sorted = {};
        if (orderBy === "recommended") {
          sorted["Recommended"] = [];
          obj.forEach(el => {
            let key =
              el.title.toLowerCase().includes("kidbright") ||
              el.recommended === "ilovekbide"
                ? "Recommended"
                : defaultName;
            if (!(key in sorted)) {
              sorted[key] = [];
            }
            sorted[key].push(el);
          });
          if (sorted["Recommended"].length === 0) {
            delete sorted["Recommended"];
          }
          return sorted;
        } else if (orderBy === "name") {
          sorted[defaultName] = obj;
          sorted[defaultName].sort((a, b) => a.title.localeCompare(b.title));
          return sorted;
        } else if (orderBy === "platform") {
          for (let i in obj) {
            let board = obj[i];
            if (!(board.platform in sorted)) {
              sorted[board.platform] = [];
            }
            sorted[board.platform].push(board);
          }
          Object.keys(sorted).forEach(el =>
            sorted[el].sort((a, b) => a.title.localeCompare(b.title))
          );
          return sorted;
        } else if (orderBy === "vendor") {
          for (let i in obj) {
            let board = obj[i];
            if (!board.vendor) {
              board.vendor = "Others";
            }
            if (!(board.vendor in sorted)) {
              sorted[board.vendor] = [];
            }
            sorted[board.vendor].push(board);
          }
          return sorted;
        }
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
          this.listOnlineBoard(this.searchText, true);
        }
      },
      listAllBoard : async function(name = "") {
        this.listOnlineBoard(name);
        await this.listLocalBoard(name);
      },
      listOnlineBoard(name = "",loadNext = false) {
        this.onlineBoardStatus = (loadNext) ? "OK" : "wait";
        let query = {
          limit : this.filter.defaultLimit,
          page : this.filter.currentPage,
          "sort" : "-modified_on",
          meta : "page"
        };
        if(name){
          query.filter = { title: { contains: name }};
        }
        if (loadNext) {
          query.page = query.page + 1;
          query.offset = this.filter.nextOffset;
          if (this.filter.nextOffset == null) {
            return;
          }
        }
        bm.listOnlineBoard(query)
          .then(res => {
            //name,start return {end : lastVisible, boards : onlineBoards}
            mother.filter.currentPage = res.meta.page;
            mother.filter.nextOffset = res.meta.next_offset;
            let filtered = [];
            res.boards.forEach(obj => {
              let f = mother.installedBoard.find(elm => elm.name === obj.name);
              if (f) {
                if (obj.version > f.version && obj.status !== "draft") {
                  f.status = "UPDATABLE";
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
              mother.onlineBoards.push(...filtered);
            } else {
              mother.onlineBoards = filtered;
            }
            //mother.onlineBoards = this.orderBoardBy(filtered, this.boardOrderBy, "Online Available");
            //mother.onlineBoards["Online Available"] = filtered;
            mother.onlineBoardStatus = "OK";
          })
          .catch(err => {
            mother.onlineBoardStatus = "ERROR";
          });
      },
      listLocalBoard : async function(name = "") {
        this.installedBoard = (await bm.boards()).map(obj => {
          obj.status = "READY";
          return obj;
        });
        this.localBoards = {};
        if (name !== "") {
          let filtered = this.installedBoard.filter(obj => {
            return obj.name.startsWith(name);
          });
          this.localBoards = this.orderBoardBy(
            filtered,
            this.orderBoardBy,
            "Installed"
          );
        } else {
          this.localBoards = this.orderBoardBy(
            this.installedBoard,
            this.boardOrderBy,
            "Installed"
          );
        }
      },
      changeBoard: async function(boardInfo) {
        this.boardDialog = false;
        const res = await this.$dialog.confirm({
          text: "Changing board will clear your workspace. please confirm.",
          title: "Warning",
          actions: [
            { text: "Confirm", key: "confirm" },
            { text: "Cancel", key: "cancel", color: "red darken-1" }
          ]
        });
        if (res) {
          if (res === "confirm") {
            this.$global.board.board_info = (await bm
              .boards())
              .find(obj => obj.name === boardInfo.name);
            this.$global.board.board = boardInfo.name;
            this.$global.editor.blockCode = "";
            this.$global.editor.rawCode = "";
            this.$global.$emit("board-change", this.$global.board.board_info);
            this.$global.$emit(
              "editor-mode-change",
              this.$global.editor.mode,
              false,
              true
            ); //change with convert code
            //--tracking--//
            this.$track
              .event("board", "change", {
                evLabel: boardInfo.name,
                evValue: 1,
                clientID: this.$track.clientID
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      },
      installOnlineBoard: async function(boardInfo) {
        const res = await this.$dialog.confirm({
          text: "Do you really want to install " + boardInfo.title + "?",
          title: "Warning"
        });
        if (res === true) {
          boardInfo.status = "DOWNLOAD";
          this.statusText = "Downloading";
          this.statusProgress = 0;
          bm.installOnlineBoard(boardInfo, progress => {
            //{process : 'board', status : 'DOWNLOAD', state:state }
            if (progress.status === "DOWNLOAD") {
              //update status if download platform
              if(progress.process === "platform"){
                boardInfo.status = "DOWNLOAD";
              }
              //when download just show to text
              this.statusText = `Downloading ... ${util.humanFileSize(
                progress.state.size.transferred
              )} at ${(progress.state.speed / 1000.0 / 1000.0).toFixed(2)}Mbps`;
            } else if (progress.status === "UNZIP") {
              boardInfo.status = "UNZIP";
              this.statusText = `Unzip file ${progress.state.percentage}%`;
              this.statusProgress = progress.state.percentage;
            }
          })
            .then(() => {
              //install success
              boardInfo.status = "INSTALLED";
              this.statusText = "";
              bm.clearListedBoard();
              mother.listAllBoard();
              //--tracking--//
              mother.$track
                .event("board", "install", {
                  evLabel: boardInfo.name,
                  evValue: 1,
                  clientID: this.$track.clientID
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              this.statusText = `Error : ${err}`;
              boardInfo.status = "ERROR";
              setTimeout(() => {
                boardInfo.status = "READY";
                this.statusText = "";
              }, 5000);
            });
        }
      },
      removeBoard: async function(boardInfo) {
        const res = await this.$dialog.confirm({
          text: "Do you really want to remove " + boardInfo.title + "?",
          title: "Warning"
        });
        if (res === true) {
          console.log("removing board : " + boardInfo.name);
          bm.removeBoard(boardInfo)
            .then(() => {
              bm.clearListedBoard();
              mother.listAllBoard();
              //--tracking--//
              mother.$track
                .event("board", "remove", {
                  evLabel: boardInfo.name,
                  evValue: 1,
                  clientID: this.$track.clientID
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log("Error : cannot remove board");
              console.log(err);
            });
        }
      },
      updateBoard: async function(boardInfo) {
        const res = await this.$dialog.confirm({
          text: "Do you want to update " + boardInfo.title,
          title: "Warning"
        });
        if (res === true) {
          let b = boardInfo;
          let st = b.status;
          bm.backupBoard(boardInfo)
            .then(() => {
              console.log("update board : " + boardInfo.name);
              b.status = "DOWNLOAD";
              this.statusText = "Downloading";
              this.statusProgress = 0;
              return bm.installOnlineBoard(boardInfo, progress => {
                //{process : 'board', status : 'DOWNLOAD', state:state }
                if (progress.status === "DOWNLOAD") {
                  //when download just show to text
                  this.statusText = `Downloading ... ${util.humanFileSize(
                    progress.state.size.transferred
                  )} at ${(progress.state.speed / 1000.0 / 1000.0).toFixed(
                    2
                  )}Mbps`;
                } else if (progress.status === "UNZIP") {
                  b.status = "UNZIP";
                  this.statusText = `Unzip file ${progress.state.percentage}%`;
                  this.statusProgress = progress.state.percentage;
                }
              });
            })
            .then(() => {
              //install success
              b.status = "READY";
              this.statusText = "";
              bm.removeBackupBoard(boardInfo).then(() => {
                bm.clearListedBoard();
                mother.localBoards = {};
                setTimeout(() => {
                  this.listAllBoard();
                }, 1000);
                //--tracking--//
                mother.$track
                  .event("board", "update", {
                    evLabel: boardInfo.name,
                    evValue: 1,
                    clientID: this.$track.clientID
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
            })
            .catch(err => {
              console.error(err);
              this.statusText = `Error : ${err}`;
              b.status = "ERROR";
              bm.restoreBoard(boardInfo).then(() => {});
              setTimeout(() => {
                b.status = st;
                this.statusText = "";
              }, 5000);
            });
        }
      },
      publishNewBoard: async function() {
        let res = await this.$dialog.prompt({
          text: "https://github.com/user/repo/",
          title: "Input Board Repository"
        });
        if (res === false) {
          // user cancel
          return;
        }
        this.$dialog.notify.info("Please wait...");
        bm.publishBoard(res)
          .then(_ => {
            this.$dialog.notify.success(
              "Added your board success, please refresh again"
            );
          })
          .catch(err => {
            if (typeof err === "string") {
              this.$dialog.notify.error(err);
            } else {
              this.$dialog.notify.error(
                "Error something went wrong, please check the log"
              );
            }
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
      boardDialog: async function(val) {
        if (val) {
          //on opening
          this.searchText = "";
          this.filter.nextOffset = 0;
          this.filter.currentPage = 1;
          this.selectingBoard = this.$global.board.board_info;
          await this.listAllBoard();
        }
      }
    }
  };
</script>
<style lang="stylus">
    @import "../../../theme/component-design.styl"

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

    .board-desc-text {
        cursor: pointer;
        max-height: 42px;
        min-height: 42px;
        transition: max-height 0.2s ease-out;
        overflow: hidden;
        padding-right: 25px;
    }

    .board-desc-text-more {
        transition: max-height 0.5s ease-in;
        max-height: 200px;
    }

    .board-desc-text-more > .board-desc-more {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
    }

    .board-desc-more {
        position: absolute;
        bottom: 80px;
        right: 15px;
        overflow: hidden;
        transition-duration: 0.8s;
        transition-property: transform;
        pointer-events: none;
    }

    .board-desc-icon {
        margin-left: 5px;
    }

    .board-image {
        display: block;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        line-height: 0;
        height: 150px;
    }

    .selected-board-icon {
        top: 0;
        width: 130px;
        height: 130px;
        padding-top: 0px;
        padding-right: 0px;
        right: 0;
        position: absolute;
    }

    .corner-select {
        border-top: 130px solid rgba(0, 0, 0, 0.6);
        border-left: 130px solid transparent;
        height: 0px;
        width: 0px;
        position: absolute;
    }

    .corner-icon {
        position: absolute;
        right: 5px;
        top: 5px;
        z-index: 1;
        text-shadow: 1px 1px 5px #000;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
