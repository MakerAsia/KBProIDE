<template>
    <v-menu offset-y bottom left origin="top right" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
            <v-badge color="red" overlap>
                <span slot="badge">3</span>
                <v-icon medium>notifications</v-icon>
            </v-badge>
        </v-btn>
        <notification-list></notification-list>
    </v-menu>
</template>

<script>
const fs = require('fs');

import VWidget from '@/engine/views/VWidget';
import util from '@/engine/utils';

export default {
    name: 'update-notification',
    components: {
        VWidget
    },
    data () {
        return {
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