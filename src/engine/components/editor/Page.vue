<template>
    <multipane
            class="vertical-panes-editor"
            layout="vertical"
            @paneResizeStop="onResizePanel"
            fill-height
    >
        <!-- editor -->
        <div
                class="pane"
                :style="[ this.$global.editor.mode == 1
                              ? { width: '100%', height: '100%' }
                              : this.$global.editor.mode == 2
                              ? { minWidth: '500px', width: '75%' }
                              : { width: '0px' }
                        ]"
        >
            <div
                    id="blocklyDiv"
                    style="position:absolute; width:100%; height:100%;"
                    color="onThemeChange"
            ></div>
            <xml id="toolbox" ref="toolbox" style="display: none">
                <category name="Basic" colour="160" icon="/static/icons/SVG/c1.svg">
                    <block type="basic_led16x8"></block>
                </category>
            </xml>

            <v-dialog v-model="variableDialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{ variableMessage }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-flex xs12>
                                <v-text-field
                                        v-model="variable_name"
                                        label="Variable name"
                                        required
                                        clearable
                                        counter
                                        maxlength="32"
                                        :rules="[variable_name_validator]"
                                ></v-text-field>
                            </v-flex>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="variableDialog = false">Close</v-btn>
                        <v-btn
                                color="blue darken-1"
                                flat
                                :disabled="!validated"
                                ref="variableOK"
                                @click="variableDialog = false"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <v-dialog v-model="cameraDialog" persistent max-width="785px">
                <v-card>
                    <v-card-title>
                        <!--                        <span class="headline">{{variableMessage}}</span>-->
                        <span class="headline font-bold">
                            Getting Image from the camera.
                        </span>
                    </v-card-title>
                    <v-card-text style="padding-top: 0">
                        <v-container grid-list-md style="padding-top: 0">
                            <v-flex xs12>
                                <div style="display: flex; justify-content: center">
                                    <video
                                            ref="video"
                                            id="video"
                                            width="640"
                                            height="480"
                                            autoplay
                                    ></video>
                                    <canvas
                                            ref="canvas"
                                            style="display:none;"
                                            width="640"
                                            height="480"
                                    ></canvas>
                                </div>
                                <div style="display: flex; justify-content: center; margin-top: 15px">
                                    <v-btn
                                            id="snap"
                                            class="btn-primary"
                                            @click="snapCameraDialog"
                                    >
                                        <i class="fa fa-camera"></i>&ensp;
                                        Snapshot
                                    </v-btn>
                                    <v-btn
                                            id="snap"
                                            class="btn-primary"
                                            @click="refreshCameraDialog"
                                    >
                                        <i class="fa fa-refresh"></i>&ensp;
                                        Refresh
                                    </v-btn>
                                    <v-btn class="btn-success" flat @click="saveCameraDialog">
                                        Save
                                    </v-btn>
                                    <v-btn class="btn-danger" flat @click="closeCameraDialog">
                                        Close
                                    </v-btn>
                                </div>
                            </v-flex>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>

            <v-dialog v-model="musicDialog" max-width="785px">
                <piano-dialog
                        ref="musicNotes"
                        @close="() => { musicDialog = false; }"
                ></piano-dialog>
            </v-dialog>
            <v-dialog v-model="ttsDialog" max-width="600px">
                <t-t-s-dialog
                        ref="ttsWords"
                        @close="() => { ttsDialog = false; }"
                ></t-t-s-dialog>
            </v-dialog>
        </div>
        <!-- end -->
        <multipane-resizer v-if="this.$global.editor.mode == 2"></multipane-resizer>
        <!-- source code -->
        <div
                class="pane"
                :style="[
            this.$global.editor.mode == 1
              ? { width: '0px' }
              : this.$global.editor.mode == 2
              ? { flexGrow: 1 }
              : { width: '100%', height: '100%' }
          ]"
        >
            <MonacoEditor
                    ref="cm"
                    v-if="$global.editor.mode < 3"
                    v-model="$global.editor.rawCodeMode ? $global.editor.rawCode : $global.editor.previewSourceCode"
                    class="editor"
                    language="cpp"
                    theme="vs-dark"
                    :options="this.editor_options"
            />
            <MonacoEditor
                    ref="cm"
                    v-else-if="$global.editor.mode == 3"
                    v-model="$global.editor.sourceCode"
                    class="editor"
                    language="cpp"
                    theme="vs-dark"
                    :options="this.editor_options"
            />
        </div>
        <!-- end -->
    </multipane>
