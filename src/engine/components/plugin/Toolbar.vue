<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="pluginDialog = !pluginDialog"> 
                <v-icon dark>fa-plug</v-icon>
            </v-btn>
            <span>Plugin Manager</span>
        </v-tooltip>
        <v-dialog v-model="packageDialog" max-width="70%" max-height="80%" scrollable persistent>            
            <v-card>
                <v-card-title>
                    <span class="headline">Plugin Manager</span>
                    <v-spacer class="hidden-xs-only"></v-spacer>
                     <v-text-field
                        prepend-icon="search"
                        label="plugin name"
                        class="ma-0 pa-0 search-board"
                        single-line
                        clearable
                        hide-details
                        :append-outer-icon="searchText ? 'fa-chevron-circle-right' : ''"                        
                        v-model="searchText"></v-text-field>                    
                </v-card-title>
                <v-divider></v-divider>
                <smooth-scrollbar>
                    <v-card-text>
                        <v-subheader>
                            Installed
                        </v-subheader>
                        <div>
                            
                        </div>

                        <v-divider></v-divider>

                        <v-subheader>
                            Online available
                        </v-subheader>

                        <div>
                            <v-list three-line>

                                <template v-for="(item, index) in items">

                                    <v-divider :key="index" inset></v-divider>
                        
                                    <v-list-tile
                                        :key="item.title"
                                        avatar
                                        class="list-title"
                                    >
                                        <v-list-tile-avatar>
                                            <img :src="item.avatar">
                                        </v-list-tile-avatar>
                        
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                            <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                                        </v-list-tile-content>
                                        
                                        <v-list-tile-action>                  
                                            <v-btn
                                                icon fab small dark
                                                class="primary"                                                    
                                                @click="tobeinstall = '123456'; confirmInstallDialog = true"
                                            >
                                                <v-icon>fa-download</v-icon>
                                            </v-btn>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                
                                </template>
                            </v-list>
                        </div>

                    </v-card-text>
                </smooth-scrollbar>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="packageDialog = false">Close</v-btn>                    
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="confirmRemoveDialog" persistent max-width="500px">
            <v-card>
                <v-card-title class="headline">Remove plugin confirmation</v-card-title>
                <v-card-text>Do you want to remove <strong>{{toberemove}}</strong>?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="green--text darken-1" flat="flat" @click.native="confirmRemoveDialog = false">Cancel</v-btn>
                <v-btn class="green--text darken-1" flat="flat" @click.native="confirmRemoveDialog = false">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="confirmInstallDialog" persistent max-width='500px'>
            <v-card>
                <v-card-title class="headline">Install plugin confirmation</v-card-title>
                <v-card-text>Do you want to install <strong>{{tobeinstall}}</strong>?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="green--text darken-1" flat="flat" @click.native="confirmInstallDialog = false">Cancel</v-btn>
                <v-btn class="green--text darken-1" flat="flat" @click.native="confirmInstallDialog = false;">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

const { shell } = require('electron');
const fs = require('fs');

import SmoothScrollbar from '@/engine/views/widgets/list/SmoothScrollbar'
import VWidget from '@/engine/views/VWidget';
import pm from '@/engine/PackageManager';
import util from '@/engine/utils';
import pm from '@/engine/PluginManager';

