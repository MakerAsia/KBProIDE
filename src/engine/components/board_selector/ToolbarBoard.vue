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
                    <span class="headline">Select board : {{getBoardByName(this.$global.board.board).title}}</span>
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
                            v-model="searchText"></v-text-field>
                </v-card-title>
                <v-divider></v-divider>
                <smooth-scrollbar>
                    <v-card-text>
                        <v-subheader>
                            Installed
                        </v-subheader>
                        <div>
                            <v-container grid-list-xl fluid>
                                <v-layout wrap>
                                    <v-flex sm6 md4 v-for="(data) in localBoards" :key="data.name">
                                        <v-hover>
                                            <v-card slot-scope="{ hover }"
                                                    :class="`elevation-${hover ? 12 : (selectingBoard == data.name? 8 : 2)}`">
                                                <v-card-media @click.native="selectingBoard = data.name">
                                                    <h4 class="white--text pa-1 pl-2 primary darken-1 mb-1"
                                                        color="primary">
                                                        {{data.title}}
                                                    </h4>
                                                    <img class="board-image"
                                                         :src="`file:///${boardImageDir}/${data.name}${data.image}`"/>
                                                </v-card-media>
                                                <v-card-text>
                                                    <v-btn v-if="data.status != 'UPDATABLE'"
                                                           icon fab absolute right bottom small dark
                                                           class="red"
                                                           style="bottom:25px; right:5px"
                                                           @click="removeBoard(data.name)"
                                                           :disabled="(data.status != 'READY' && data.status != 'INSTALLED') || $global.board.board == data.name"
                                                    >
                                                        <v-progress-circular
                                                                v-if="data.status != 'READY'"
                                                                indeterminate
                                                                color="primary lighten-4"
                                                        >
                                                        </v-progress-circular>
                                                        <v-icon v-else>fa-trash-o</v-icon>
                                                    </v-btn>
                                                    <v-btn v-else
                                                           icon fab absolute right bottom small dark
                                                           class="red"
                                                           style="bottom:25px; right:5px"
                                                           @click="updateBoard(data.name)"
                                                    >
                                                        <v-icon>fa-retweet</v-icon>
                                                    </v-btn>
                                                    <div class="board-desc-text"
                                                         @click="e=>e.target.classList.toggle('board-desc-text-more')">
                                                        <div class="board-desc-more">
                                                            <v-icon>fa-chevron-down</v-icon>
                                                        </div>
                                                        {{data.description}}
                                                    </div>

                                                    <transition name="fade">
                                                        <div v-if="selectingBoard == data.name"
                                                             class="selected-board-icon">
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
                                                <p v-if="data.status != 'READY'" class="text-info-status">
                                                    {{statusText}}</p>
                                                <v-progress-linear
                                                        v-if="data.status != 'READY'"
                                                        height="2"
                                                        style="position:absolute; margin-top: -2px;"
                                                        color="primary"
                                                        v-model="statusProgress"
                                                        :indeterminate="data.status == 'DOWNLOAD'">
                                                </v-progress-linear>
                                                <v-card-actions>
                                                    <span class="ml-2"><strong>{{data.version}}</strong></span>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat small color="primary" dark class="right pa-0 ma-0"
                                                           style="min-width:40px" @click="openLink(data.website)"
                                                           v-if="data.website">
                                                        <v-icon>fa-link</v-icon>
                                                    </v-btn>
                                                    <v-btn flat small color="primary" dark class="right pa-0 ma-0"
                                                           style="min-width:40px"
                                                           @click="openLink('mailto:'+data.email)" v-if="data.email">
                                                        <v-icon>fa-envelope-o</v-icon>
                                                    </v-btn>
                                                    <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5"
                                                           style="min-width:40px" @click="openLink(data.git)"
                                                           v-if="data.git">
                                                        <v-icon>fa-github</v-icon>
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-hover>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </div>

                        <v-divider></v-divider>
                        <v-subheader>
                            Online available
                        </v-subheader>

                        <div>
                            <v-container grid-list-xl fluid>
                                <v-layout wrap>
                                    <v-flex v-if="isOnline() === false" xs12 md12 sm12 class="text-xs-center">
                                        Please connect internet to use this feature.
                                    </v-flex>
                                    <v-flex v-else-if="onlineBoardStatus === 'wait'" xs12 md12 sm12
                                            class="text-xs-center">
                                        <v-progress-circular
                                                :size="50"
                                                color="primary"
                                                indeterminate
                                        ></v-progress-circular>
                                    </v-flex>
                                    <v-flex v-else-if="onlineBoardStatus != 'wait'" sm6 md4
                                            v-for="(data) in onlineBoards" :key="data.name">
                                        <template v-if="data.status != 'INSTALLED'">
                                            <v-card>
                                                <v-card-media>
                                                    <h4 class="white--text pa-1 pl-2 primary darken-1 mb-1"
                                                        color="primary">
                                                        {{data.title}}
                                                    </h4>
                                                    <v-img contain v-if="data.image.startsWith('http') === true"
                                                           class="board-image" :src="data.image"/>
                                                    <v-img contain v-else class="board-image"
                                                           :src="`${data.git}raw/master/${data.image}`"/>
                                                </v-card-media>
                                                <v-card-text>
                                                    <v-btn
                                                            icon fab absolute right bottom small dark
                                                            style="bottom:25px; right:5px"
                                                            class="primary"
                                                            :disabled="data.status != 'READY'"
                                                            @click="installOnlineBoard(data.name)"
                                                    >
                                                        <v-icon v-if="data.status == 'READY'">fa-download</v-icon>
                                                        <v-progress-circular
                                                                v-else-if="data.status != 'READY'"
                                                                indeterminate
                                                                color="primary lighten-4"
                                                        >
                                                        </v-progress-circular>
                                                    </v-btn>
                                                    <div class="board-desc-text"
                                                         @click="e=>e.target.classList.toggle('board-desc-text-more')">
                                                        <div class="board-desc-more">
                                                            <v-icon>fa-chevron-down</v-icon>
                                                        </div>
                                                        {{data.description}}
                                                    </div>
                                                </v-card-text>
                                                <v-divider></v-divider>
                                                <p v-if="data.status != 'READY'" class="text-info-status">
                                                    {{statusText}}</p>
                                                <v-progress-linear
                                                        v-if="data.status != 'READY'"
                                                        height="2"
                                                        style="position:absolute; margin-top: -2px;"
                                                        color="primary"
                                                        v-model="statusProgress"
                                                        :indeterminate="data.status == 'DOWNLOAD'">
                                                </v-progress-linear>
                                                <v-card-actions>
                                                    <span class="ml-2"><strong>{{data.version}}</strong></span>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat small color="primary" dark class="right pa-0 ma-0"
                                                           style="min-width:40px" @click="openLink(data.website)"
                                                           v-if="data.website">
                                                        <v-icon>fa-link</v-icon>
                                                    </v-btn>
                                                    <v-btn flat small color="primary" dark class="right pa-0 ma-0"
                                                           style="min-width:40px"
                                                           @click="openLink('mailto:'+data.email)" v-if="data.email">
                                                        <v-icon>fa-envelope-o</v-icon>
                                                    </v-btn>
                                                    <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5"
                                                           style="min-width:40px" @click="openLink(data.git)"
                                                           v-if="data.git">
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
                    <v-btn v-if="$global.setting.devMode == true" color="blue darken-1" flat
                           @click.native="publishNewBoard">Publish your board
                    </v-btn>
                    <v-btn color="blue darken-1" flat @click.native="boardDialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="changeBoard(selectingBoard)">Change Board</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

  const {shell} = require("electron");
  const fs = require("fs");
  const request = require("request-promise");
  import bm from "@/engine/BoardManager";
  import util from "@/engine/utils";
  import {setTimeout} from "timers";

  var mother = null;
  export default {
    data() {
      return {
        boardImageDir: util.boardDir,
        selectingBoard: this.$global.board.board,
        boardDialog: false,
        searchText: "",
        isInstalling: false,

        installedBoard: bm.boards().map(obj => {
          obj.status = "READY";
          return obj;
        }),
        localBoards: bm.boards().map(obj => {
          obj.status = "READY";
          return obj;
        }),
        onlineBoardStatus: "wait",
        onlineBoardPage: 0,
        onlineBoards: [],
        statusText: "",
        statusProgress: 0,

        addBoardDialog: false,
      };
    },
    methods: {
      getBoardByName(name) {
        return this.installedBoard.find(obj => { return obj.name == name;});
      },
      getOnlineBoardByName(name) {
        return this.onlineBoards.find(obj => { return obj.name == name;});
      },
      openLink(url) {
        shell.openExternal(url);
      },
      changeBoard: async function(boardname) {
        this.boardDialog = false;
        const res = await this.$dialog.confirm({
          text: "Changing board will clear your workspace. please confirm.",
          title: "Warning",
          actions: [
            {text: "Cancel", key: false},
            {text: "Clear", key: true},
          ],
        });
        if (res === true) {
          this.$global.board.board_info = bm.boards().find(obj => obj.name === boardname);
          this.$global.board.board = boardname;
          this.$global.editor.blockCode = "";
          this.$global.editor.rawCode = "";
          this.$global.$emit("board-change", this.$global.board.board_info);
          this.$global.$emit("editor-mode-change", this.$global.editor.mode, false, true); //change with convert code
          //--tracking--//
          this.$track.event("board", "change", {evLabel: boardname, evValue: 1, clientID: this.$track.clientID}).catch(err => { console.log(err);});
        }
      },
      isOnline() {
        return window.navigator.onLine;
      },
      listAllBoard(name = "") {
        this.listOnlineBoard(name);
        this.listLocalBoard(name);
      },
      listOnlineBoard(name = "") {
        this.onlineBoardStatus = "wait";
        bm.listOnlineBoard(name).then(res => {
          //name,start return {end : lastVisible, boards : onlineBoards}
          mother.onlineBoardPage = res.end;
          let filtered = [];
          res.boards.forEach(obj => {
            let f = mother.installedBoard.find(elm => elm.name == obj.name);
            if (f) {
              if (obj.version > f.version) {
                f.status = "UPDATABLE";
              }
            } else {
              obj.status = "READY";
              filtered.push(obj);
            }
          });
          mother.onlineBoards = filtered;
          mother.onlineBoardStatus = "OK";
        }).catch(err => {
          mother.onlineBoardStatus = "ERROR";
        });
      },
      listLocalBoard(name = "") {
        this.installedBoard = bm.boards().map(obj => {
          obj.status = "READY";
          return obj;
        });
        this.localBoards = [];
        if (name != "") {
          this.localBoards = this.installedBoard.filter(obj => {return obj.name.startsWith(name);});
        } else {
          this.localBoards = this.installedBoard;
        }
      },
      installOnlineBoard: async function(name) {
        const res = await this.$dialog.confirm({
          text: "Do you really want to install " + name + "?",
          title: "Warning",
        });
        if (res === true) {
          let b = this.getOnlineBoardByName(name);
          b.status = "DOWNLOAD";
          this.statusText = "Downloading";
          this.statusProgress = 0;
          bm.installBoardByName(name, progress => {
            //{process : 'board', status : 'DOWNLOAD', state:state }
            if (progress.status === "DOWNLOAD") { //when download just show to text
              this.statusText =
                  `Downloading ... ${util.humanFileSize(progress.state.size.transferred)} at ${(progress.state.speed /
                      1000.0 / 1000.0).toFixed(2)}Mbps`;
            } else if (progress.status === "UNZIP") {
              b.status = "UNZIP";
              this.statusText = `Unzip file ${progress.state.percentage}%`;
              this.statusProgress = progress.state.percentage;
            }
          }).then(() => { //install success
            b.status = "INSTALLED";
            this.statusText = "";
            bm.clearListedBoard();
            mother.listAllBoard();
            //--tracking--//
            mother.$track.event("board", "install", {evLabel: name, evValue: 1, clientID: this.$track.clientID}).catch(err => { console.log(err);});
          }).catch(err => {
            this.statusText = `Error : ${err}`;
            b.status = "ERROR";
            setTimeout(() => {
              b.status = "READY";
              this.statusText = "";
            }, 5000);
          });
        }
      },
      removeBoard: async function(board) {
        const res = await this.$dialog.confirm({
          text: "Do you really want to remove " + board + "?",
          title: "Warning",
        });
        if (res === true) {
          console.log("removing board : " + board);
          bm.removeBoard(board).then(() => {
            bm.clearListedBoard();
            mother.listAllBoard();
            //--tracking--//
            mother.$track.event("board", "remove", {evLabel: board, evValue: 1, clientID: this.$track.clientID}).catch(err => { console.log(err);});
          }).catch(err => {
            console.log("Error : cannot remove board");
            console.log(err);
          });
        }
      },
      updateBoard: async function(board) {
        const res = await this.$dialog.confirm({
          text: "Do you want to update " + board + " board?",
          title: "Warning",
        });
        if (res === true) {
          var b = this.getBoardByName(board);
          var st = b.status;
          bm.backupBoard(board).then(() => {
            console.log("update board : " + board);
            b.status = "DOWNLOAD";
            this.statusText = "Downloading";
            this.statusProgress = 0;
            return bm.installBoardByName(board, progress => {
              //{process : 'board', status : 'DOWNLOAD', state:state }
              if (progress.status == "DOWNLOAD") { //when download just show to text
                this.statusText =
                    `Downloading ... ${util.humanFileSize(progress.state.size.transferred)} at ${(progress.state.speed /
                        1000.0 / 1000.0).toFixed(2)}Mbps`;
              } else if (progress.status == "UNZIP") {
                b.status = "UNZIP";
                this.statusText = `Unzip file ${progress.state.percentage}%`;
                this.statusProgress = progress.state.percentage;
              }
            });
          }).then(() => { //install success
            b.status = "READY";
            this.statusText = "";
            bm.removeBoard(board + "-backup-board").then(() => {
              bm.clearListedBoard();
              mother.localBoards = [];
              setTimeout(() => {
                this.listAllBoard();
              }, 1000);
              //--tracking--//
              mother.$track.event("board", "update", {evLabel: board, evValue: 1, clientID: this.$track.clientID}).catch(err => { console.log(err);});
            });
          }).catch(err => {
            this.statusText = `Error : ${err}`;
            b.status = "ERROR";
            bm.restoreBoard(board).then(() => {

            });
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
          title: "Input Board Repository",
        });
        var json = null;
        if (util.regex.isValidGithubUrl(res)) {
          this.$dialog.notify.info("Please wait...");
          request(res + "raw/master/config.js?random=" + util.randomString()) //add randomstring prevent cached response
          .then(res => {
            json = eval(res);
            if (json.name) { //search if existing
              return Vue.prototype.$db.collection("boards").where("name", "==", json.name) //search start with
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
              Vue.prototype.$db.collection("boards").doc(json.name).set(json);
              if (res) {
                this.$dialog.notify.success("Added your board success, please refresh again");
              }
            } else {
              this.$dialog.notify.error("Existing board name or is not newest version");
              return false;
            }
          }).catch(err => {
            console.log("request error -----");
            console.log(err);
            this.$dialog.notify.error("Error something went wrong, please check the log");
          });
        } else {
          this.$dialog.notify.error("Github link format error. Please check your link again");
        }
      },
    },
    mounted() {
      mother = this;
    },
    destroyed() {

    },
    watch: {
      boardDialog: function(val) {
        if (val) {//on opening
          this.selectingBoard = this.$global.board.board;
          this.listOnlineBoard();
        }
      },
    },
  };
</script>
<style>
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
