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

    <!-- app updater -->
    <v-dialog v-model="updateDialog" scrollable persistent max-width="500px">
      <v-card>
          <v-card-title>
            <span class="headline">New version found!</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <template v-if="updateStatus == 'UPDATING'">
              <div class="text-xs-center mt-3">
              <v-progress-circular
                :rotate="360"
                :size="200"
                :width="30"
                :value="updateValue"
                :indeterminate="updateValue < 0"
                color="teal"
              >
                {{ updateValue }} %
              </v-progress-circular>  
              </div>
              <div class="text-xs-center mt-4">
              <span>{{updateText}}</span>
              </div>
            </template>
            <template v-else-if="updateStatus == 'ERROR'">
              <div class="text-xs-center mt-3">
                <v-icon :size="200" color="red">fa-exclamation-triangle</v-icon>
              </div> 
            </template>
            <template v-else>
              <p v-html="update.info"></p>
            </template>
          </v-card-text>
          <v-card-actions v-if="updateStatus != 'UPDATING'">
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn color="blue darken-1" flat v-on="on" @click="ignoreUpdate(update.version)">Ignore this version</v-btn>
              </template>
              <span>Ignore this version but you can manually update by click 'help -> Update' on menubar</span>
            </v-tooltip>
            <v-btn color="blue darken-1" flat @click="updateDialog = false">Next time</v-btn>
            <v-btn color="primary" @click="updateApp">Update Now!</v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end update -->
  </div>
</template>
<script>
import Vue from "vue";
import AppToolbar from '@/engine/views/AppToolbar';
import AppFooter from '@/engine/views/AppFooter';
import { Multipane, MultipaneResizer } from 'vue-multipane';
import draggable from 'vuedraggable'
//========= load manager ==========//
import bm from '@/engine/BoardManager';
import AsyncComponent from '@/engine/AsyncComponent';
import AppEvents from  './event';
import util from '@/engine/utils';
import { stat } from 'fs';
import { spread } from 'q';
//========= updating =========//
const EAU = require('electron-asar-hot-updater');
const electron = require('electron');

export default {
  components: {
    AppToolbar,
    Multipane,
    draggable,
    MultipaneResizer,
    AsyncComponent,
    AppFooter
  },
  data: () => ({        
    expanded: true,
    updateDialog : false,
    update : {
      info:'',
      version:'',
    },
    updateStatus : 'IDLE',
    updateValue : 0,
    updateText : '',
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
    this.checkUpdate();
    this.$global.$on('check-update',this.checkUpdate);
    electron.ipcRenderer.on('help-update',()=>
    {
      window.getApp.$dialog.notify.info('Checking new update'); 
      this.checkUpdate(true,true); 
    });
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
    checkUpdate(showNotification = true,forceShowUpdate = false){
      this.$db.collection('apps').get().then(appData =>{    
        if(appData.size == 1){
          let data = appData.docs[0].data();
          this.update = data;
          //this.updateDialog = true;
          EAU.init({
            'server': false, // Where to check. true: server side, false: client side, default: true.
            'debug': false // Default: false.
          });
          EAU.process(data,function (error, last, body) {
            if(!error){
              if(window.getApp.$global.setting.ignoreUpdateVersion == last && forceShowUpdate == false){
                console.log('User ignored update popup');
                return false
              }
              window.getApp.updateDialog = true;
            }else if (error === 'no_update_available') { 
              if(showNotification){
                window.getApp.$dialog.notify.info('This is newest version');
              }
              return false;
            }else{
              window.getApp.$dialog.notify.error('check version error : ' + error);
              return false;
            }
          });
        }
      });
    },
    ignoreUpdate(version){
      this.$global.setting.ignoreUpdateVersion = version;
      this.updateDialog = false;
    },
    updateApp(){
      this.updateStatus = 'UPDATING';
      this.updateText = 'Downloading ... ';
      EAU.progress(function(state){
        if(state.size.total){
          window.getApp.updateValue = Math.round(state.percent * 100);
          window.getApp.updateText = `Downloading ${util.humanFileSize(state.size.transferred)} of ${util.humanFileSize(state.size.total)}, speed : ${util.humanFileSize(state.speed)}/s`; 
        }else{
          window.getApp.updateText = `Downloading ${util.humanFileSize(state.size.transferred)} , speed : ${util.humanFileSize(speed)}/s`; 
        }
      });
      /*EAU.progress(function (state) {
        // The state is an object that looks like this:
        // {
        //     percent: 0.5,           
        //     speed: 554732,
        //     size: {
        //         total: 90044871,        
        //         transferred: 27610959   
        //     },
        //     time: {
        //         elapsed: 36.235,        
        //         remaining: 81.403       
        //     }
        // }
      })*/

      EAU.download(function (error) {
        if (error) {
          window.getApp.updateStatus = 'ERROR';
          window.getApp.updateText = error;
          setTimeout(()=>{
            window.getApp.updateStatus = 'IDLE';
          },2000);
          return false;
        }
        //
        console.log('Update success');
        window.getApp.updateText = "Restarting ...";
        setTimeout(()=>{
          electron.remote.app.relaunch();
          electron.remote.app.exit(0);
        },2000);
      })
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
