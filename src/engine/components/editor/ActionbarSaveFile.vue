<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="saveFilePopUp">
            <v-icon dark>fa-floppy-o</v-icon>
        </v-btn>
        <span>Save file</span>
    </v-tooltip>
</template>

<script>
  const {dialog} = require("electron").remote;
  const electron = require("electron");
  const fs = require("fs");
  import util from "@/engine/utils";
  const path = require("path");
  export default {
    data() {
      return {
        saveDialog: false,
      };
    },
    created() {
      electron.ipcRenderer.on("file-save", this.saveFilePopUp);
    },
    methods: {
      saveFilePopUp: async function() {
        let mode = this.$global.editor.mode;
        if (mode < 3) {
          let blyOption = {
            title: "Save block File",
            filters: [
              {name: "Blockly file", extensions: ["bly", "txt"]},
            ],
          };
          let res = dialog.showSaveDialog(null, blyOption);
          if (res) {
            let Blockly = this.$global.editor.Blockly;
            let bCode = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
            let writeRes = fs.writeFileSync(res, util.b64EncodeUnicode(bCode), "utf8");
            this.$global.ui.snackbar("Save file success");
            //--track--//
            this.$track.event("editor", "save", {evLabel: path.extname(res), evValue: 1}).catch(err=>{ console.log(err)});
          }
        } else {
          let codeOption = {
            title: "Save Code File",
            filters: [
              {name: "Source code file", extensions: ["kbp", "ino", "cpp", "c"]},
            ],
          };
          let res = dialog.showSaveDialog(null, codeOption);
          if (res) {
            let source = this.$global.editor.sourceCode;
            let writeRes = fs.writeFileSync(res, source, "utf8");
            this.$global.ui.snackbar("Save file success");
            //--track--//
            this.$track.event("editor", "save", {evLabel: path.extname(res), evValue: 1,clientID : this.$track.clientID}).catch(err=>{ console.log(err)});
          }
        }
      },
    },
  };
</script>