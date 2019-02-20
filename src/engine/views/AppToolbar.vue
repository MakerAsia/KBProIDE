<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
  >

    <v-toolbar-title v-if="!$route.meta.hide_drawer" class="ml-0 pl-0">
      <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
    </v-toolbar-title>
    
    <img src="/static/trollface.jpg" height="48" alt="Problem? report me at fb.com/comdet" class="mr-3" style="border-radius: 5px;">
    
    
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
      <template v-for="(comp,index) in boardToolbar[packageName]">        
        <component v-if="packageInfo.loaded == true" :is="comp" :key="packageName+'.'+index"></component>
      </template>
    </template>

    <!-- TODO : enable this when toolbar > xxx -->
    <!--v-menu origin="left top" :nudge-bottom="10" transition="scale-transition" offset-y=""> 
          <v-btn slot="activator" color="warning" icon>
            <v-icon dark>fa-chevron-circle-down</v-icon>
          </v-btn>
    
          <v-list class="pa-0">
            <v-list-tile v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href" @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener" :key="index">
              <v-list-tile-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
    </v-menu-->


    <v-spacer></v-spacer>
    
    <template v-for="(comp,compName) in actionbar">
      <template v-for="(toobarTarget,tbName) in comp">
        <async-component :target="toobarTarget" :key="compName+'.'+tbName"/>
      </template>
    </template>

    <v-divider class="mx-1" inset vertical></v-divider>
    
    <!-- load board package actionbar -->
    <template v-for="(packageInfo,packageName) in $global.board.package">
      <template v-for="(comp,index) in boardActionbar[packageName]">        
        <component v-if="packageInfo.loaded == true" :is="comp" :key="packageName+'.'+index"></component>
      </template>
    </template>

    <v-divider class="mx-1" inset vertical></v-divider>

      <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn>
      <v-menu offset-y bottom left origin="top right" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="red" overlap>
          <span slot="badge">3</span>
          <v-icon medium>notifications</v-icon>
        </v-badge>
        </v-btn>
        <notification-list></notification-list>
      </v-menu>
  </v-toolbar>
</template>
<script>
import Vue from 'vue';
import NotificationList from '@/engine/views/widgets/list/NotificationList';
import util from '@/engine/utils';
import cm from '@/engine/ComponentManager';
import bm from '@/engine/BoardManager';
import AsyncComponent from '@/engine/AsyncComponent';

//var boardComponentData = util.vueRuntimeComponent('E:/Bloccoly/Research/KBProIDE/boards/kidbright/package/actionbar/ActionbarNewfile.vue');
//var componentRegisterName = 'actionbar-newfile-1';
//Vue.extend(boardComponentData);
//var vv = util.requireFunc('E:/Bloccoly/Research/others/vuetify-table-master/dist/vuetify-table.umd.js');
//Vue.use(vv);

export default {  
  name: 'app-toolbar',
  components: {
    NotificationList,
    AsyncComponent
  },
  data: () => ({
    boardActionbar : bm.listActionbar(Vue.prototype.$global.board.board),
    boardToolbar : bm.listToolbar(Vue.prototype.$global.board.board),
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
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      util.toggleFullScreen();
    }
  }
};
</script>
