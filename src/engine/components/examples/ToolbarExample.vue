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
                    <v-text-field
                            prepend-icon="search"
                            label="example name"
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
                            Platform Examples
                        </v-subheader>
                        <div>

                        </div>

                        <v-divider></v-divider>

                        <v-subheader>
                            Board Examples
                        </v-subheader>
                        <div>
                            <v-list three-line>

                            </v-list>
                        </div>

                        <v-divider></v-divider>

                        <v-subheader>
                            Plugin Examples
                        </v-subheader>
                        <div>

                            <v-list>
                                <v-list-group
                                        v-for="item in pluginInfo"
                                        :key="item.category.name"
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
                                                                    @click="openBlock(example.dir + '/' + example.files.find(obj=>obj.endsWith('.bly')))">
                                                                <v-icon>fa-puzzle-piece</v-icon>
                                                                &nbsp;&nbsp;Open Block
                                                            </v-btn>
                                                            <v-btn
                                                                    v-if="example.files.find(obj=>obj.endsWith('.ino'))"
                                                                    small
                                                                    color="primary"
                                                                    @click.stop=""
                                                                    @click="openCode(example.dir + '/' + example.files.find(obj=>obj.endsWith('.ino')))">
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
  import VueMarkdown from "vue-markdown";
  import {remote} from "electron";

  let mother = null;
  const fs = require("fs");
  const path = require("path");
  export default {
    name: "example-dialog",
    components: {
      "vue-markdown": VueMarkdown,
    },
    data() {
      return {
        exampleDialog: false,
        searchText: "",
        pluginInfo: this.$global.plugin.pluginInfo.categories,
      };
    },
    created() {
      mother = this;
    },
    methods: {
      getMarkdown(files) {
        let mdFile = files.files.find(obj => obj.endsWith(".md"));
        return mdFile && fs.readFileSync(files.dir + "/" + mdFile, "utf8");
      },
      editTag() {
        if (document.readyState !== "complete") {
          document.addEventListener("DOMContentLoaded", function() {
            mother.prepareTags();
          }, false);
        } else {
          mother.prepareTags();
        }
      },
      prepareTags() {
        let markdowns = document.getElementsByClassName("vue-markdown");
        for (let inx = 0; inx < markdowns.length; inx++) {
          let markdownSection = markdowns.item(inx);
          let aTags = markdownSection.getElementsByTagName("a");
          if (aTags && aTags.length > 0) {
            for (let i = 0; i < aTags.length; i++) {
              let originalHref = aTags.item(i).href.slice(0);
              if (originalHref.indexOf("#") < 0) {
                //console.log(originalHref);
                aTags[i].setAttribute("onclick", "require('electron').shell.openExternal('" + originalHref + "')");
                aTags[i].href = "#";
              }
            }
          }
        }
        return false;
      },
      openBlock(file) {
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
        win.loadURL(`${document.location.href}?persistence=false&mode=1&file=${file}`);
        win.show();
      },
      openCode(file) {
        let win = new remote.BrowserWindow({
                                             width: 800,
                                             height: 600,
                                             icon: path.join(__static, "icon.png"),
                                             webPreferences: { //TODO check here!
                                               webSecurity: false,
                                             },
                                           });
        win.on("close", function() { win = null; });
        //"http://localhost:8080/#/editor?persistance=false&mode=3&file=file
        win.loadURL(`${document.location.href}?persistence=false&mode=3&file=${file}`);
        win.show();
      },
    },
    watch: {
      exampleDialog: function(value) {
        if (value) {
          this.pluginInfo = this.$global.plugin.pluginInfo.categories;
        }
      },
    },
  };
</script>