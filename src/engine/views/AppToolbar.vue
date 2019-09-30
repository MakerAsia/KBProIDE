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
    <!-- dynamic left toolbar -->

    <!-- load board package toolbar -->
    <v-divider class="mx-1" inset vertical></v-divider>
    <template v-for="(packageInfo,packageName) in $global.board.package">
      <template v-for="(comp,index) in (boardToolbar())[packageName]">
        <component v-if="packageInfo.loaded == true" :is="comp" :key="packageName+'.'+index"></component>
      </template>
    </template>

    <v-spacer></v-spacer>

    <template v-for="(comp,compName) in actionbar">
      <template v-for="(toobarTarget,tbName) in comp">
        <async-component :target="toobarTarget" :key="compName+'.'+tbName"/>
      </template>
    </template>

    <v-divider class="mx-1" inset vertical></v-divider>

    <!-- load board package actionbar -->
    <template v-for="(packageInfo,packageName) in $global.board.package">
      <template v-for="(comp,index) in (boardActionbar())[packageName]">
        <component v-if="packageInfo.loaded == true" :is="comp" :key="packageName+'.'+index"></component>
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
import AsyncComponent from '@/engine/AsyncComponent';
import notification from '@/engine/views/Notification';

//var boardComponentData = util.vueRuntimeComponent('E:/Bloccoly/Research/KBProIDE/boards/kidbright/package/actionbar/ActionbarNewfile.vue');
//var componentRegisterName = 'actionbar-newfile-1';
//Vue.extend(boardComponentData);
//var vv = util.requireFunc('E:/Bloccoly/Research/others/vuetify-table-master/dist/vuetify-table.umd.js');
//Vue.use(vv);

export default {
  name: 'app-toolbar',
  components: {
    notification,
    AsyncComponent
  },
  data: () => ({
    toolbars : cm.listToolbar,
    actionbar : cm.listActionbar,
  }),
  created(){

  },
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    }
  },
  methods: {
    boardToolbar(){
      return bm.listToolbar(this.$global.board.board);
    },
    boardActionbar(){
      return bm.listActionbar(this.$global.board.board);
    },
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      util.toggleFullScreen();
    }
  }
};
</script>
