<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="inspire" class="app">             
        <app-toolbar class="app--toolbar"></app-toolbar>
        <v-content>
          <!-- Page Header -->
          <div class="page-wrapper">
            <!-- screen divider (into 3 section page,rightTab,bottomTab) -->
            <multipane class="multiplate-warper" layout="horizontal" @paneResizeStop="onResizePanel">
              <!-- upper pane -->
              <multipane class="vertical-panes" layout="vertical" @paneResizeStop="onResizePanel" :style="[$global.ui.bottomTab.length > 0 ? {} : {'width':'100%', 'height' :'100%'}]">
                  <!-- left page -->
                  <div class="page-navigation-display" :style="[$global.ui.rightTab.length > 0 ? {'display' : 'block'} : {'width':'100%', 'height' :'100%','display' : 'block'}]">
                    <router-view></router-view>
                  </div>
                  <!-- end -->
                  <multipane-resizer v-if="$global.ui.rightTab.length > 0"></multipane-resizer>
                  <!--right tab -->
                  <div class="pane" :style="[{ flexGrow: 1 }, ($global.ui.rightTab.length > 0 ? ({'min-width':'20%','display' : 'block'}) : ({'display' : 'none'}))]">
                    
                    <v-tabs color="primary" v-model="$global.ui.rightTabModel" dark slider-color="yellow" ref="rtabs">
                      <draggable v-model="$global.ui.rightTab" class="v-tabs__container" :options="{group: 'tab-group'}">
                        <!-- tab header -->
                        <v-tab v-for="(tab, index) in $global.ui.rightTab" :key="index" :href="`#rtab-${tab.name}`">
                          {{ tab.title }}
                          <v-btn icon small class="close-tab-btn-control" @click="closeTab(tab.name)">
                            <v-icon dark>fa-close</v-icon>
                          </v-btn>
                        </v-tab>
                        <!-- end -->
                      </draggable>
                      <!-- tab body -->
                      <v-tab-item v-for="(tab, index) in $global.ui.rightTab" :key="`rtab-${tab.name}`" :value="`rtab-${tab.name}`">                        
                        <async-component :target="tab.component" :key='index'/>
                      </v-tab-item>
                      <!-- end -->
                    </v-tabs>

                  </div>
                  
              </multipane>

              <multipane-resizer v-if="$global.ui.bottomTab.length > 0"></multipane-resizer>

              <!--lower pane -->
              <div :style="[{ flexGrow: 1 }, ($global.ui.rightTab.length > 0 ? ({'min-width':'15%'}) : ({}))]" v-if="$global.ui.bottomTab.length > 0">
                  <v-tabs color="primary" v-model="bottomTabModel" dark slider-color="yellow">
                      <draggable v-model="$global.ui.bottomTab" class="v-tabs__container" :options="{group: 'tab-group'}">
                        <!-- tab header -->  
                        <v-tab v-for="(tab, index) in $global.ui.bottomTab" :key="index" :href="`#btab-${tab.name}`">
                          {{ tab.title }}
                          <v-btn icon small class="close-tab-btn-control" @click="closeTab(tab.name)">
                            <v-icon dark>fa-close</v-icon>
                          </v-btn>
                        </v-tab>
                        <!-- end -->
                      </draggable>
                      <!-- tab body -->
                      <v-tab-item v-for="(tab, index) in $global.ui.bottomTab" :key="`btab-${tab.name}`" :value="`btab-${tab.name}`">                        
                        <async-component :target="tab.component" :key='index'/>
                      </v-tab-item>
                      <!-- end -->
                  </v-tabs>
              </div>
          </multipane>
          </div>
          <app-footer></app-footer>
        </v-content>
        <!-- left drawer -->
        <v-navigation-drawer class="setting-drawer" temporary left hide-overlay fixed v-model="$global.ui.leftDrawerComponent">
          <async-component :target="$global.ui.leftDrawerComponent"/>
        </v-navigation-drawer>
        <!-- right drawer -->        
        <v-navigation-drawer class="setting-drawer" temporary right hide-overlay fixed v-model="$global.ui.rightDrawerComponent">          
          <async-component :target="$global.ui.rightDrawerComponent"/>
        </v-navigation-drawer>        
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
      :timeout="$global.ui.snackbarConfig.timeout"
      :color="$global.ui.snackbarConfig.color"
      :top="$global.ui.snackbarConfig.y === 'top'"
      :bottom="$global.ui.snackbarConfig.y === 'bottom'"
      :right="$global.ui.snackbarConfig.x === 'right'"
      :left="$global.ui.snackbarConfig.x === 'left'"
      :multi-line="$global.ui.snackbarConfig.mode === 'multi-line'"
      :vertical="$global.ui.snackbarConfig.mode === 'vertical'"
      v-model="$global.ui.snackbarStatus"
    >
      {{ $global.ui.snackbarConfig.text }}
      <v-btn flat icon dark @click.native="$global.ui.snackbarStatus = false"><v-icon>close</v-icon></v-btn>
    </v-snackbar>
    <app-updater></app-updater>
  </div>
