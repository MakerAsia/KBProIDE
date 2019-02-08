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
  <template v-for="(comp,compName) in components">
    <template v-for="(toobarTarget,tbName) in comp">
      <dynamic-link :key="compName+'.'+tbName" :name="compName" :target="toobarTarget" />
    </template>
  </template>
  <!-- dynamic left toolbar -->
  
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
    

    <v-tooltip bottom>
      <v-btn color="primary darken-2" slot="activator" icon>
        <v-icon dark>fa-file-o</v-icon>      
      </v-btn>
      <span>New file</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-btn color="info" slot="activator" icon>
        <v-icon dark>fa-file-o</v-icon>      
      </v-btn>
      <span>New file</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-btn color="info" slot="activator" icon>
        <v-icon dark>fa-file-o</v-icon>      
      </v-btn>
      <span>New file</span>
    </v-tooltip>

    <v-tooltip bottom>
      <v-btn color="info" slot="activator" icon>
        <v-icon dark>fa-file-o</v-icon>      
      </v-btn>
      <span>New file</span>
    </v-tooltip>    

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
import NotificationList from '@/engine/views/widgets/list/NotificationList';
import utils from '@/engine/utils';
import cm from '@/engine/ComponentManager';
import DynamicLink from '@/engine/DynamicLink.vue';

export default {  
  name: 'app-toolbar',
  components: {
    NotificationList,
    DynamicLink
  },
  data: () => ({
    components : cm.listToolbar,
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ],
  }),
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
      utils.toggleFullScreen();
    }
  }
};
</script>
