<template>
    <div>
        <v-divider></v-divider>
        <v-flex>
            <v-subheader class="px-1 my-2">
                Editor Setting
            </v-subheader>
            <div class="my-3">
                <v-select
                        :items="editorTheme"
                        label="Select theme"
                        v-model="editorThemeValue">
                </v-select>
            </div>
            <div class="my-3">
                <v-select
                        :items="fontSize"
                        label="Font size"
                        v-model="editorFontsize"
                ></v-select>
            </div>
        </v-flex>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        fontSize: ["10", "12", "14", "16", "18", "20", "24", "28", "32", "64", "78"],
        editorTheme: [
          "vs-dark",
          "Active4D",
          "All Hallows Eve",
          "Amy",
          "Birds of Paradise",
          "Blackboard",
          "Brilliance Black",
          "Brilliance Dull",
          "Chrome DevTools",
          "Clouds Midnight",
          "Clouds",
          "Cobalt",
          "Dawn",
          "Dreamweaver",
          "Eiffel",
          "Espresso Libre",
          "GitHub",
          "IDLE",
          "Katzenmilch",
          "Kuroir Theme",
          "LAZY",
          "MagicWB (Amiga)",
          "Merbivore Soft",
          "Merbivore",
          "Monokai Bright",
          "Monokai",
          "Night Owl",
          "Oceanic Next",
          "Pastels on Dark",
          "Slush and Poppies",
          "Solarized-dark",
          "Solarized-light",
          "SpaceCadet",
          "Sunburst",
          "Textmate (Mac Classic)",
          "Tomorrow-Night-Blue",
          "Tomorrow-Night-Bright",
          "Tomorrow-Night-Eighties",
          "Tomorrow-Night",
          "Tomorrow",
          "Twilight",
          "Upstream Sunburst",
          "Vibrant Ink",
          "Xcode_default",
          "Zenburnesque",
          "iPlastic",
          "idleFingers",
          "krTheme",
          "monoindustrial"],
        editorThemeValue: this.$global.editor.theme,
        editorFontsize: this.$global.editor.fontSize,
      };
    },
    watch: {
      editorThemeValue: {
        handler(value) {
          if (value) {
            this.$global.editor.theme = value;
            this.$global.$emit("editor-theme-change", value);
          }
        },
        immediate: true,
      },
      editorFontsize: {
        handler(value) {
          if (value) {
            this.$global.editor.fontSize = value;
            this.$global.$emit("editor-fontsize-change", value);
          }
        },
      },
    },
  };
</script>
