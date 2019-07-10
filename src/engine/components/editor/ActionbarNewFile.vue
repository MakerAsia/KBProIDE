<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="newFile">
            <v-icon dark>fa-file-text-o</v-icon>
        </v-btn>
        <span>New file</span>
    </v-tooltip>
</template>
<script>
  const electron = require("electron");
  export default {
    data() {
      return {};
    },
    created() {
      electron.ipcRenderer.on("file-new", this.newFile);
    },
    methods: {
      newFile: async function() {
        if (this.$global.editor.mode < 3) {
          var blockCode = this.$global.editor.blockCode;
          //console.log(blockCode);
          let rexEmptyBlock = /<xml.*?><variables><\/variables><block type="arduino_init\".*?><\/block><block type="arduino_loop\" id=\".*?\" x=\".*?\" y=\".*?\"><\/block><\/xml>/g;
          if (blockCode === "" ||
            blockCode === "<xml xmlns=\"http://www.w3.org/1999/xhtml\"><variables></variables></xml>" ||
            rexEmptyBlock.test(blockCode)) { //it empty workspace
            this.$global.ui.snackbar("Workspace already empty.");
          } else { //non-empty workspace
            const res = await this.$dialog.confirm({
              text: "This workspace is not empty. Do you really want to clear this workspace?",
              title: "Warning",
              actions: [
                { text: "Clear", key: "clear" },
                { text: "Cancel", key: false, color: "red darken-1" }
              ]
            });

            if (res) {
              if (res === "clear") {
                this.$global.editor.blockCode = "";
                this.$global.$emit("editor-mode-change", this.$global.editor.mode); //mode 1 no need to convert code
              }
            }
          }
        } else {
          const res = await this.$dialog.confirm({
            text: "This workspace is not empty. Do you really want to clear this workspace?",
            title: "Warning",
            actions: [
              { text: "Clear", key: true },
              { text: "Convert from Block", key: "convert" },
              { text: "Cancel", key: false, color: "red darken-1" }
            ]
          });

          if (res) {
            if (res === "convert") {
              this.$global.$emit("editor-mode-change", this.$global.editor.mode, true);
            } else {
              this.$global.$emit("editor-mode-change", this.$global.editor.mode, false, true); //dont convert just create new
            }
          }
        }
      }
    }
  };
</script>
