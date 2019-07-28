<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click.native="openFilePopUp">
                <v-icon dark>fa-folder-open</v-icon>
            </v-btn>
            <span>Open file</span>
        </v-tooltip>
    </div>
</template>

<script>
  import {resolve} from "url";
  import util from "@/engine/utils";

  const electron = require("electron");
  const { dialog } = require("electron").remote;
  const fs = require("fs");
  const path = require("path");
  //const WIN = new BrowserWindow({width: 800, height: 600});
  export default {
    data() {
      return {
        openDialog: false
      };
    },
    created() {
      electron.ipcRenderer.on("file-open", this.openFilePopUp);
    },
    methods: {
      openFilePopUp: async function() {
        let mode = this.$global.editor.mode;
        if (mode < 3) {
          let userDec = await this.$dialog.confirm({
            title: "Warning",
            text: "Open new file will overwrite workspace, what do you want to do?",
            actions: [
              { text: "Confirm", key: "confirm" },
              { text: "Cancel", key: "cancel", color: "red darken-1" }
            ]
          });
          if (userDec === "confirm") {
            let blyOption = {
              title: "Open Blockly File",
              filters: [
                { name: "Blockly file", extensions: ["bly", "txt"] }
              ]
            };
            let filePaths = dialog.showOpenDialog(null, blyOption);
            if (filePaths) {
              let file = filePaths[0];
              let text = fs.readFileSync(file, "utf8");
              text = util.b64DecodeUnicode(text);
              this.$global.editor.blockCode = text;
              this.$global.$emit("editor-mode-change", this.$global.editor.mode);
              //--track--//
              this.$track.event("editor", "open", { evLabel: path.extname(file), evValue: 1, clientID: this.$track.clientID }).catch(err => { console.log(err);});
            }
          }
        } else {
          let userDec = await this.$dialog.confirm({
            title: "Save you code first?",
            text: "Open new file will overwrite your code, what do you want to do?",
            actions: [
              { text: "Cancel", key: false },
              { text: "Clear & Open", key: true }
            ]
          });
          if (userDec === true) {
            let codeOption = {
              title: "Open Code File",
              filters: [
                { name: "Source code file", extensions: ["kbp", "ino", "c", "cpp"] }
              ]
            };
            let filePaths = dialog.showOpenDialog(null, codeOption);
            if (filePaths) {
              let file = filePaths[0];
              this.$global.editor.sourceCode = fs.readFileSync(file, "utf8");
              //this.$global.$emit('editor-mode-change',this.$global.editor.mode);
              //--track--//
              this.$track.event("editor", "open", { evLabel: path.extname(file), evValue: 1 }).catch(err => { console.log(err);});
            }
          }
        }
      }
    }
  };
</script>
