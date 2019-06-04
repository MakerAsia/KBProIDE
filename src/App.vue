<template>
    <div id="appRoot">
        <template v-if="!$route.meta.public">
            <v-app class="app" id="inspire">
                <app-toolbar class="app--toolbar"></app-toolbar>
                <v-content>
                    <!-- Page Header -->
                    <div class="page-wrapper">
                        <!-- screen divider (into 3 section page,rightTab,bottomTab) -->
                        <multipane @paneResizeStop="onResizePanel" class="multiplate-warper" layout="horizontal">
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
                                            <async-component :key='index' :target="tab.component"/>
                                        </v-tab-item>
                                        <!-- end -->
                                    </v-tabs>

                                </div>

                            </multipane>

                            <multipane-resizer v-if="$global.ui.bottomTab.length > 0"></multipane-resizer>

                            <!--lower pane -->
                            <div class="bottom-tab" v-if="$global.ui.bottomTab.length > 0">
                                <v-tabs color="primary" dark slider-color="yellow" v-model="bottomTabModel">
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
                                        <async-component :key='index' :target="tab.component"/>
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
        <v-snackbar
                :bottom="$global.ui.snackbarConfig.y === 'bottom'"
                :color="$global.ui.snackbarConfig.color"
                :left="$global.ui.snackbarConfig.x === 'left'"
                :multi-line="$global.ui.snackbarConfig.mode === 'multi-line'"
                :right="$global.ui.snackbarConfig.x === 'right'"
                :timeout="$global.ui.snackbarConfig.timeout"
                :top="$global.ui.snackbarConfig.y === 'top'"
                :vertical="$global.ui.snackbarConfig.mode === 'vertical'"
                v-model="$global.ui.snackbarStatus"
        >
            {{ $global.ui.snackbarConfig.text }}
            <v-btn @click.native="$global.ui.snackbarStatus = false" dark flat icon>
                <v-icon>close</v-icon>
            </v-btn>
        </v-snackbar>
        <app-updater></app-updater>
        <v-dialog persistent v-model="firstUseDialog" max-width="450">
            <v-card>
                <v-card-title>
                    <span class="headline">Welcome to KBIDE</span>
                </v-card-title>
                <v-card-text>
                    <p class="title">
                        New IDE for everyone.
                    </p>
                    <p class="subtitle">
                        It look like you just open this IDE for first time.
                        There are some important features that you need to know in here.
                        Let us introduce new features of KBIDE.<br/><br/>
                    </p>
                    <p style="color:red">*Note : 'Click' are disabled util the tour end.</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" color="blue darken-1" flat @click="skipTour">Skip it</v-btn>
                        </template>
                        <span>You can start again in Help > IDE Tour</span>
                    </v-tooltip>
                    <v-btn color="blue darken-1" flat @click="startTour('en')">Start tour</v-btn>
                    <v-btn color="blue darken-1" flat @click="startTour('th')">แสดงคำแนะนำภาษาไทย</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent v-model="endDialog" max-width="400">
            <v-card>
                <v-card-title>
                    <span class="headline">{{endDialogTitle}}</span>
                </v-card-title>
                <v-card-text v-html="endDialogText">
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on" color="blue darken-1" flat @click="endDialog = false">OK</v-btn>
                        </template>
                        <span>You can start again in Help > IDE Tour</span>
                    </v-tooltip>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-tour name="ideTour" :steps="tourStep" :callbacks="tourCallbacks" :options="tourOptions"></v-tour>
    </div>
