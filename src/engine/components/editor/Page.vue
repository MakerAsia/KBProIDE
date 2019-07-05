<template>

    <multipane class="vertical-panes-editor" layout="vertical" @paneResizeStop="onResizePanel" fill-height>
        <!-- editor -->
        <div class="pane"
             :style="[this.$global.editor.mode == 1 ? { width:'100%', height :'100%'} : (this.$global.editor.mode == 2 ? { minWidth: '500px', width: '75%' } : { width: '0px' })]">
            <div id="blocklyDiv" style="position:absolute; width:100%; height:100%;" color="onThemeChange"></div>
            <xml id="toolbox" ref=toolbox style="display: none">
                <category name="Basic" colour="160" icon="/static/icons/SVG/c1.svg">
                    <block type="basic_led16x8"></block>
                </category>
            </xml>

            <v-dialog v-model="variableDialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">{{variableMessage}}</span>
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
                                        :rules="[variable_name_validator]"></v-text-field>
                            </v-flex>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="variableDialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" flat :disabled="!validated" ref="variableOK"
                               @click="variableDialog = false">Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog v-model="musicDialog" max-width="785px">
                <piano-dialog ref="musicNotes" @close="()=>{musicDialog = false}"></piano-dialog>
            </v-dialog>
            <v-dialog v-model="ttsDialog" max-width="600px">
                <t-t-s-dialog ref="ttsWords" @close="()=>{ttsDialog = false}"></t-t-s-dialog>
            </v-dialog>
        </div>
        <!-- end -->
        <multipane-resizer v-if="this.$global.editor.mode == 2"></multipane-resizer>
        <!-- source code -->
        <div class="pane"
             :style="[this.$global.editor.mode == 1 ? {width: '0px'} : (this.$global.editor.mode == 2?{ flexGrow: 1 } : { width:'100%', height :'100%'})]">
            <code-mirror ref="cm" v-if="$global.editor.mode < 3"
                         v-model="$global.editor.rawCode"
                         :options="editor_options">
            </code-mirror>
            <code-mirror ref="cm" v-else-if="$global.editor.mode == 3"
                         v-model="$global.editor.sourceCode"
                         :options="editor_options">
            </code-mirror>
        </div>
        <!-- end -->
    </multipane>


