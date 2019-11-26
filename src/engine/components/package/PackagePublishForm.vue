<template>
    <v-stepper v-model="step">
        <v-stepper-header>
            <v-card-title>
                <span class="headline">Publish Your Plugin</span>
            </v-card-title>
            <v-stepper-step :complete="step > 1" step="1">Parse config</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="step > 2" step="2">Validate</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">publish</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-form v-model="step1_valid">
                                    <v-text-field style="min-width: 750px"
                                                  label="Git URL *"
                                                  v-model="plugin_info.git"
                                                  :rules="gitUrlRules"
                                                  placeholder="https://github.com/userxxx/repo-name/"
                                                  hint="Plugin repo"
                                                  prepend-icon="link"
                                                  clearable
                                    ></v-text-field>
                                </v-form>
                            </v-flex>
                            <v-spacer></v-spacer>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                :loading="processing_step1"
                                :disabled="processing_step1 || !step1_valid"
                                color="primary"
                                @click="parseConfig"
                        >
                            Next
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>

            <v-stepper-content step="2" style="padding: 0">
                <v-card>
                    <v-card-text style="padding: 0">
                        <v-layout row wrap class="form-group">
                            <v-flex xs6>
                                <v-text-field label="Name *"
                                              v-model="plugin_info.name"
                                              hint="plugin name (use as index, must be unique)"
                                              prepend-icon="power"
                                              :rules="text64Rules"
                                              clearable
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs6 pl-2>
                                <v-text-field label="Title *"
                                              v-model="plugin_info.title"
                                              :rules="text64Rules"
                                              hint="plugin title (display to user)"
                                              prepend-icon="text_fields" clearable
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 class="pt-3">
                                <v-text-field textarea
                                              :rules="descriptionRules"
                                              label="Plugin description *"
                                              v-model="plugin_info.description"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4 sm4 style="padding-top: 10px;">
                                <v-select
                                        :items="categories_info"
                                        label="Plugin category *"
                                        :rules="requiredRules"
                                        v-model="plugin_info.category"
                                        prepend-icon="assignment"
                                ></v-select>
                            </v-flex>
                            <v-flex xs8 sm8 pl-2>
                                <v-combobox multiple
                                            v-model="plugin_info.keywords"
                                            label="Keywords"
                                            prepend-icon="local_offer"
                                            append-icon
                                            chips
                                            hint="Add tags keywords to help user find your plugin easier"
                                            deletable-chips>
                                </v-combobox>
                            </v-flex>
                            <v-flex xs6 sm6 class="pt-3" v-if="plugin_info.board.length === 0">
                                <label>Platforms</label>
                                <v-layout row wrap>
                                    <v-flex sm3 md3 xs3>
                                        <v-checkbox v-model="plugin_info.platform" label="esp-idf" value="esp-idf"></v-checkbox>
                                    </v-flex>
                                    <v-flex sm5 md5>
                                        <v-checkbox v-model="plugin_info.platform" label="arduino-esp32" value="arduino-esp32"></v-checkbox>
                                    </v-flex>
                                    <v-flex sm4 md4>
                                        <v-checkbox v-model="plugin_info.platform" label="arduino-avr" value="arduino-avr"></v-checkbox>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6 sm6 pt-4 v-if="plugin_info.platform.length === 0">
                                <v-combobox multiple
                                            v-model="plugin_info.board"
                                            label="Specify board"
                                            prepend-icon="memory"
                                            append-icon
                                            chips
                                            hint="This plugin made for only some boards (add board name)"
                                            deletable-chips>
                                </v-combobox>
                            </v-flex>

                            <v-flex xs12 pt-2>
                                <v-text-field label="Git URL *"
                                              v-model="plugin_info.git"
                                              :rules="gitUrlRules"
                                              placeholder="https://github.com/userxxx/repo-name/"
                                              hint="Plugin repo"
                                              prepend-icon="link"
                                              clearable
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4 pt-2>
                                <v-text-field label="Version *"
                                              :rules="requiredRules"
                                              v-model="plugin_info.version"
                                              placeholder="1.0.0"
                                              hint="Plugin version"
                                              prepend-icon="loupe"
                                              clearable
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs8 pt-2 pl-3>
                                <v-text-field label="Email"
                                              v-model="plugin_info.email"
                                              placeholder="author@plugin.com"
                                              hint="author email"
                                              prepend-icon="email"
                                              clearable
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4 pt-2>
                                <v-text-field label="License"
                                              v-model="plugin_info.license"
                                              placeholder="ex : MIT , GPL"
                                              hint="Plugin license"
                                              prepend-icon="gavel"
                                              clearable
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs8 pt-2 pl-3>
                                <v-text-field label="Author"
                                              v-model="plugin_info.author"
                                              hint="Plugin author"
                                              prepend-icon="assignment_ind"
                                              clearable
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs5 pt-2>
                                <v-text-field label="Plugin Image"
                                              v-model="plugin_info.image"
                                              placeholder="/static/display.jpg"
                                              hint="Plugin images"
                                              prepend-icon="image"
                                              clearable
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs7 pl-3 pt-2>
                                <v-text-field label="Website"
                                              v-model="plugin_info.url"
                                              hint="Plugin website"
                                              placeholder="https://www.plugin.name"
                                              prepend-icon="home"
                                              clearable
                                ></v-text-field>
                            </v-flex>
                            <v-spacer></v-spacer>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="btn" color="primary" flat @click.native="step = 1">Prev</v-btn>
                        <v-btn class="btn-danger" flat @click.native="pluginDialog = false">Close</v-btn>
                    </v-card-actions>

                        </v-layout>
                    </v-card-text>
                    
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<style scoped>
  .form-group {
    height: 100vh !important;
    overflow: auto !important;
    padding: 50px 50px 250px 50px !important;
  }