</template>
<script>
  import Vue from "vue";
  import AppToolbar from "@/engine/views/AppToolbar";
  import AppFooter from "@/engine/views/AppFooter";
  import {Multipane, MultipaneResizer} from "vue-multipane";
  import draggable from "vuedraggable";

  const electron = require("electron");
  //========= load manager ==========//
  import bm from "@/engine/BoardManager";
  import AsyncComponent from "@/engine/AsyncComponent";
  import AppEvents from "./event";
  import util from "@/engine/utils";
  import {stat} from "fs";
  import {spread} from "q";
  //========= updating =========//
  import AppUpdater from "@/engine/updater/AppUpdater";

  import TourSteps from "./tour";

  require("vue-tour/dist/vue-tour.css");

  export default {
    components: {
      AppToolbar,
      Multipane,
      draggable,
      MultipaneResizer,
      AsyncComponent,
      AppFooter,
      AppUpdater,
    },
    data() {
      return {
        expanded: true,
        firstUseDialog: this.$global.setting.firstUse,
        endDialog: false,
        endDialogText: TourSteps.endDialog.content.en,
        endDialogTitle: TourSteps.endDialog.title.en,
        tourStep: TourSteps.en,
        tourCallbacks: {
          onPreviousStep: this.tourPreviousStep,
          onNextStep: this.tourNextStep,
          onStop: this.tourStop,
        },
        tourOptions: {
          labels: TourSteps.button.en,
        },
        tourLang: "en",
      };
    },
    computed: {},
    mounted: function() {

    },
    created() {
      AppEvents.forEach(item => {
        this.$on(item.name, item.callback);
      });
      window.getApp = this;
      //======== INIT ========//
      //----- load color -----//
      this.$vuetify.theme.primary = this.$global.setting.color;
      //----- load external plugin -----//
      this.reloadBoardPackage();
      this.$global.$on("board-change", this.reloadBoardPackage);
      //----- check for update -----//
      this.$global.$on("check-update", this.checkUpdate);
      electron.ipcRenderer.on("file-board-folder", () => {
        electron.shell.openItem(util.boardDir);
      });
      electron.ipcRenderer.on("file-platform-folder", () => {
        electron.shell.openItem(util.platformDir);
      });
      electron.ipcRenderer.on("file-plugin-folder", () => {
        electron.shell.openItem(util.boardDir + "/" + window.getApp.$global.board.board + "/plugin");
      });
      electron.ipcRenderer.on("help-tour", () => {
        window.getApp.firstUseDialog = true;
      });
      this.$track.pageview("/", "/home", document.title).then((response) => {
        window.getApp.$track.clientID = response.clientID;
        window.getApp.$track.set("clientID", response.clientID);
        return response;
      }).catch((err) => {
        return err;
      });
    },
    methods: {
      closeTab(name) {
        this.$global.ui.removeAllTab(name);
      },
      reloadBoardPackage() {
        var boardName = this.$global.board.board;
        var boardPackage = bm.packages(boardName);
        console.log("--------- bp ---------");
        console.log(boardPackage);

        var bp = {};
        // re-assign package to board
        Object.keys(boardPackage).forEach(packageName => {
          bp[packageName] = {};
          let boardPackageData = util.loadCofigComponents(boardPackage[packageName].config,
                                                          "board.package." + packageName);
          bp[packageName] = boardPackageData.data;
        });

        Object.keys(boardPackage).forEach((packageName, index, arr) => {
          let targetJsFile = boardPackage[packageName].js;
          let targetLinkFile = `file:///${targetJsFile}`;
          if (util.fs.existsSync(targetJsFile)) {
            let script = document.createElement("script");
            script.setAttribute("src", targetLinkFile);
            script.onload = function() {
              if (packageName in window) {
                Vue.use(window[packageName]);
                bp[packageName].loaded = true;
                console.log(`board [${boardName}] loaded package : ${packageName}`);
                if (index === arr.length - 1) {
                  Vue.prototype.$global.board.package = bp;
                }
              }
            };
            document.head.appendChild(script);
          }
        });
      },
      onResizePanel(pane, container, size) {
        this.$global.$emit("panel-resize", size);
        if (this.$refs.rtabs) {
          this.$refs.rtabs.onResize();
        }
      },
      skipTour: function() {
        this.firstUseDialog = false;
        this.$global.setting.firstUse = false;
      },
      startTour: function(lang) {
        this.firstUseDialog = false;
        if (lang === "th") {
          this.tourOptions.labels = TourSteps.button.th;
          this.tourStep = TourSteps.th;
        } else {
          this.tourOptions.labels = TourSteps.button.en;
          this.tourStep = TourSteps.en;
        }
        this.tourLang = lang;
        this.$tours["ideTour"].start();
      },
      tourNextStep: function(step) {
        try {
          switch (step) {
            case 3:
              document.querySelector(this.tourStep[step].target + " > span > span > button").click();
              break;
            case 4:
              document.querySelector(
                  "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__text > div > div > div > div:nth-child(2) > div > div").
              click();
              break;
            case 5:
              document.querySelector(this.tourStep[step].target).click();
              break;
            case 6:
              document.querySelector(
                  "#inspire > div.v-dialog__content.v-dialog__content--active > div > div.v-card.v-sheet.v-sheet--tile.theme--light > div.v-card__actions > span > button:nth-child(2)").
              click();
              break;
            case 7:
              document.querySelector(this.tourStep[step].target + " > span > span > button").click();
              break;
            case 8:
              document.querySelector(
                  "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button:nth-child(2)").
              click();
              break;
            case 9:
              document.querySelector(this.tourStep[step].target + " > span > span > button").click();
              break;
            case 10:
              document.querySelector(
                  "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button").
              click();
              break;
            case 11:
              document.querySelector(this.tourStep[step].target + " > span > span > button").click();
              break;
            case 12:
              document.querySelector(
                  "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button").
              click();
              break;
            case 13:
              document.querySelector(
                  "#inspire > div.application--wrap > nav > div > span:nth-child(6) > span > button",
              ).click();
              break;
          }
        } catch (e) {
          console.log(e);
        }
      },
      tourPreviousStep: function(step) {
        console.log(step);
        switch (step) {
          case 4:
            document.querySelector(
                "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button:nth-child(2)",
            ).click();
            break;
          case 6:
            document.querySelector(
                "#inspire > div.v-dialog__content.v-dialog__content--active > div > div.v-card.v-sheet.v-sheet--tile.theme--light.v-tour-highlight.v-tour-position > div.v-card__actions > span > button:nth-child(1)",
            ).click();
            break;
          case 8:
            document.querySelector(
                "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button:nth-child(2)",
            ).click();
            break;
          case 9:
            document.querySelector(this.tourStep[7].target + " > span > span > button").click();
            break;
          case 10:
            document.querySelector(
                "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button",
            ).click();
            break;
          case 11:
            document.querySelector(this.tourStep[9].target + " > span > span > button").click();
            break;
          case 12:
            document.querySelector(
                "#inspire > div.v-dialog__content.v-dialog__content--active > div > div > div.v-card__actions > button",
            ).click();
            break;
          case 13:
            document.querySelector(this.tourStep[11].target + " > span > span > button").click();
            break;
          case 14:
            this.$global.ui.rightDrawer();
            break;
        }
      },
      tourStop: function() {
        if (this.tourLang === "th") {
          this.endDialogTitle = TourSteps.endDialog.title.th;
          this.endDialogText = TourSteps.endDialog.content.th;
        } else {
          this.endDialogTitle = TourSteps.endDialog.title.en;
          this.endDialogText = TourSteps.endDialog.content.en;
        }
        this.$global.setting.firstUse = false;
        this.endDialog = true;
        this.$global.editor.mode = 1;
        this.$global.$emit("editor-mode-change", 1);
      },
    },
  };
  /*height:calc(100vh - 64px - 50px - 81px -23px); */
