<template>
  <div id="appRoot">
    <template>
      <v-app class="app" id="inspire">
        <app-toolbar ref="toolbar" class="app--toolbar" v-on:created="createToolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->

            <!-- screen divider (into 3 section page,rightTab,bottomTab) -->
              <!-- upper pane -->
              <multipane
                      :style="[{'width':'100%', 'height' :'100%'}]"
                      @paneResizeStop="onResizePanel" class="vertical-panes" layout="vertical">
                <!-- left page -->
                <div :style="[{'width':'100%', 'height' :'100%','display' : 'block'}]"
                     class="page-navigation-display">


                        <!-- editor -->
                        <div
                                class="pane"
                                style="width: 100%; height: 100%;"
                        >
                          <MonacoEditor
                                  ref="cm"
                                  v-model="$global.editor.sourceCode"
                                  class="editor"
                                  language="python"
                                  theme="vs-dark"
                                  :options="this.editor_options"
                          />
                        </div>
                        <!-- end -->
                </div>
                <!-- end -->
              </multipane>
        </v-content>
        <!-- left drawer -->
        <app-footer></app-footer>
      </v-app>
    </template>
  </div>
</template>

<script>
  import MonacoEditor from "vue-monaco";
  export default {
    name: "python-editor",
    components: {
      MonacoEditor : MonacoEditor,
      AppToolbar : ()=> import("../views/Toolbar"),
      AppFooter : ()=> import("../views/Footer")
    },
    data() {
      return {
        editorStatus : '',
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
    mounted(){
      this.mountCm();
    },
    methods : {
      mountCm : function(){
        if(this.$global.editor.Editor){
          this.cm = this.$global.editor.Editor;
          //this.$global.editor.Editor.model.onDidChangeContent(this.updateEditorStatus);
          this.$global.editor.Editor.onDidChangeCursorPosition(this.updateEditorStatus,'',true);
        }else{
          setTimeout(this.mountCm,1000);
        }
      },
      updateEditorStatus : function(e){
        if(this.$global.editor.mode >= 3){
          let text = ` Ln ${e.position.lineNumber}, Col ${e.position.column}`;
          this.editorStatus = text;
        }
      }
    },
    props: {
      source: String
    }
  }
</script>
