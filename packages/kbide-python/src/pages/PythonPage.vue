<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app class="app" id="inspire">
        <app-toolbar ref="toolbar" class="app--toolbar" v-on:created="createToolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <div class="page-wrapper">
            <!-- screen divider (into 3 section page,rightTab,bottomTab) -->
            <multipane class="multiplate-warper" layout="horizontal">
              <!-- upper pane -->
              <multipane
                      :style="[$global.ui.bottomTab.length > 0 ? {} : {'width':'100%', 'height' :'100%'}]"
                      @paneResizeStop="onResizePanel" class="vertical-panes" layout="vertical">
                <!-- left page -->
                <div :style="[$global.ui.rightTab.length > 0 ? {'display' : 'block'} : {'width':'100%', 'height' :'100%','display' : 'block'}]"
                     class="page-navigation-display">
                  <router-view></router-view>
                </div>
                <!-- end -->
                <multipane-resizer v-if="$global.ui.rightTab.length > 0"></multipane-resizer>
                <!--right tab -->
                <div :style="[{ flexGrow: 1 }, ($global.ui.rightTab.length > 0 ? ({'min-width':'20%','display' : 'block'}) : ({'display' : 'none'}))]"
                     class="pane">

                  <v-tabs color="primary" dark ref="rtabs" slider-color="yellow"
                          v-model="$global.ui.rightTabModel">
                    <draggable :options="{group: 'tab-group'}" class="v-tabs__container"
                               v-model="$global.ui.rightTab">
                      <!-- tab header -->
                      <v-tab :href="`#rtab-${tab.name}`" :key="index"
                             v-for="(tab, index) in $global.ui.rightTab">
                        {{ tab.title }}
                        <v-btn @click="closeTab(tab.name)" class="close-tab-btn-control" icon
                               small>
                          <v-icon dark>fa-close</v-icon>
                        </v-btn>
                      </v-tab>
                      <!-- end -->
                    </draggable>
                    <!-- tab body -->
                    <v-tab-item :key="`rtab-${tab.name}`" :value="`rtab-${tab.name}`"
                                v-for="(tab, index) in $global.ui.rightTab">
                      <component v-if="!tab.component.startsWith('.')" :is="tab.component" :key="index"></component>
                      <async-component v-else :key='index' :target="tab.component"/>
                    </v-tab-item>
                    <!-- end -->
                  </v-tabs>

                </div>

              </multipane>

              <multipane-resizer v-if="$global.ui.bottomTab.length > 0"></multipane-resizer>

              <!--lower pane -->
              <div class="bottom-tab" v-if="$global.ui.bottomTab.length > 0">
                <v-tabs color="primary" dark slider-color="yellow" v-model="$global.ui.bottomTabModel">
                  <draggable :options="{group: 'tab-group'}" class="v-tabs__container"
                             v-model="$global.ui.bottomTab">
                    <!-- tab header -->
                    <v-tab :href="`#btab-${tab.name}`" :key="index"
                           v-for="(tab, index) in $global.ui.bottomTab">
                      {{ tab.title }}
                      <v-btn @click="closeTab(tab.name)" class="close-tab-btn-control" icon small>
                        <v-icon dark>fa-close</v-icon>
                      </v-btn>
                    </v-tab>
                    <!-- end -->
                  </draggable>
                  <!-- tab body -->
                  <v-tab-item :key="`btab-${tab.name}`" :value="`btab-${tab.name}`"
                              v-for="(tab, index) in $global.ui.bottomTab">
                    <component v-if="!tab.component.startsWith('.')" :is="tab.component" :key="index"></component>
                    <async-component v-else :key='index' :target="tab.component"/>
                  </v-tab-item>
                  <!-- end -->
                </v-tabs>
              </div>
            </multipane>
          </div>
        </v-content>
        <!-- left drawer -->
        <v-navigation-drawer class="setting-drawer" fixed hide-overlay left temporary
                             v-model="$global.ui.leftDrawerComponent">
          <async-component :target="$global.ui.leftDrawerComponent"/>
        </v-navigation-drawer>
        <!-- right drawer -->
        <v-navigation-drawer class="setting-drawer" fixed hide-overlay right temporary
                             v-model="$global.ui.rightDrawerComponent">
          <async-component :target="$global.ui.rightDrawerComponent"/>
        </v-navigation-drawer>

        <app-footer></app-footer>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>

  </div>

  <v-app id="inspire">

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