</template>
<script>
  const electron = require("electron");
  var path = require("path");
  const xmlParser = new DOMParser();
  // === UI Management ===
  //const Multipane = import("vue-multipane"); //() => import("vue-multipane").then(({Multipane})=> Multipane);
  import {Multipane,MultipaneResizer} from "vue-multipane";
  //const MultipaneResizer = () => import("vue-multipane").then(({MultipaneResizer}) => MultipaneResizer);
  // === Blockly ===
  import Blockly from "vue-blockly";
  import en from "vue-blockly/dist/msg/en";
  // === Editor ===
  //import MonacoEditor from "vue-monaco";
  // === uitls ===
  import util from "@/engine/utils";

  const fs = require("fs");
  // === engine ===
  import plug from "@/engine/PluginManager";
  // === dialog ===
  //import VariableNamingDialog from "@/engine/views/dialog/VariableNamingDialog";
  //import PianoDialog from "@/engine/views/dialog/PianoDialog";
  //import TTSDialog from "@/engine/views/dialog/TTSDialog";

  // === Node.js ===
  const exec = require("child_process").exec;
  const os = require("os");

  const htmlEntities = function(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };

  const reformatCode = util.requireFunc(util.packageDir + "/kbide-package-clang-format/main");

  const renderBlock = function(blocks, level = 1) {
    let res = "";
    if (blocks === undefined) {
      return res;
    }
    blocks.forEach(element => {
      if (level === 1) {
        let insideBlock = element.blocks
          ? renderBlock(element.blocks, level + 1)
          : (element.xml
            ? element.xml
            : "");
        let custom = element.custom
          ? `custom="${element.custom}" `
          : "";
        res += `<category name="${element.name}" colour="${element.color}" ${custom}icon="${element.icon}">${insideBlock}</category>`;
      } else {
        if (typeof element === "string") {
          //block element
          res += `<block type="${element}"></block>`;
        } else if (typeof element == "object" && element.xml) {
          res += element.xml;
        } else if (typeof element === "object" && "type" in element && element.type === "category") {
          let insideBlock = renderBlock(element.blocks, level + 1);
          let custom = element.custom
            ? `custom="${element.custom}" `
            : "";
          res += `<category name="${element.name}" ${custom}icon="${
            element.icon
          }">${insideBlock}</category>`;
        } else if (typeof element === "object" && "mutation" in element) {
          let objKey = [];
          Object.keys(element.mutation).forEach(key => {
            objKey.push(`${key}="${element.mutation[key]}"`);
          });
          res += `<mutation ${objKey.join(" ")}></mutation>`;
        } else if (typeof element === "object") {
          let insideBlock = renderBlock(element.blocks, level + 1);
          res += `<block type="${element.name}">${insideBlock}</block>`;
        }
      }
    });
    return res;
  };
  const loadAndRenderPluginsBlock = function(Blockly, boardInfo, pluginInfo) {
    let pluginName = " Plugins";
    let plugins = pluginInfo; // plug.loadPlugin(boardInfo);
    let catStr = "";
    plugins.categories.forEach(cat => {
      let pluginDirectory = cat.directory;
      let pluginBlockDirectory = `${pluginDirectory}/blocks`;
      if (Object.entries(cat.plugins).length === 0) {
        return;
      }
      let blockStr = "";
      Object.keys(cat.plugins).forEach(subPlugin => {
        let blocks = cat.plugins[subPlugin].blocks;
        let dir = cat.plugins[subPlugin].dir;
        let file = cat.plugins[subPlugin].file;
        //----- load block -----//
        try {
          eval(fs.readFileSync(`${dir}/${file}`, "utf8"));
          eval(fs.readFileSync(`${dir}/${file.replace("block", "generator")}`, "utf8"));
          if (fs.existsSync(`${dir}/msg/en.js`)) {
            eval(fs.readFileSync(`${dir}/msg/en.js`, "utf8"));
          }
        } catch (e) {
          console.log(`Error : cannot load plugin block [${subPlugin}] => ` + e);
        }
        //----------------------//
        blocks.forEach(typeName => {
          blockStr += `<block type="${typeName}"></block>`;
        });
      });
      if (fs.existsSync(`${pluginBlockDirectory}/config.js`)) {
        let blockConfig = util.requireFunc(`${pluginBlockDirectory}/config.js`);
        catStr += renderBlock(blockConfig);
      } else {
        //let thName = cat.category.title;
        let name = cat.category.name.en
          ? cat.category.name.en
          : cat.category.title;
        let color = cat.category.color;
        catStr += `<category name="${name}" colour="${color}">${blockStr}</category>`;
      }
    });
    return `<sep></sep><category name="${pluginName}" color="290">${catStr}</category>`;
  };

  const mergeBlockConfig = function(blockConfig) {
    blockConfig.base_blocks.sort((a, b) => (a.index > b.index)
      ? 1
      : -1);
    blockConfig.blocks && blockConfig.blocks.sort((a, b) => (a.index > b.index)
      ? 1
      : -1);
    for (let i in blockConfig.base_blocks) {
      let el = blockConfig.base_blocks[i]; //base element
      let name = el.name;
      let heritageBlock = blockConfig.blocks.find(sel => sel.name === name);
      if (heritageBlock) { // found same name
        if (heritageBlock.blocks[0] && heritageBlock.blocks[0].type === "category" &&
          el.blocks[0] && el.blocks[0].type === "category") { //block inside has category
          let respSubmerge = mergeBlockConfig({ base_blocks: el.blocks, blocks: heritageBlock.blocks });
          el.blocks = respSubmerge.base_blocks;
          blockConfig.blocks = blockConfig.blocks.filter(e => e.name !== heritageBlock.name);
        } else if (heritageBlock.override === true) {
          blockConfig.base_blocks[i] = Object.assign({}, heritageBlock);
          blockConfig.blocks = blockConfig.blocks.filter(e => e.name !== heritageBlock.name);
        } else { //normal join
          let platformNonDuplicateBlocks = el.blocks.filter(item => {
            try {
              let typename = typeof item === "string"
                ? item
                : xmlParser.parseFromString(item.xml, "text/xml").getElementsByTagName("block")[0].getAttribute("type");
              let foundDuplication = heritageBlock.blocks.find(mItem => {
                if (typeof mItem === "string") {
                  return mItem === typename;
                } else {
                  let parsed = xmlParser.parseFromString(mItem.xml, "text/xml").getElementsByTagName("block");
                  return parsed.length !== 0
                    ? parsed[0].getAttribute("type") === typename
                    : false;
                }
              });
              return foundDuplication === undefined;
            } catch (e) {
              return false;
            }
          });
          el.blocks = heritageBlock.blocks.concat({ xml: "<sep gap=\"20\"></sep><label text=\"Platform Blocks\" web-class=\"title\"></label>" }, platformNonDuplicateBlocks);
          blockConfig.blocks = blockConfig.blocks.filter(e => e.name !== heritageBlock.name);
        }
      }
    }
    //======= merge difference with sort by index
    let merged = [];
    while (blockConfig.base_blocks.length > 0 && blockConfig.blocks.length > 0) {
      let f1 = blockConfig.base_blocks[0];
      let f2 = blockConfig.blocks[0];
      if (!f2.index) { f2.index = 0; }
      if (f2.index < f1.index) { //insert f2
        merged.push(blockConfig.blocks.shift());
      } else {
        merged.push(blockConfig.base_blocks.shift());
      }
    }
    if (blockConfig.base_blocks.length > 0) {
      merged.push(...blockConfig.base_blocks);
    } else if (blockConfig.blocks.length > 0) {
      merged.push(...blockConfig.blocks);
    }
    blockConfig.base_blocks = merged;
    blockConfig.blocks = [];
    return blockConfig;
  };

  const loadBlock = function(boardInfo) {
    let boardBlockFile = `${boardInfo.dir}/block/config.js`;
    let platformBlockFile = `${util.platformDir}/${boardInfo.platform}/block/config.js`;
    //clear cache
    Object.keys(util.requireFunc.cache).map(file => {
      if (file.endsWith("block\\config.js") || file.endsWith("block/config.js")) {
        delete util.requireFunc.cache[file];
      }
    });
    let platformBlocks = util.requireFunc(platformBlockFile);
    let boardBlocks = util.fs.existsSync(boardBlockFile)
      ? util.requireFunc(boardBlockFile)
      : {};
    let blockConfig = Object.assign(platformBlocks, boardBlocks);
    return mergeBlockConfig(blockConfig);
  };
  const initBlockly = function(boardInfo) {
    let platformName = boardInfo.platform;
    let blockyDir = `${boardInfo.dir}/block`;
    let platformBlockDir = `${util.platformDir}/${platformName}/block`;
    //lookup platform first
    let platformBlockFile = util.fs
      .readdirSync(platformBlockDir)
      .map(obj => `${platformBlockDir}/${obj}`);
    platformBlockFile.sort(function(a, b) {
      return a.length - b.length;
    });
    let blocklyFile = util.fs
      .readdirSync(blockyDir)
      .map(obj => `${blockyDir}/${obj}`);
    blocklyFile.sort(function(a, b) {
      return a.length - b.length;
    });
    let blocks = platformBlockFile.concat(blocklyFile);
    blocks.forEach(element => {
      if (element.includes("config.js")) {
        //skip config.js file
        return;
      }
      try {
        let name = path.basename(element);
        if (name.startsWith("block") && name.endsWith("js")) {
          util.requireFunc(element)(Blockly);
          let generatorFile = name.replace("block", "generator");
          util.requireFunc(`${path.dirname(element)}/${generatorFile}`)(Blockly);
        }
      } catch (error) {
        console.log("load blockly error");
        console.log(error);
        console.log(element);
      }
    });
  };

  let myself;
  export default {
    name: "editor",
    components: {
      Multipane : Multipane,
      MultipaneResizer :  MultipaneResizer,
      MonacoEditor : () => import("vue-monaco"),
      VariableNamingDialog : () => import("@/engine/views/dialog/VariableNamingDialog"),
      PianoDialog : () => import("@/engine/views/dialog/PianoDialog"),
      TTSDialog : ()=> import("@/engine/views/dialog/TTSDialog")
    },
    data() {
      return {
        codegen: null,
        alertErrors: "",
        compileStep: 1,
        compileDialog: false,
        failed: false,
        stepResult: {
          "1": {
            result: true,
            msg: ""
          },
          "2": {
            result: true,
            msg: ""
          },
          "3": {
            result: true,
            msg: ""
          }
        },

        workspace: null,
        toolbox: null,
        editor_options: this.$global.editor.editor_options,
        variableDialog: false,
        variable_name: this.name,
        variableMessage: "Variable Name",
        validated: false,
        variable_name_validator: value => {
          const pattern = /(?:^(uint16\s*|uint32\s*|uint8\s*|auto\s*|const\s*|unsigned\s*|signed\s*|register\s*|volatile\s*|static\s*|void\s*|short\s*|long\s*|char\s*|int\s*|float\s*|double\s*|_Bool\s*|complex\s*|return\s*)+$)|(?:\s+\*?\*?\s*)|(^[0-9])|([^_A-Za-z0-9]+)/;
          this.validated = !pattern.test(value);
          if (value == null || value == "") {
            this.validated = false;
          }
          return this.validated || "Invalid variable name";
        },
        musicDialog: false,
        ttsDialog: false,
        cameraDialog: false,
        video: {},
        canvas: {},
        capture: null,
        snapshotBuffer: null,
        themeColors: [
          {
            name: "blue",
            color: "#2196f3"
          },
          {
            name: "lightBlue",
            color: "#03a9f4"
          },
          {
            name: "teal",
            color: "#009688"
          },
          {
            name: "red",
            color: "#f44336"
          },
          {
            name: "orange",
            color: "#ff9800"
          },
          {
            name: "purple",
            color: "#9c27b0"
          },
          {
            name: "indigo",
            color: "#3f51b5"
          },
          {
            name: "cyan",
            color: "#00bcd4"
          },
          {
            name: "pink",
            color: "#e91e63"
          },
          {
            name: "green",
            color: "#4caf50"
          }
        ],
        lightThemeArray: ["red", "purple", "indigo", "pink"],
        darkThemeArray: ["blue", "lightBlue", "teal", "orange", "cyan", "green"]
      };
    },
    created() {
      myself = this;
      electron.ipcRenderer.on("edit-undo", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({
            keyCode: "Z".charCodeAt(0),
            ctrlKey: true,
            target: { type: "none" }
          });
        } else {
          let cm = myself.getCm();
          cm.trigger("aaaa", "undo", "aaaa");
        }
      });
      electron.ipcRenderer.on("edit-redo", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({
            keyCode: "Y".charCodeAt(0),
            ctrlKey: true,
            target: { type: "none" }
          });
        } else {
          let cm = myself.getCm();
          cm.trigger("aaaa", "redo", "aaaa");
        }
      });
      electron.ipcRenderer.on("edit-cut", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({
            keyCode: "X".charCodeAt(0),
            ctrlKey: true,
            target: { type: "none" }
          });
        } else {
          document.execCommand("cut");
        }
      });
      electron.ipcRenderer.on("edit-copy", () => {

        if (process.platform === "darwin") {
          document.execCommand("copy");
        } else {
          if (this.$global.editor.mode < 3) {
            Blockly.onKeyDown_({
              keyCode: "C".charCodeAt(0),
              ctrlKey: true,
              target: { type: "none" }
            });
          } else {
            document.execCommand("copy");
          }
        }

      });
      electron.ipcRenderer.on("edit-paste", () => {

        if (process.platform === "darwin") {
          document.execCommand("paste");
        } else {
          if (this.$global.editor.mode < 3) {
            Blockly.onKeyDown_({
              keyCode: "V".charCodeAt(0),
              ctrlKey: true,
              target: { type: "none" }
            });
          } else {
            document.execCommand("paste");
          }
        }

      });
      electron.ipcRenderer.on("edit-find", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({
            keyCode: "F".charCodeAt(0),
            ctrlKey: true,
            target: { type: "none" }
          });
        } else {
          let cm = myself.getCm();
          cm.trigger("aaaa", "actions.find");
        }
      });
      electron.ipcRenderer.on("edit-replace", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({
            keyCode: "H".charCodeAt(0),
            ctrlKey: true,
            target: { type: "none" }
          });
        } else {
          let cm = myself.getCm();
          cm.trigger("aaaa", "editor.action.startFindReplaceAction");
        }
      });
      electron.ipcRenderer.on("clang-format", () => {
        this.clangFormat();
      });
    },
    mounted() {
      /* Monaco config */
      if (this.$global.editor.mode < 3) {
        this.$global.editor.editor_options.readOnly = true;
      } else {
        this.$global.editor.editor_options.readOnly = false;
      }

      Blockly.Msg = Object.assign(en, Blockly.Msg);
      Blockly.Msg = Blockly.Msg();
      Blockly.utils.getMessageArray_ = function() {
        return Blockly.Msg;
      };
      this.toolbox = document.getElementById("toolbox");
      this.workspace = Blockly.inject("blocklyDiv", {
        grid: {
          spacing: 25,
          length: 3,
          colour: "#ccc",
          snap: true
        },
        media: "./static/blockly/media/",
        //rtl: rtl,
        toolbox: this.toolbox,
        zoom: {
          controls: true,
          wheel: true,
          startScale: 1,
          maxScale: 2,
          minScale: 0.3,
          scaleSpeed: 1.07
          //scrollbars: false
        }
      });
      this.workspace.addChangeListener(this.updatecode);
      Blockly.svgResize(this.workspace);
      this.workspace.scrollCenter();
      // override prompt function, fixed electron dialog problem
      Blockly.prompt = function(message, defaultValue, callback) {
        myself.variable_name = defaultValue;
        myself.variableMessage = message;
        myself.$refs.variableOK.$on("click", function() {
          let new_val = myself.variable_name;
          if (new_val && new_val != "" && myself.validated) {
            callback(new_val);
          } else {
            callback(null);
          }
          myself.$refs.variableOK.$off("click");
          myself.variableDialog = false;
        });
        myself.variableDialog = true;
      };
      Blockly.music = function(notes, cb) {
        if (notes) {
          myself.$refs.musicNotes.tags = notes.split(",").map(el => {
            return { text: el };
          });
        }
        myself.$refs.musicNotes.$on("result", function(n) {
          myself.musicDialog = false;
          myself.$refs.musicNotes.$off("result");
          cb(n);
        });
        myself.musicDialog = true;
      };
      Blockly.tts = function(words, cb) {
        if (words) {
          myself.$refs.ttsWords.tags = words.split(" ").map(el => {
            return { text: el };
          });
        }
        myself.$refs.ttsWords.$on("result", function(n) {
          myself.ttsDialog = false;
          myself.$refs.ttsWords.$off("result");
          cb(n);
        });
        myself.ttsDialog = true;
      };

      Blockly.camera = cb => {
        // Camera API
        this.video = this.$refs.video;
        this.capture = cb;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            window.streamCamera = stream;
            this.video.src = window.URL.createObjectURL(stream);
            //window.streamCamera =
            this.video.play();
          });
        }
        this.cameraDialog = true;
      };

      console.log("blocly mounted");
      //---- global event
      this.$global.$on("theme-change", this.onThemeChange);
      this.$global.$on("panel-resize", this.onResizePanel);
      this.$global.$on("board-change", this.onBoardChange);
      this.$global.$on("editor-mode-change", this.onEditorModeChange);
      this.$global.$on("editor-theme-change", this.onEditorThemeChange);
      this.$global.$on("editor-fontsize-change", this.onEditorFontsizeChange);

      this.$global.$on("compile-begin", this.clearError);
      this.$global.$on("compile-error", this.addError);
      //this.$global.$on("compile-success",_);
      if (Vue.prototype.$vuetify.theme.primary === "") {
        Vue.prototype.$vuetify.theme.primary = "#009688";
      }
      let theme = this.$vuetify.theme.primary;
      let lighter = util.ui.colorLuminance(theme, 0.2);
      document.body.getElementsByClassName(
        "blocklyToolboxDiv"
      )[0].style.backgroundColor = lighter;

      //---- render block
      this.onBoardChange(this.$global.board.board_info, true);
      //---- render editor theme
      this.onEditorThemeChange(this.$global.editor.theme);
      //---- render editor fontsize
      this.onEditorFontsizeChange(this.$global.editor.fontSize);
      //---- render editor mode change
      this.onEditorModeChange(this.$global.editor.mode, false);
      //---- load code ----//
      this.$global.editor.Blockly = Blockly;
      this.$global.editor.workspace = this.workspace;
      this.$global.editor.CodeMirror = null;
      this.$global.editor.Editor = this.getCm();
      //this.addError();

      this.detectTheme();

    },
    methods: {
      clangFormat() {
        //console.log(this.$global.editor.sourceCode);
        this.$global.editor.sourceCode = reformatCode(this.$global.editor.sourceCode);
      },
      detectTheme() {
        /* Detect Theme */
        const currentThemeColor = this.$vuetify.theme.primary;
        const getThemeName = this.themeColors.find((theme) => {
          const themeColor = theme["color"];
          return themeColor === currentThemeColor;
        });
        console.log(getThemeName["name"]);
        this.lightThemeArray.find(theme => theme === getThemeName["name"]) && this.cssTextLight();
        this.darkThemeArray.find(theme => theme === getThemeName["name"]) && this.cssTextDark();

        setTimeout(() => {
          this.lightThemeArray.find(theme => theme === getThemeName["name"]) && this.cssTextLight();
          this.darkThemeArray.find(theme => theme === getThemeName["name"]) && this.cssTextDark();
        }, 5000);
      },
      cssTextLight() {
        let elements = document.getElementsByClassName("blocklyTreeLabel");
        for (let i in elements) {
          if (elements.hasOwnProperty(i)) {
            elements[i].classList.add("text-white");
          }
        }
      },
      cssTextDark() {
        let elements = document.getElementsByClassName("blocklyTreeLabel");
        for (let i in elements) {
          if (elements.hasOwnProperty(i)) {
            elements[i].classList.remove("text-white");
          }
        }
      },
      snapCameraDialog() {
        this.video = this.$refs.video;
        this.canvas = this.$refs.canvas;
        this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
        this.snapshotBuffer = this.canvas.toDataURL();
        this.video.style = "display: none";
        this.canvas.style = "display: block";
      },
      refreshCameraDialog() {
        this.video = this.$refs.video;
        this.canvas = this.$refs.canvas;
        this.snapshotBuffer = null;
        this.video.style = "display: block";
        this.canvas.style = "display: none";
      },
      saveCameraDialog() {
        this.capture(this.snapshotBuffer);
        this.closeCameraDialog();
      },
      closeCameraDialog() {
        this.snapshotBuffer = null;
        this.capture = null;
        window.streamCamera.getTracks()[0].stop();
        this.refreshCameraDialog();
        this.cameraDialog = false;
      },
      getCm() {
        try {
          if ("cm" in myself.$refs) {
            if (myself.$refs.cm != undefined) {
              return myself.$refs.cm.getEditor();
            }
          }
          return false;
        } catch (e) {
          return false;
        }
      },
      onEditorFontsizeChange(value) {
        let cm = myself.getCm();
        if (cm) {
          cm.updateOptions({ fontSize: value });
          cm.layout();
        }
      },
      onEditorThemeChange(value) {
        let cm = myself.getCm();
        if (cm) {
          if (value === "vs-dark") {
            monaco.editor.setTheme("vs-dark");
          } else {
            import("monaco-themes/themes/" + value + ".json").then(data => {
              monaco.editor.defineTheme("monokai", data);
              monaco.editor.setTheme("monokai");
            });
          }
        }
      },
      onEditorModeChange(mode, convert = false, create_new = false) {
        if (mode < 3) {
          let xml = "";
          if (
            myself.$global.editor.blockCode !== "" &&
            myself.$global.editor.blockCode !==
            "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables></variables></xml>"
          ) {
            let text = myself.$global.editor.blockCode;
            xml = Blockly.Xml.textToDom(text);
          } else {
            let blocks = loadBlock(myself.$global.board.board_info);
            if (blocks.initial_blocks) {
              xml = Blockly.Xml.textToDom(blocks.initial_blocks);
            }
          }
          myself.workspace.clear();
          Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
          setTimeout(() => {
            Blockly.svgResize(this.workspace);
          }, 300);
        } else {
          //------ generate template here ------//
          const boardDirectory = `${this.$global.board.board_info.dir}`;
          const platformDir = `${util.platformDir}/${this.$global.board.board_info.platform}`;
          this.codegen = util.requireFunc(`${fs.existsSync(`${boardDirectory}/codegen.js`)
            ? boardDirectory
            : platformDir}/codegen`);
          if (convert) {
            const respCode = this.codegen.generate(this.$global.editor.rawCode);
            myself.$global.editor.sourceCode = reformatCode(respCode.sourceCode);
          } else if (create_new) {
            const codeRes = this.codegen.generate("");
            myself.$global.editor.sourceCode = reformatCode(codeRes.sourceCode);
          } else {
            //if user not convert just switch and leave create new (เอาไว้ให้ user กด new เองค่ะ
            //this.$global.editor.sourceCode = this.$global.editor.sourceCode;
          }
        }
        if ("cm" in this.$refs) {
          if (this.$refs.cm != undefined) {
            //enable editing code
            let code = this.$refs.cm.getEditor();
            //code.setOption("readOnly", mode < 3);
          }
        }
      },
      onBoardChange: function(boardInfo, first_init = false) {
        //reload plugin
        console.log("board changed resender toolbox");
        this.$global.plugin.pluginInfo = plug.loadPlugin(this.$global.board.board_info);
        initBlockly(boardInfo);
        let blocks = loadBlock(boardInfo);
        let stringBlock = "";
        if ("blocks" in blocks) {
          //render extended block
          stringBlock += renderBlock(blocks.blocks);
        }
        if ("base_blocks" in blocks) {
          //render block base from platform
          stringBlock += renderBlock(blocks.base_blocks);
        }
        // render plugin blocks
        stringBlock += loadAndRenderPluginsBlock(
          Blockly,
          boardInfo,
          this.$global.plugin.pluginInfo
        );
        // TODO : render platform block
        this.toolbox = `<xml id="toolbox" style="display: none">${stringBlock}</xml>`;
        this.workspace.updateToolbox(this.toolbox);
        //============== render mode 3 source code
        const boardDirectory = `${this.$global.board.board_info.dir}`;
        const platformDir = `${util.platformDir}/${this.$global.board.board_info.platform}`;
        this.codegen = util.requireFunc(`${fs.existsSync(`${boardDirectory}/codegen.js`)
          ? boardDirectory
          : platformDir}/codegen`);

        const codeRes = first_init && global.config.file ? {sourceCode : this.$global.editor.sourceCode} : this.codegen.generate("");
        myself.$global.editor.sourceCode = reformatCode(codeRes.sourceCode);
        //==============
        this.detectTheme();
      },
      onThemeChange(theme) {
        document.body.getElementsByClassName(
          "blocklyToolboxDiv"
        )[0].style.backgroundColor = util.ui.colorLuminance(theme, 0.2);
      },
      onResizePanel(pane, container, size) {
        Blockly.svgResize(this.workspace);
        console.log("editor resized");
      },
      updatecode(e) {
        // real time reformat mode
        if (e.type != Blockly.Events.UI) {
          //Blockly.JavaScript.resetTaskNumber();
          this.$global.editor.rawCode = Blockly.JavaScript.workspaceToCode(
            this.workspace
          );
          var xml = Blockly.Xml.domToText(
            Blockly.Xml.workspaceToDom(Blockly.mainWorkspace)
          );
          this.$global.editor.blockCode = xml;
        }
        if (!this.$global.editor.rawCodeMode && this.$global.editor.mode === 2) {
          let prev = reformatCode(this.codegen.generate(this.$global.editor.rawCode).sourceCode);
          this.$global.editor.previewSourceCode = prev;
        }
        /*else{
                if(e.element == 'selected'){
                    if(e.newValue != null){ //selected block
                        var block = this.workspace.getBlockById(e.newValue);
                        var code = Blockly.JavaScript.blockToCode(block);
                    }else{ //deselect block
                        console.log("deselected block");
                    }
                }
            }*/
      },
      clearError() {
        let cm = this.getCm();
        monaco.editor.setModelMarkers(this.getCm().getModel(), "error", []);
      },
      addError: function(errors) {
        try {
          let cm = this.getCm();
          this.clearError();
          if (!Array.isArray(errors)) {
            return;
          }
          if (errors.length === 0) {
            return;
          }
          let markers = [];
          errors.forEach(err => {
            if (typeof err !== "string") {
              return;
            }
            let rex = /^([0-9]+):([0-9]+):(.*)/g;
            let res = rex.exec(err);
            if (!res || res.length !== 4) {
              return;
            }
            let line = parseInt(res[1]);
            let col = parseInt(res[2]);
            let marker = {
              startLineNumber: line,
              startColumn: 0,
              endLineNumber: line,
              endColumn: 9999,
              message: htmlEntities(err),
              severity: monaco.MarkerSeverity.Error
            };
            markers.push(marker);
          });
          monaco.editor.setModelMarkers(this.getCm().getModel(), "error", markers);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };
</script>

<style>
    .editor {
        width: 100%;
        height: 100%;
    }

    .line-error {
        background: rgba(251, 0, 26, 0.34) !important;
        color: #fff7fb !important;
    }

    .vertical-panes-editor {
        width: 100%;
        height: 100%; /* minus header and footer */
        border: 1px solid #ccc;
    }

    .vertical-panes-editor > .pane {
        width: 25%;
    }

    .vertical-panes > .pane {
        text-align: left;
        overflow: hidden;
        background: #fff;
    }

    .vertical-panes > .pane ~ .pane {
        border-left: 4px solid #ccc;
    }

    .blocklyToolboxDiv {
        overflow-y: unset !important;
        background-color: #ace2ff;
        overflow-x: visible;
        overflow-y: auto;
        position: absolute;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        z-index: 70;
        -webkit-tap-highlight-color: transparent;
    }

    .layout-v > .multipane-resizer {
        width: 5px;
        height: 100%;
        margin-left: 0px;
        left: 0px;
        background-color: #bbb;
    }

    .CodeMirror {
        border: 1px solid #eee;
        height: 100%;
    }

    /* minus header and footer */
    .blocklyToolboxDiv {
        overflow: scroll;
    }

    .blocklyHtmlInput {
        background-color: white !important;
    }

    .CodeMirror-advanced-dialog {
        width: 400px;
        display: block;
        position: absolute;
        z-index: 999;
        background-color: #333;
        padding: 6px;
        right: 30px;
        top: 0px;
        color: wheat;
        -webkit-box-shadow: 2px 2px 6px 1px #666;
        -moz-box-shadow: 2px 2px 6px 1px #666;
        box-shadow: 2px 2px 6px 1px #666;
    }

    .CodeMirror-advanced-dialog input {
        border: none;
        outline: none;
        background: transparent;
        width: 5em;
        background-color: #555;
        color: wheat;
    }

    .CodeMirror-advanced-dialog button {
        font-size: 70%;
    }

    .CodeMirror-advanced-dialog .row {
        display: flex;
        width: 100%;
        align-items: center;
    }

    .CodeMirror-advanced-dialog input[type="text"] {
        display: inline-block;
        margin: 10px;
        flex: 1 1 auto;
    }

    .CodeMirror-advanced-dialog input::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #999;
        opacity: 1; /* Firefox */
    }

    .CodeMirror-search-hint {
        display: block;
        font-style: italic;
        flex: 0 0 100%;
    }
</style>

<!--<div id="blocklyDiv" style="position:fixed; width:100%; height:95%;">
</div>
<xml id="toolbox" ref=toolbox style="display: none">
    <category name='Basic' icon="./static/icons/SVG/c1.svg">
        <block type="controls_if"></block>
        <block type="text"></block>
        <block type="text_print"></block>
    </category>
</xml>-->
