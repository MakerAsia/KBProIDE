<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="packageDialog = !packageDialog"> 
                <v-icon dark>fa-plug</v-icon>
            </v-btn>
            <span>Plugin Manager</span>
        </v-tooltip>
        <v-dialog v-model="packageDialog" max-width="70%" max-height="81%" scrollable persistent>            
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
                 <div ref="scrollArea" class="smooth-scrollbar">
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
              <v-subheader
                v-if="item.header"
                :key="item.header"
              >
                {{ item.header }}
              </v-subheader>
  
              <v-divider
                v-else-if="item.divider"
                :key="index"
                :inset="item.inset"
              ></v-divider>
  
              <v-list-tile
                v-else
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
                </div>
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

import SmoothScrollbar from 'smooth-scrollbar'
const pg = require('smooth-scrollbar/plugins/overscroll');

let scrollbar;

import VWidget from '@/engine/views/VWidget';
import pm from '@/engine/PackageManager';
import util from '@/engine/utils';

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
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                }
            ],
            packageDialog : false,
            confirmRemoveDialog : false,
            confirmInstallDialog : false,
            searchText : '', 
            scrollSettings: {
                alwaysShowTracks: false,
                plugins: {
                    overscroll : { 
                        enable: true,
                        effect: 'glow',
                        damping: 0.1,
                        maxOverscroll: 150,
                        glowColor: '#222a2d'
                    }
                },
            },
            isInstalling : false,

            installedPackage : null,//bm.boards().map(obj=>{ obj.status =  'READY'; return obj;}),
            localPackage : null,//bm.boards().map(obj=>{ obj.status =  'READY'; return obj;}),
            onlinePackageStatus : 'wait',
            onlinePackagePage : 0,
            onlinePackages : [],
            tobeinstall : '',
            toberemove : '',
            statusText : '',
            statusProgress : 0,

            scrollbar: null,
        }
    },
    methods:{        
        getPackageByName(name){
            return this.installedPackage.find(obj => { return obj.name == name});
        },
        getOnlinePackageByName(name){
            return this.onlinePackages.find(obj=>{ return obj.name == name});
        },
        openLink(url){
            shell.openExternal(url);
        },
        isOnline()
        {
            return window.navigator.onLine;
        },       
    },
    mounted(){
        let option = {
            damping: 0.1,
            thumbMinSize: 20,
            renderByPixels: true,
            alwaysShowTracks: false,
            continuousScrolling: true,
            delegateTo: null,
            plugins: {}
        }
        scrollbar = SmoothScrollbar.init(
            this.$refs.scrollArea,
            Object.assign({},{}, option, this.scrollSettings)
        )
        this.scrollbar = scrollbar;
    },
    destroyed() {
      scrollbar.destroy()
      scrollbar = null
      this.scrollbar = null
    },
    watch : {
        packageDialog : function(val){
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

.smooth-scrollbar {
  width: 100%;
  height: 100%;
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