export default {
    components: {
        VWidget
    },
    data () {
        return {    
            items: [
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                },
                { divider: true, inset: true },                
            ],
            pluginDialog : false,
            confirmRemoveDialog : false,
            confirmInstallDialog : false,
            searchText : '', 
            isInstalling : false,
            
            installedPlugin : null,//bm.boards().map(obj=>{ obj.status =  'READY'; return obj;}),
            localPlugin : null,//bm.boards().map(obj=>{ obj.status =  'READY'; return obj;}),
            onlinePluginStatus : 'wait',
            onlinePluginPage : 0,
            onlinePlugin : [],
            tobeinstall : '',
            toberemove : '',
            statusText : '',
            statusProgress : 0,
        }
    },
    methods:{
        getPluginByName(name){
            return this.installedPlugin.find(obj => { return obj.name == name});
        },
        getOnlinePluginByName(name){
            return this.onlinePlugin.find(obj=>{ return obj.name == name});
        },
        openLink(url){
            shell.openExternal(url);
        },
        isOnline()
        {
            return window.navigator.onLine;
        },
        listAllPlugins(name = ''){            
            this.listOnlinePlugin(name);
            this.listLocalPlugin(name);
        },
        listOnlinePlugin(name = ''){
            this.onlinePluginStatus = 'wait';
            pm.listOnlinePlugin(name).then(res=>{                
                //name,start return {end : lastVisible, plugins : onlinePlugins}
                this.onlinePluginPage = res.end;
                this.onlinePlugin = res.plugins.map(obj=>{ obj.status =  'READY'; return obj;});
                this.onlinePluginStatus = 'OK';
            }).catch(err=>{
                this.onlinePluginStatus = 'ERROR';
            });
        },
        listLocalPlugin(name = ''){
            if(name != ''){
                this.localPlugin = this.installedPlugin.filter(obj=> {return obj.name.startsWith(name)});
            }else{
                this.localPlugin = this.installedPlugin;
            }
        },
        installOnlinePlugin(name){
            let b = this.getOnlinePluginByName(name);
            b.status='DOWNLOAD';
            this.statusText = "Downloading";
            this.statusProgress = 0;
            /*pm.installBoardByName(name,progress => {
                //{process : 'board', status : 'DOWNLOAD', state:state }
                if(progress.status == 'DOWNLOAD'){ //when download just show to text
                    this.statusText = 
                        `Downloading ... ${util.humanFileSize(progress.state.size.transferred)} at ${(progress.state.speed/1000.0/1000.0).toFixed(2)}Mbps`; 
                }else if(progress.status == 'UNZIP'){
                    b.status = 'UNZIP';
                    this.statusText = `Unzip file ${progress.state.percentage}%`;
                    this.statusProgress = progress.state.percentage;
                }
            }).then(()=>{ //install success
                b.status = 'INSTALLED';
                this.statusText = '';                
                this.localBoards.push(b);
            }).catch(err=>{
                this.statusText = `Error : ${err}`;
                b.status = 'ERROR';
                setTimeout(() => {
                    b.status = 'READY';
                    this.statusText = '';
                }, 5000);
            })*/
        }
    },
    mounted(){
        
    },
    destroyed() {

    },
    watch : {
        pluginDialog : function(val){
            if(val){//on opening
                //this.listOnlineBoard();
            }
        }
    }
}
</script>
<style>
.list-title {
    background-color: white !important;
}
.list-title:hover {
    background: #EEE !important;
}
.text-info-status{
    position: absolute;
    font-size: 12px;
    right: 0px;
    background-color: white;
    margin: 0;
    margin-right: 10px;
    bottom: 2px;
    z-index: 999;
}
.search-board {
    width: 40px;
    margin-bottom: -10px !important;
}
.v-expansion-panel{
    box-shadow: unset !important;
}
.v-expansion-panel__header{
    padding-top:0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    min-height: unset !important;
}
.board-desc-text{
    cursor: pointer;
    max-height: 42px;
    min-height: 42px;
    transition: max-height 0.2s ease-out;
    overflow: hidden;
    padding-right : 25px;
}
.board-desc-text-more{
    transition: max-height 0.5s ease-in;
    max-height: 200px;
}
.board-desc-text-more > .board-desc-more{
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
}
.board-desc-more{
    position: absolute;
    bottom: 80px;
    right: 15px;    
    overflow: hidden;
    transition-duration: 0.8s;
    transition-property: transform;
    pointer-events:none;
}
.board-desc-icon{
    margin-left: 5px;
}
.board-image{
    display: block;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    line-height: 0;
    height: 150px;
}
.selected-board-icon{
    top: 0;
    width: 130px;
    height: 130px;
    padding-top: 0px;
    padding-right: 0px;
    right: 0;
    position: absolute;
}
.corner-select{
    border-top :130px solid rgba(0,0,0,0.6);
    border-left : 130px solid transparent;
    height : 0px;
    width: 0px;
    position: absolute;
}
.corner-icon{
    position: absolute;
    right: 5px;
    top : 5px;
    z-index: 1;
    text-shadow: 1px 1px 5px #000;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
