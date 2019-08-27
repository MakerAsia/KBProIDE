<template>
<v-list>
    <v-list-group
            v-for="(item,index) in nodes"
            :key="index"
            v-if="item.examples && item.examples.length > 0"
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
</template>
<script>
  const fs = require("fs");
  const path = require("path");
  let mother = null;
  import VueMarkdown from "vue-markdown";
  export default {
    props: ["label", "nodes"],
    components : {
      "vue-markdown": VueMarkdown,
    },
    name: "tree-menu2",
    created(){
      mother = this;
    },
    methods : {
      getMarkdown(files) {
        if(files.files) {
          let mdFile = files.files.find(obj => obj.endsWith(".md"));
          return mdFile && fs.readFileSync(files.dir + "/" + mdFile, "utf8");
        }
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
                aTags[i].setAttribute("onclick", "require('electron').shell.openExternal('" + originalHref + "')");
                aTags[i].href = "#";
              }
            }
          }
        }
        return false;
      },
      openBlock(file, exampleInfo) {
        this.$emit('open','block',file,exampleInfo);
      },
      openCode(file, exampleInfo) {
        this.$emit('open','code',file,exampleInfo);
      },
      open(type,file,info){
        this.$emit('open',type,file,info);
      }
    }
  };
</script>