</template>
<script>
  const electron = require("electron");
  var path = require("path");
  // === UI Management ===
  import {Multipane, MultipaneResizer} from "vue-multipane";
  // === Blockly ===
  import Blockly from "vue-blockly";
  import en from "vue-blockly/dist/msg/en";
  // === Editor ===
  import CodeMirror from "vue-cm";
  import "codemirror/lib/codemirror.css";
  import "codemirror/theme/mdn-like.css";
  import "codemirror/mode/clike/clike";
  import "codemirror/addon/edit/matchbrackets";
  import "codemirror/addon/selection/active-line";
  //---- search ----//
  import "codemirror/addon/display/panel";
  import "codemirror/addon/dialog/dialog.css";
  import "codemirror/addon/search/matchesonscrollbar.css";
  //import 'codemirror/addon/dialog/dialog';
  //import "codemirror/addon/search/searchcursor";
  //import "codemirror/addon/search/search";
  import "codemirror-advanceddialog";
  //import 'codemirror-advanceddialog/dist/dialog.css';
  import "codemirror-revisedsearch";
  //---- error lint ----//
  import "codemirror/addon/lint/lint.css";
  import CmLint from "./errorlint";
  import "codemirror/addon/scroll/annotatescrollbar";
  import "codemirror/addon/search/matchesonscrollbar";
  import "codemirror/addon/search/jump-to-line";
  // === uitls ===
  import util from "@/engine/utils";

  const fs = require("fs");
  // === engine ===
  import plug from "@/engine/PluginManager";
  // === dialog ===
  import VariableNamingDialog from "@/engine/views/dialog/VariableNamingDialog";
  import PianoDialog from "@/engine/views/dialog/PianoDialog";
  import TTSDialog from "@/engine/views/dialog/TTSDialog";

  let htmlEntities = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  let renderBlock = function(blocks, level = 1) {
    let res = "";
    if (blocks === undefined) {
      return res;
    }
    blocks.forEach(element => {
      if (level === 1) {
        if (element.blocks) {
          var insideBlock = renderBlock(element.blocks, level + 1);
        } else {
          var insideBlock = "";
        }
        if (element.xml) {
          var insideBlock = element.xml;
        }
        var custom = element.custom ? `custom="${element.custom}" ` : "";
        res += `<category name="${element.name}" colour="${element.color}" ${custom}icon="${element.icon}">${insideBlock}</category>`;
      } else {
        if (typeof (element) === "string") { //block element
          res += `<block type="${element}"></block>`;
        } else if (typeof (element) == "object" && element.xml) {
          res += element.xml;
        } else if (typeof (element) === "object" && "type" in element && element.type == "category") {
          let insideBlock = renderBlock(element.blocks, level + 1);
          var custom = element.custom ? `custom="${element.custom}" ` : "";
          res += `<category name="${element.name}" ${custom}icon="${element.icon}">${insideBlock}</category>`;
        } else if (typeof (element) === "object" && "mutation" in element) {
          let objKey = [];
          Object.keys(element.mutation).forEach(key => {
            objKey.push(`${key}="${element.mutation[key]}"`);
          });
          res += `<mutation ${objKey.join(" ")}></mutation>`;
        } else if (typeof (element) === "object") {
          let insideBlock = renderBlock(element.blocks, level + 1);
          res += `<block type="${element.name}">${insideBlock}</block>`;
        }
      }
    });
    return res;
  };
  var loadAndRenderPluginsBlock = function(Blockly, boardInfo, pluginInfo) {
    var pluginName = "Plugins";
    var plugins = pluginInfo; // plug.loadPlugin(boardInfo);
    let catStr = "";
    //console.log(plugins);
    plugins.categories.forEach(cat => {
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
      //let thName = cat.category.title;
      let name = (cat.category.name.en) ? cat.category.name.en : cat.category.title;
      let color = cat.category.color;
      catStr += `<category name="${name}" colour="${color}">${blockStr}</category>`;
    });
    return `<sep></sep><category name="${pluginName}" color="290">${catStr}</category>`;
  };
  var loadBlock = function(boardName, target) {
    //look for board first
    var blockFile = `${util.boardDir}/${boardName}/block/config.js`;
    if (!util.fs.existsSync(blockFile)) {
      return null;
    }
    var blocks = util.requireFunc(blockFile);
    return blocks;
  };
  var initBlockly = function(boardInfo) {
    var boardName = boardInfo.name;
    var platformName = boardInfo.platform;
    var blockyDir = `${util.boardDir}/${boardName}/block`;
    var platformBlockDir = `${util.platformDir}/${platformName}/block`;
    //lookup platform first
    var platformBlockFile = util.fs.readdirSync(platformBlockDir).map(obj => `${platformBlockDir}/${obj}`);
    platformBlockFile.sort(function(a, b) {
      return a.length - b.length;
    });
    var blocklyFile = util.fs.readdirSync(blockyDir).map(obj => `${blockyDir}/${obj}`);
    blocklyFile.sort(function(a, b) {
      return a.length - b.length;
    });
    var blocks = platformBlockFile.concat(blocklyFile);
    if (blocks.length > 0) {
      blocks.forEach(element => {
        if (element.includes("config.js")) { //skip config.js file
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
        }
      });
    }
  };
  /*var reloadBlockly = function(toolbox,workspace,updatecode){

  }*/
  var myself;
  export default {
    name: "editor",
    components: {
      Multipane,
      MultipaneResizer,
      CodeMirror,
      VariableNamingDialog,
      PianoDialog,
      TTSDialog,
    },
    data() {
      return {
        workspace: null,
        toolbox: null,
        cm: null,
        editor_options: {
          mode: "text/x-c++src",
          theme: "mdn-like",
          lineNumbers: true,
          styleActiveLine: true,
          matchBrackets: true,
          readOnly: true,
          extraKeys: {"Alt-F": "findPersistent"},
          gutters: ["CodeMirror-lint-markers"],
          lint: true,
        },
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
        lineError: [],
      };
    },
    created() {
      myself = this;
      electron.ipcRenderer.on("edit-undo", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({keyCode: "Z".charCodeAt(0), ctrlKey: true, target: {type: "none"}});
        } else {
          let cm = myself.getCm();
          cm.execCommand("undo");
        }
      });
      electron.ipcRenderer.on("edit-redo", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({keyCode: "Y".charCodeAt(0), ctrlKey: true, target: {type: "none"}});
        } else {
          let cm = myself.getCm();
          cm.execCommand("redo");
        }
      });
      electron.ipcRenderer.on("edit-cut", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({keyCode: "X".charCodeAt(0), ctrlKey: true, target: {type: "none"}});
        } else {
          document.execCommand("cut");
        }
      });
      electron.ipcRenderer.on("edit-copy", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({keyCode: "C".charCodeAt(0), ctrlKey: true, target: {type: "none"}});
        } else {
          document.execCommand("copy");
        }
      });
      electron.ipcRenderer.on("edit-paste", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({keyCode: "V".charCodeAt(0), ctrlKey: true, target: {type: "none"}});
        } else {
          document.execCommand("paste");
        }
      });
      electron.ipcRenderer.on("edit-find", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({keyCode: "F".charCodeAt(0), ctrlKey: true, target: {type: "none"}});
        } else {
          let cm = myself.getCm();
          cm.execCommand("find");
        }
      });
      electron.ipcRenderer.on("edit-replace", () => {
        if (this.$global.editor.mode < 3) {
          Blockly.onKeyDown_({keyCode: "H".charCodeAt(0), ctrlKey: true, target: {type: "none"}});
        } else {
          let cm = myself.getCm();
          cm.execCommand("replace");
        }
      });
    },
    mounted() {
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
          snap: true,
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
          scaleSpeed: 1.2,
          //scrollbars: false
        },
      });
      this.workspace.addChangeListener(this.updatecode);
      Blockly.svgResize(this.workspace);
      this.workspace.scrollCenter();
      // override prompt function, fixed electron dialog problem
      Blockly.prompt = function(message, defaultValue, callback) {
        myself.variable_name = defaultValue;
        myself.variableMessage = message;
        myself.$refs.variableOK.$on("click", function() {
          var new_val = myself.variable_name;
          if ((new_val) && (new_val != "") && myself.validated) {
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
          myself.$refs.musicNotes.tags = notes.split(",").map(el => {return {text: el};});
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
          myself.$refs.ttsWords.tags = words.split(" ").map(el => {return {text: el};});
        }
        myself.$refs.ttsWords.$on("result", function(n) {
          //console.log(n);
          myself.ttsDialog = false;
          myself.$refs.ttsWords.$off("result");
          cb(n);
        });
        myself.ttsDialog = true;
      };
      console.log("blocly mounted");
      //---- global event
      this.$global.$on("theme-change", this.onThemeChange);
      this.$global.$on("panel-resize", this.onResizePanel);
      this.$global.$on("board-change", this.onBoardChange);
      this.$global.$on("editor-mode-change", this.onEditorModeChange);
      this.$global.$on("editor-theme-change", this.onEditorThemeChange);
      this.$global.$on("editor-fontsize-change", this.onEditorFontsizeChange);

      this.$global.$on("compile-begin",this.clearError);
      this.$global.$on("compile-error",this.addError);
      //this.$global.$on("compile-success",_);
      if(Vue.prototype.$vuetify.theme.primary === ""){
        Vue.prototype.$vuetify.theme.primary = '#009688';
      }
      let theme = this.$vuetify.theme.primary;
      var lighter = util.ui.colorLuminance(theme, 0.2);
      document.body.getElementsByClassName("blocklyToolboxDiv")[0].style.backgroundColor = lighter;

      //---- render block
      this.onBoardChange(this.$global.board.board_info);
      //---- render editor theme
      this.onEditorThemeChange(this.$global.editor.theme);
      //---- render editor fontsize
      this.onEditorFontsizeChange(this.$global.editor.fontSize);
      //---- render editor mode change
      this.onEditorModeChange(this.$global.editor.mode, false);
      //---- load code ----//
      this.$global.editor.Blockly = Blockly;
      this.$global.editor.workspace = this.workspace;
      this.$global.editor.CodeMirror = this.getCm();
      //this.addError();
    },
    methods: {
      getCm() {
        try {
          if ("cm" in myself.$refs) {
            if (myself.$refs.cm != undefined) {
              return myself.$refs.cm.getCodeMirror();
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
          cm.getWrapperElement().style["font-size"] = value + "px";
          cm.refresh();
        }
      },
      onEditorThemeChange(value) {
        //console.log(value);
        import("codemirror/theme/" + value + ".css");
        let cm = myself.getCm();
        if (cm) {
          cm.setOption("theme", value);
        }
      },
      onEditorModeChange(mode, convert = false, create_new = false) {
        if (mode < 3) {
          var xml = "";
          if (myself.$global.editor.blockCode !== "" &&
              myself.$global.editor.blockCode !==
              "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables></variables></xml>") {
            var text = myself.$global.editor.blockCode;
            xml = Blockly.Xml.textToDom(text);
          } else {
            var blocks = loadBlock(myself.$global.board.board);
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
          const boardDirectory = `${util.boardDir}/${this.$global.board.board}`;
          const platformDir = `${util.platformDir}/${this.$global.board.board_info.platform}`;
          let codegen = null;
          if (fs.existsSync(`${boardDirectory}/codegen.js`)) {
            codegen = util.requireFunc(`${boardDirectory}/codegen`);
          } else {
            codegen = util.requireFunc(`${platformDir}/codegen`);
          }
          if (convert) {
            const respCode = codegen.generate(this.$global.editor.rawCode);
            myself.$global.editor.sourceCode = respCode.sourceCode;
          } else if (create_new) {
            const codeRes = codegen.generate("");
            myself.$global.editor.sourceCode = codeRes.sourceCode;
          } else {
            //if user not convert just switch and leave create new (เอาไว้ให้ user กด new เองค่ะ
            //this.$global.editor.sourceCode = this.$global.editor.sourceCode;
          }
        }
        if ("cm" in this.$refs) {
          if (this.$refs.cm != undefined) { //enable editing code
            let code = this.$refs.cm.getCodeMirror();
            code.setOption("readOnly", mode < 3);
          }
        }
      },
      onBoardChange: function(boardInfo) {
        //reload plugin
        this.$global.plugin.pluginInfo = plug.loadPlugin(this.$global.board.board_info);

        initBlockly(boardInfo);
        let boardName = boardInfo.name;
        let blocks = loadBlock(boardName);
        let stringBlock = "";
        if ("base_blocks" in blocks) { //render block base from platform
          stringBlock += renderBlock(blocks.base_blocks);
        }
        if ("blocks" in blocks) { //render extended block
          stringBlock += renderBlock(blocks.blocks);
        }
        // render plugin blocks
        stringBlock += loadAndRenderPluginsBlock(Blockly, boardInfo, this.$global.plugin.pluginInfo);
        // TODO : render platform block
        this.toolbox = `<xml id="toolbox" style="display: none">${stringBlock}</xml>`;
        this.workspace.updateToolbox(this.toolbox);
      },
      onThemeChange(theme) {
        var lighter = util.ui.colorLuminance(theme, 0.2);
        document.body.getElementsByClassName("blocklyToolboxDiv")[0].style.backgroundColor = lighter;
      },
      onResizePanel(pane, container, size) {
        Blockly.svgResize(this.workspace);
        console.log("editor resized");
        //console.log(this.$root.editor.MODE);
      },
      updatecode(e) {
        if (e.type != Blockly.Events.UI) {
          //Blockly.JavaScript.resetTaskNumber();
          this.$global.editor.rawCode = Blockly.JavaScript.workspaceToCode(this.workspace);
          var xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
          this.$global.editor.blockCode = xml;
        }/*else{
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
      setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      },
      clearError() {
        let cm = this.getCm();
        this.lineError.forEach(el=>{
          cm.clearGutter(CmLint.GUTTER_ID);
          //cm.removeLineClass(el.line);
          el.marker.clear();
        });
        this.lineError = [];
      },
      addError:function(errors) {
        try {
          let cm = this.getCm();
          this.clearError();
          if (!Array.isArray(errors)) { return; }
          if (errors.length === 0) { return; }
          errors.forEach(err => {
            if (typeof err !== 'string') {return;}
            let rex = /^([0-9]+):([0-9]+):(.*)/g;
            let res = rex.exec(err);
            if (!res || res.length !== 4) { return; }
            let line = parseInt(res[1]) - 1
            let col = parseInt(res[2]);
            let div = document.createElement('span');
            div.innerHTML = htmlEntities(err);
            let gutter =
                cm.setGutterMarker(line, CmLint.GUTTER_ID, CmLint.makeMarker(cm, div, "error", false, err));
            //let marker = cm.addLineClass(line, 'background', 'line-error');
            let marker = cm.markText(
                {line: line, ch: 0},
                {line: line, ch: 9999},
                {className: 'line-error', title: err}
            );
            myself.lineError.push({
                                    line: line,
                                    col: col,
                                    gutter: gutter,
                                    marker: marker
                                  });
          });
        }catch (e) {
          console.log(e);
        }
      },
    },
  };
</script>

<style>
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
        background-color: #ACE2FF;
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
        background-color: #BBB;
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

    .CodeMirror-advanced-dialog input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
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