</template>
<script>
import Vue from "vue";
import AppToolbar from '@/engine/views/AppToolbar';
import AppFooter from '@/engine/views/AppFooter';
import { Multipane, MultipaneResizer } from 'vue-multipane';
import draggable from 'vuedraggable'

const electron = require('electron');
//========= load manager ==========//
import bm from '@/engine/BoardManager';
import AsyncComponent from '@/engine/AsyncComponent';
import AppEvents from  './event';
import util from '@/engine/utils';
import { stat } from 'fs';
import { spread } from 'q';
//========= updating =========//
import AppUpdater from '@/engine/updater/AppUpdater';

export default {
  components: {
    AppToolbar,
    Multipane,
    draggable,
    MultipaneResizer,
    AsyncComponent,
    AppFooter,
    AppUpdater
  },
  data: () => ({        
    expanded: true,
  }),
  computed: {

  },
  created () {
    AppEvents.forEach(item => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
    //======== INIT ========//
    //----- load color -----//
    this.$vuetify.theme.primary = this.$global.setting.color;
    //----- load external plugin -----//    
    this.reloadBoardPackage();
    this.$global.$on('board-change',this.reloadBoardPackage);
    //----- check for update -----//
    this.$global.$on('check-update',this.checkUpdate);
    electron.ipcRenderer.on('file-board-folder',()=>
    {
      electron.shell.openItem(util.boardDir);
    });
    electron.ipcRenderer.on('file-platform-folder',()=>
    {
       electron.shell.openItem(util.platformDir);
    });
    electron.ipcRenderer.on('file-plugin-folder',()=>
    {
       electron.shell.openItem(util.boardDir+'/'+window.getApp.$global.board.board+'/plugin');
    });
  },
  methods: {
    closeTab(name){
      this.$global.ui.removeAllTab(name);
    },
    reloadBoardPackage(){
      var boardName = this.$global.board.board;
      var boardPackage = bm.packages(boardName);
      console.log('--------- bp ---------');
      console.log(boardPackage);
      
      var bp = {};
      // re-assign package to board      
      Object.keys(boardPackage).forEach(packageName => {
        bp[packageName] = {};
        let boardPackageData = util.loadCofigComponents(boardPackage[packageName].config,'board.package.'+packageName);
        bp[packageName] = boardPackageData.data;        
      });

      Object.keys(boardPackage).forEach((packageName,index,arr) => {                
        let targetJsFile = boardPackage[packageName].js;
        let targetLinkFile = `file:///${targetJsFile}`;        
        if(util.fs.existsSync(targetJsFile)){
          let script = document.createElement('script');
          script.setAttribute('src',targetLinkFile);
          script.onload = function(){
            if(packageName in window){
              Vue.use(window[packageName]);
              bp[packageName].loaded = true;
              console.log(`board [${boardName}] loaded package : ${packageName}`);
              if(index === arr.length -1){
                Vue.prototype.$global.board.package = bp;
              }
            }
          }
          document.head.appendChild(script);
        }
      });
    },
    onResizePanel(pane,container,size){    
      this.$global.$emit('panel-resize',size);
      if(this.$refs.rtabs){
        this.$refs.rtabs.onResize();
      }
    },
  },
};
/*height:calc(100vh - 64px - 50px - 81px -23px); */
</script>
<style lang="stylus" scoped>
  .setting-fab 
    top:50%!important; 
    right:0;
    border-radius:0  
  .page-wrapper
    height:calc(100vh - 64px -23px);
  .v-footer{
    min-height :10px !important;
  }
  .page-navigation-display {
    minWidth: 500px;
    width: 100%;
    height:100%;
    background-color : #999;
  }
  .multiplate-warper{    
    height:calc(100vh - 64px - 23px);
  }
  .multiplate-warper > .vertical-panes >.multipane-resizer {
    height :100%;
    background: #BBB;
    width :5px;
  }
  .multiplate-warper .multipane-resizer {
    height : 5px;
    top:0px;
    margin: 0; left: 0; /* reset default styling */
    background: #BBB;
  }
  .vertical-panes{
    min-height : 400px;
    height: 75%;    
  }  
  .v-tabs{
    height: 100%;
  }
  .close-tab-btn-control{
    margin-right:-5px;
  }
  .v-tabs__slider {
    height: 4px !important;    
  }
</style>