</style>

<script>
  const request = require("request");
  const request_promise = require("request-promise");
  const progress = require("request-progress");
  import util from "@/engine/utils";

  let mother;
  export default {
    name: "PluginPublishForm",
    data() {
      return {
        step: 1,
        step1_valid: false,
        processing_step1: false,
        step2_valid: false,
        processing_step2: false,
        plugin_info: {
          name: "",
          title: "",
          description: "",
          category: "",
          platform: [],
          board: [],
          keywords: [],
          git: "",
          version: "1.0.0",
          url: "",
          image: "/static/display.jpg",
          author: "",
          email: "",
          license: ""
        },
        json: null,
        categories_info: ["Display", "Communication", "Signal Input/Output", "Sensors", "Device Control", "Timing", "Data Storage", "Data Processing", "Other"],
        valid: false,
        requiredRules: [v => !!v || "required"],
        text64Rules: [v => !!v || "required", v => (v && v.length <= 64) || "text must be less than 64 characters"],
        descriptionRules: [v => !!v || "required", v => (v && v.length <= 1024) || "text must be less than 1024 characters"],
        emailRules: [v => /.+@.+/.test(v) || "E-mail must be valid"],
        gitUrlRules: [
          v => !!v || "Git URL is required",
          v => /^http(s)?:\/\/(www\.)?github\.com\/[\.\_\-0-9A-Za-z]+\/[\.\_\-0-9A-Za-z]+\/$/g.test(v) || "Git must be valid (start with http(s)? and end with '/'"
        ]
      };
    },
    created() {
      mother = this;
    },
    mounted() {
      /*this.$db2.login({
        email: "dev@kbide.org",
        password: "zxcasdqwe123"
      }).then(s => {
        console.log(s.token);
        mother.src = "https://manage.kbide.org/admin/#/collections/plugins/+?access_token=" + s.token;
      });*/
    },
    methods: {
      parseConfig: function() {
        this.processing_step1 = true;
        let json;
        request_promise(this.plugin_info.git + "raw/master/library.json?random=" + util.randomString()) //add randomstring prevent cached response
          .then(res => {
            json = JSON.parse(res);
            if (json.name) { //search if existing
              let query = { filter: { name: { eq: json.name } } };
              return Vue.prototype.$db2.getItems("plugins", query).then((data, meta) => {
                return data.data && data.data.length === 1 && data.data[0];
              }).catch(err => {
                console.error("list online plugin error : " + err);
                return false;
              });
            } else {
              return false;
            }
          })
          .then(res => {
            if (res && res.version) {
              return json.version > res.version;
            } else {
              return true;
            }
          })
          .then(res => {
            if (res) {
              console.log("Got it");
              mother.$dialog.notify.success("Parsing success");
              mother.plugin_info = {
                name: json.name,
                title: json.title,
                description: json.description,
                category: json.category,
                platform: json.platform,
                board: json.board,
                keywords: json.keywords.includes(",")
                  ? json.keywords.split(",").map(e => e.trim())
                  : [json.keywords],
                git: json.git,
                version: json.version,
                url: json.url,
                image: json.image,
                author: json.author,
                email: json.email,
                license: json.license
              };
              mother.step = 2;
            } else {
              console.log(json);
              mother.$dialog.notify.error("Existing plugin name or is not newest version");
              console.log("Existing plugin name or is not newest version");
            }
            mother.processing_step1 = false;
          })
          .catch(err => {
            console.log("Plugin Publishing Error : ");
            console.log(err);
            mother.processing_step1 = false;
          });
      }
    }
  };
</script>

<style scoped>

</style>