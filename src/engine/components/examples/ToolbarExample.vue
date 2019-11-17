<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="exampleDialog = !exampleDialog">
                <v-icon dark>fa-code</v-icon>
            </v-btn>
            <span>Examples & tutorials</span>
        </v-tooltip>
        <v-dialog v-model="exampleDialog" max-width="70%" max-height="80%" scrollable persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Examples & Tutorials</span>
                    <v-spacer class="hidden-xs-only"></v-spacer>
                </v-card-title>
                <v-divider></v-divider>
                <smooth-scrollbar>
                    <v-card-text>
                        <v-subheader class="title">
                            Platform Examples
                        </v-subheader>

                        <div>
                            <tree-menu :nodes="platformExample" v-on:open="openExample"></tree-menu>
                        </div>

                        <v-divider></v-divider>

                        <v-subheader class="title">
                            Board Examples
                        </v-subheader>
                        <div>
                            <tree-menu :nodes="boardExample" v-on:open="openExample"></tree-menu>
                        </div>

                        <v-divider></v-divider>

                        <v-subheader class="title">
                            Plugin Examples
                        </v-subheader>
                        <div>
                            <tree-menu2 :nodes="pluginInfo" v-on:open="openExample"></tree-menu2>
                        </div>
                    </v-card-text>
                </smooth-scrollbar>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="btn-danger" flat @click.native="exampleDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  import {remote} from "electron";
  import util from "@/engine/utils";
  import TreeMenu from "@/engine/views/widgets/list/TreeMenu";
  import TreeMenu2 from "@/engine/views/widgets/list/TreeMenu2";
  let mother = null;
  const { promises: fs } = require("fs");
  const path = require("path");
  export default {
    name: "example-dialog",
    components: {
      "tree-menu": TreeMenu,
      "tree-menu2": TreeMenu2
    },
    data() {
      return {
        exampleDialog: false,
        searchText: "",
        platformExample: [],
        boardExample: [],
        pluginInfo: this.$global.plugin.pluginInfo.categories
      };
    },
    created() {
      mother = this;
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          if (this.exampleDialog === true) {
            console.log("---------> Do something when detect escape / Example & Tutorial");
            this.exampleDialog = false;
          }
        }
      });
    },
    mounted() {

    },
    methods: {
      createMenu : async function(root, dir) {
        let res = [];
        try{
          let fullPath = `${root}/${dir}`;
          let existing = await fs.access(fullPath);
          let examples = await fs.readdir(fullPath);
          if (examples.find(el => el.endsWith(".md") || el.endsWith(".ino") || el.endsWith(".bly"))) {
            return examples;
          } else {
            for (let i in examples) {
              let name = examples[i];
              let fullDir = `${fullPath}/${name}`;
              let isDirectory = await fs.stat(fullDir);
              if (isDirectory.isDirectory()) {
                let rRes = await mother.createMenu(fullPath, name);
                res.push({
                  title: name,
                  dir: fullDir,
                  examples: rRes
                });
              }
            }
          }
          return res;
        }
        catch (e) {
          return res;
        }
      },
      listPlatformExample: async function(){
        let platformExampleDir = `${util.platformDir}/${this.$global.board.board_info.platform}`;
        return await this.createMenu(platformExampleDir, "examples");
      },
      listBoardExample : async function() {
        let boardExampleDir = `${util.boardDir}/${this.$global.board.board_info.name}`;
        return await this.createMenu(boardExampleDir, "examples");
      },
      openExample(type, file) {
        let win = new remote.BrowserWindow({
          width: 800,
          height: 600,
          icon: path.join(__static, "icon.png"),
          webPreferences: { //TODO check here!
            webSecurity: false
          }
        });
        win.on("close", function() { win = null; });
        //"http://localhost:8080/#/editor?persistance=false&mode=1&file=file
        let mode = type === "block"
          ? "1"
          : "3";
        win.loadURL(`${document.location.href.split("?")[0]}?persistence=false&mode=${mode}&file=${file}`);
        win.show();
        //--tracking--//
        //this.$track.event("examples", "open",
        //                  {evLabel: exampleInfo + "_code", evValue: 1, clientID: this.$track.clientID}).
        //catch(err => { console.log(err);});
      }
    },
    watch: {
      exampleDialog: async function(value) {
        if (value) {
          this.pluginInfo = this.$global.plugin.pluginInfo.categories;
          this.platformExample = await this.listPlatformExample();
          this.boardExample = await this.listBoardExample();
        }
      }
    }
  };
</script>
<style lang="stylus">
    @import "../../../theme/component-design.styl"

    .v-list__group__items {
        background-color: #DDD;
        padding-left: 20px;
    }
</style>
