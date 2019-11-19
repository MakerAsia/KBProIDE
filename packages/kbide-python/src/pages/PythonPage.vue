<template>
  <v-app id="inspire">
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <multipane
              class="vertical-panes-editor"
              layout="vertical"
              fill-height
      >
        <!-- editor -->
        <div
                class="pane"
                style="width: 100%; height: 100%;"
        >
          <MonacoEditor
                  ref="cm"
                  v-model="$global.editor.sourceCode"
                  class="editor"
                  language="cpp"
                  theme="vs-dark"
                  :options="this.editor_options"
          />
        </div>
        <!-- end -->
      </multipane>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import MonacoEditor from "vue-monaco";
  export default {
    name: "python-editor",
    components: {
      MonacoEditor : MonacoEditor
    },
    data() {
      return {
        drawer: null,
        editor_options: this.$global.editor.editor_options,
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
    props: {
      source: String
    }
  }
</script>
