<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    height="64px"
  >

    <v-toolbar-title v-if="!$route.meta.hide_drawer" class="ml-0 pl-0">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img v-on="on" src="/static/logo/KBIDE.png" height="45"
             alt="Problem? report me at fb.com/comdet"
             class="mr-3"
             style="border-radius: 8px; background-color: #ffffffa8; //margin-top: 4px;">
      </template>
      <span>KBIDE by MakerAsia</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <img v-on="on" src="/static/logo/kidcom_128.png" height="45"
             alt="KidBright Community"
             class="mr-2"
             style="border-radius: 8px; background-color: rgba(255, 255, 255, 0.8); //margin-top: 4px;">
      </template>
      <span>KidBright Community</span>
    </v-tooltip>


    <!-- dynamic left toolbar -->
    <template v-for="(comp,compName) in toolbars">
      <template v-for="(toobarTarget,tbName) in comp">
        <async-component :target="toobarTarget" :key="compName+'.'+tbName"/>
      </template>
    </template>

    <!--toolbar-mode/>
    <toolbar-board/>
    <toolbar-plugin/>
    <toolbar-example/>
    <toolbar-setting/-->
    <!-- dynamic left toolbar -->

    <!-- load board package toolbar -->
    <v-divider class="mx-1" inset vertical></v-divider>
    <template v-for="(comp,index) in toolbarComp">
      <component :is="comp.comp" :key="comp.name+'.'+index"></component>
    </template>

    <v-spacer></v-spacer>

    <template v-for="(comp,compName) in actionbar">
      <template v-for="(toobarTarget,tbName) in comp">
        <async-component :target="toobarTarget" :key="compName+'.'+tbName"/>
      </template>
    </template>

    <!--actionbar-new-file/>
    <actionbar-open-file/>
    <actionbar-save-file/>
    <actionbar-serial/-->

    <v-divider class="mx-1" inset vertical></v-divider>

    <!-- load board package actionbar -->

    <template v-for="(comp,index) in actionbarComp">
      <template v-for="(compName,index) in comp.comp">
        <component v-if="comp.info.loaded === true" :is="compName" :key="comp.name+'.'+index"></component>
      </template>
    </template>

    <v-divider class="mx-1" inset vertical></v-divider>

    <v-btn icon @click="handleFullScreen()">
      <v-icon>fullscreen</v-icon>
    </v-btn>
    <notification></notification>
  </v-toolbar>
</template>
<script>
import Vue from 'vue';
import util from '@/engine/utils';
import cm from '@/engine/ComponentManager';
import bm from '@/engine/BoardManager';
//import AsyncComponent from '@/engine/AsyncComponent';
//import notification from '@/engine/views/Notification';

//var boardComponentData = util.vueRuntimeComponent('E:/Bloccoly/Research/KBProIDE/boards/kidbright/package/actionbar/ActionbarNewfile.vue');
//var componentRegisterName = 'actionbar-newfile-1';
//Vue.extend(boardComponentData);
//var vv = util.requireFunc('E:/Bloccoly/Research/others/vuetify-table-master/dist/vuetify-table.umd.js');
//Vue.use(vv);
let mother = null;
export default {
  name: 'app-toolbar',
  components: {
    notification : ()=> import("@/engine/views/Notification"),
    AsyncComponent : ()=> import("@/engine/AsyncComponent"),
    //--- fixed toolbar ---//
    /*ToolbarMode : ()=> import("@/engine/components/editor/ToolbarMode"),
    ToolbarBoard : ()=> import("@/engine/components/board_selector/ToolbarBoard"),
    ToolbarPlugin : ()=> import("@/engine/components/plugin/ToolbarPlugin"),
    ToolbarExample : ()=> import("@/engine/components/examples/ToolbarExample"),
    ToolbarSetting : ()=> import("@/engine/components/setting/ToolbarSetting"),
    //--- fixed actionbar ---//
    ActionbarNewFile : ()=> import("@/engine/components/editor/ActionbarNewFile"),
    ActionbarOpenFile : ()=> import("@/engine/components/editor/ActionbarOpenFile"),
    ActionbarSaveFile : ()=> import("@/engine/components/editor/ActionbarSaveFile"),
    ActionbarSerial : ()=> import("@/engine/components/serial_monitor/ActionbarSerial")*/
  },
  data:() => ({
    toolbars : cm.listToolbar,
    actionbar :cm.listActionbar,
    toolbarComp : [],
    actionbarComp : [],
  }),
  mounted(){

  },
  created(){
    mother = this;
    this.processToolbar();
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      util.toggleFullScreen();
    },
    processToolbar : async function(){
      let compActionbar = [];
      let compToolbar = [];

      let boardActionBar = await bm.listActionbar(mother.$global.board.board);
      let boardToolbar = await bm.listToolbar(mother.$global.board.board);

      for(let packageName in mother.$global.board.package){
        compActionbar.push({info : mother.$global.board.package[packageName], name : packageName, comp : boardActionBar[packageName]});
        compToolbar.push({info : mother.$global.board.package[packageName], name : packageName,comp : boardToolbar[packageName] });
      }
      mother.toolbarComp = compToolbar;
      mother.actionbarComp = compActionbar;
    }
  },
  watch:{
    "$global.board.package" : async m =>{
      await mother.processToolbar();
    }
  }
};
</script>
