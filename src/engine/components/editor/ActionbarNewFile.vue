<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="newFile">
            <v-icon dark>fa-file-text-o</v-icon>
        </v-btn>
        <span>New file</span>
    </v-tooltip>
</template>
<script>
  // === uitls ===
  import util from "@/engine/utils";

  const electron = require("electron");
  const reformatCode = util.requireFunc(util.packageDir + "/kbide-package-clang-format/main");

  export default {
    data() {
      return {};
    },
    created() {
      electron.ipcRenderer.on("file-new", this.newFile);
    },
    methods: {
      clangFormat() {
        this.$global.editor.sourceCode = reformatCode(this.$global.editor.sourceCode);
      },
      newFile: async function() {
        if (this.$global.editor.mode < 3 || this.$store.state.rawCode.mode === true) {
          const res = await this.$dialog.confirm({
            text: "Do you really want to clear this workspace?",
            title: "Warning",
            actions: [
              { text: "Confirm", key: "confirm" },
              { text: "Cancel", key: false, color: "red darken-1" }
            ]
          });

          if (res) {
            if (res === "confirm") {
              this.$global.editor.blockCode = "";
              this.$global.$emit("editor-mode-change", this.$global.editor.mode); //mode 1 no need to convert code

              if (this.$store.state.rawCode.mode === true) {
                this.$global.editor.mode = 2;
                this.$global.$emit("editor-mode-change", 2);
                this.$global.editor.mode = 3;
                this.$global.$emit("editor-mode-change", 3, true);
              }
            }
          }
        } else {
          const res = await this.$dialog.confirm({
            text: "Do you really want to clear this workspace?",
            title: "Warning",
            actions: [
              { text: "Clear", key: true },
              { text: "Convert from Block", key: "convert" },
              { text: "Cancel", key: false, color: "red darken-1" }
            ]
          });
          if (res && res !== "Cancel") {
            if (res === "convert") {
              this.$global.$emit("editor-mode-change", this.$global.editor.mode, true);
              this.clangFormat();
            } else {
              this.$global.$emit("editor-mode-change", this.$global.editor.mode, false, true); //dont convert just create new
              this.clangFormat();
            }
          }
        }
      }
    }
  };
</script>
