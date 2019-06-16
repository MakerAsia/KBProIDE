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

                        <v-subheader>
                            Plugin Examples
                        </v-subheader>
                        <div>

                            <v-list>
                                <v-list-group
                                        v-for="(item,index) in pluginInfo"
                                        :key="index"
                                >
                                    <template v-slot:activator>
                                        <v-list-tile
                                                avatar
                                                @click=""
                                        >
                                            <v-list-tile-avatar>
                                                <template v-if="item.category.image">
                                                    <img v-if="item.category.image.startsWith('http') === true"
                                                         :src="item.category.image"/>
                                                    <img v-else
                                                         :src="`file:///${item.directory}/${item.category.image}`"/>
                                                </template>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                                <v-list-tile-title v-html="item.category.title"></v-list-tile-title>
                                            </v-list-tile-content>
                                        </v-list-tile>
                                    </template>

                                    <v-expansion-panel popout>
                                        <v-expansion-panel-content
                                                v-for="(example,index) in item.examples"
                                                :key="index"
                                        >
                                            <template v-slot:header>
                                                <div>
                                                    <v-layout row wrap align-center>
                                                        <v-flex xs12 sm3>
                                                            <v-icon>fa-play</v-icon>&nbsp;&nbsp;{{example.folder}}
                                                        </v-flex>
                                                        <v-flex xs12 sm6>
                                                            <v-btn
                                                                    v-if="example.files.find(obj=>obj.endsWith('.bly'))"
                                                                    small
                                                                    color="primary"
                                                                    @click.stop=""
                                                                    @click="openExample('block',example.dir + '/' + example.files.find(obj=>obj.endsWith('.bly')))">
                                                                <v-icon>fa-puzzle-piece</v-icon>
                                                                &nbsp;&nbsp;Open Block
                                                            </v-btn>
                                                            <v-btn
                                                                    v-if="example.files.find(obj=>obj.endsWith('.ino'))"
                                                                    small
                                                                    color="primary"
                                                                    @click.stop=""
                                                                    @click="openExample('code',example.dir + '/' + example.files.find(obj=>obj.endsWith('.ino')))">
                                                                <v-icon>fa-code</v-icon>&nbsp;&nbsp;Open Code
                                                            </v-btn>
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                            </template>
                                            <v-card>
                                                <v-card-text v-if="example.files.find(obj=>obj.endsWith('.md'))">
                                                    <div class="vue-markdown">
                                                        <vue-markdown v-on:rendered="editTag">{{getMarkdown(example)}}
                                                        </vue-markdown>
                                                    </div>
                                                </v-card-text>
                                            </v-card>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-list-group>
                            </v-list>
                        </div>
                    </v-card-text>
                </smooth-scrollbar>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="exampleDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  import {remote} from "electron";
  import util from "@/engine/utils";
  import TreeMenu from "@/engine/views/widgets/list/TreeMenu";

  let mother = null;
  const fs = require("fs");
  const path = require("path");
  export default {
    name: "example-dialog",
    components: {
      "tree-menu": TreeMenu,
    },
    data() {
      return {
        exampleDialog: false,
        searchText: "",
        platformExample: [],
        boardExample: [],
        pluginInfo: this.$global.plugin.pluginInfo.categories,
      };
    },
    created() {
      mother = this;
    },
    mounted() {

    },
    methods: {
      createMenu(root, dir) {
        let res = [];
        let fullPath = `${root}/${dir}`;
        if (!fs.existsSync(fullPath)) {
          return res;
        }
        let examples = fs.readdirSync(fullPath);
        if (examples.find(el => el.endsWith(".md") || el.endsWith(".ino") || el.endsWith(".bly"))) {
          return examples;
        } else {
          for (let i in examples) {
            let name = examples[i];
            let fullDir = `${fullPath}/${name}`;
            if (fs.statSync(fullDir).isDirectory()) {
              let rRes = mother.createMenu(fullPath, name);
              res.push({
                         title: name,
                         dir: fullDir,
                         examples: rRes,
                       });
            }
          }
        }
        return res;
      },
      listPlatformExample() {
        let platformExampleDir = `${util.platformDir}/${this.$global.board.board_info.platform}`;
        return this.createMenu(platformExampleDir, "examples");
      },
      listBoardExample() {
        let boardExampleDir = `${util.boardDir}/${this.$global.board.board_info.name}`;
        return this.createMenu(boardExampleDir, "examples");
      },
      openExample(type,file){
        let win = new remote.BrowserWindow({
                                             width: 800,
                                             height: 600,
                                             icon: path.join(__static, "icon.png"),
                                             webPreferences: { //TODO check here!
                                               webSecurity: false,
                                             },
                                           });
        win.on("close", function() { win = null; });
        //"http://localhost:8080/#/editor?persistance=false&mode=1&file=file
        let mode = type === "block" ? "1" : "3";
        win.loadURL(`${document.location.href}?persistence=false&mode=${mode}&file=${file}`);
        win.show();
        //--tracking--//
        //this.$track.event("examples", "open",
        //                  {evLabel: exampleInfo + "_code", evValue: 1, clientID: this.$track.clientID}).
        //catch(err => { console.log(err);});
      }
    },
    watch: {
      exampleDialog: function(value) {
        if (value) {
          this.pluginInfo = this.$global.plugin.pluginInfo.categories;
          this.platformExample = this.listPlatformExample();
          this.boardExample = this.listBoardExample();
        }
      },
    },
  };
</script>
<style>
    .v-list__group__items {
        background-color: #DDD;
        padding-left: 20px;
    }
</style>