</script>
<style lang="stylus" scoped>
    .setting-fab
        top: 50% !important;
        right: 0;
        border-radius: 0

    .page-wrapper
        height: calc(100vh - 64px -23px);

    .v-footer {
        min-height: 10px !important;
    }

    .page-navigation-display {
        minWidth: 500px;
        width: 100%;
        height: 100%;
        background-color: #999;
    }

    .multiplate-warper {
        height: calc(100vh - 64px - 23px);
    }

    .multiplate-warper > .vertical-panes > .multipane-resizer {
        height: 100%;
        background: #BBB;
        width: 5px;
    }

    .multiplate-warper .multipane-resizer {
        height: 5px;
        top: 0px;
        margin: 0;
        left: 0; /* reset default styling */
        background: #BBB;
    }

    .vertical-panes {
        min-height: 200px;
        height: 65%;
    }

    .v-tabs {
        display: flex;
        flex-direction column;
        width : 100%;
    }

    .bottom-tab {
        display: flex;
        flex-grow: 1;
    }

    .close-tab-btn-control {
        margin-right: -5px;
    }

    .v-tabs__slider {
        height: 4px !important;
    }
</style>
<style>
    .v-window{
        display: flex;
        width : 100%;
        flex: 1 1 auto;
    }
    .v-window__container
    {
        display: flex;
        width : 100%;
    }
    .v-window-item
    {
        display: flex;
        width : 100%;
    }

    .v-step {
        z-index: 99999 !important;
    }

    .bottom-tab .v-tabs__container {
        height: 26px !important;
    }

    .v-tour-highlight {
        pointer-events: none !important;
    }
</style>
