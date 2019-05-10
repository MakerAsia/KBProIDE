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
                            Test Examples
                        </v-subheader>

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
                                                    {{example.folder}}

                                                    <v-btn small color="primary">test</v-btn>
                                                </div>
                                            </template>
                                            <v-card>
                                                <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                                    nisi ut aliquip ex ea commodo consequat.
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
  export default {
    name: "example-dialog",
    data() {
      return {
        exampleDialog: false,
        searchText: "",
        pluginInfo: this.$global.plugin.pluginInfo.categories,
      };
    },
    created() {
      console.log("sssssssssssssssss");
      console.log(this.$global.plugin.pluginInfo.categories);
    },
    watch: {
      exapleDialog : function(value){
        if(value) {
          this.pluginInfo = this.$global.plugin.pluginInfo.categories;
        }
      }
    },
  };
</script>