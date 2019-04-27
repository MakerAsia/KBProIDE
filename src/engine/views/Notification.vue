<template>
<div></div>
<!--
    <v-menu offset-y bottom left origin="top right" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
            <v-badge color="red" overlap>
                <span v-if="badge > 0" slot="badge">{{badge}}</span>
                <v-icon medium>notifications</v-icon>
            </v-badge>
        </v-btn>

        <template>
            <v-card class="elevation-0">
                <v-toolbar card dense color="transparent">
                    <v-toolbar-title><h4>Notification</h4></v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                    <v-list two-line class="pa-0">
                        <template v-for="(item, index) in items">
                            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>                            
                            <v-list-tile avatar :key="item.title" @click="handleClick">
                                <v-list-tile-avatar :color="item.color">
                                    <v-icon dark>{{item.icon}}</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action class="caption">
                                    {{item.timeLabel}}
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider :key="index" inset></v-divider>
                        </template>
                    </v-list>
                </v-card-text>

                <v-card-text class="pa-0">
                    <v-list two-line class="pa-0">
                        <template v-for="(item, index) in items">
                            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>                            
                            <v-list-tile avatar :key="item.title" @click="handleClick">
                                <v-list-tile-avatar :color="item.color">
                                    <v-icon dark>{{item.icon}}</v-icon>
                                </v-list-tile-avatar>
                                <v-list-tile-content>
                                    <v-list-tile-sub-title v-html="item.title"></v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action class="caption">
                                    {{item.timeLabel}}
                                </v-list-tile-action>
                            </v-list-tile>
                            <v-divider :key="index" inset></v-divider>
                        </template>
                    </v-list>
                </v-card-text>
            </v-card>
        </template>

    </v-menu>
-->   
</template>
<script>
const fs = require('fs');

import VWidget from '@/engine/views/VWidget';
import util from '@/engine/utils';

export default {
    name: 'notification',
    components: {
        VWidget
    },
    data () {
        return {
            badge : 0,
            items : [{
                title: 'New version released 1.0.1',
                color: 'light-green',
                icon: 'fa-new',
            },
            {
                title: 'New message from Michael',
                color: 'red',
                icon: 'email',
                timeLabel: '1 hour ago'
            }],
            isInstalling : false,
            onlineStatus : 'wait',
            tobeinstall : '',
            statusText : '',
            statusProgress : 0,
        }
    },
    methods:{
        isOnline()
        {
            return window.navigator.onLine;
        },
        handleClick()
        {

        }
    },
    mounted(){
        
    },
    destroyed() {

    },
    watch : {
        /*pluginDialog : function(val){
            if(val){//on opening
                this.listOnlinePlugin();
            }
        }*/
    }
}
</script>