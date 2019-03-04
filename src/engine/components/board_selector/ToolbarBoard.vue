<template>
    <div>    
        <v-tooltip bottom>            
            <v-btn color="primary darken-2" slot="activator" icon @click="boardDialog = !boardDialog"> 
                <v-icon dark>fa-microchip</v-icon>
            </v-btn>
            <span>Board Manager</span>
        </v-tooltip>
        <v-dialog v-model="boardDialog" max-width="80%" max-height="80%" scrollable>            
            <v-card>
                <v-card-title>
                    <span class="headline">Select board : {{getBoardByName(this.$global.board.board).title}}</span>
                    <v-spacer class="hidden-xs-only"></v-spacer>
                     <v-text-field 
                        prepend-icon="search" 
                        label="Board name" 
                        class="ma-0 pa-0 search-board"
                        single-line
                        clearable
                        hide-details
                        v-model="searchText"></v-text-field>                    
                </v-card-title>
                <v-divider></v-divider>
                <smooth-scrollbar :options="scrollSettings" ref="scrollbar">
                    <v-card-text>
                    <div id="pageCard">
                        <v-container grid-list-xl fluid>
                            <v-layout wrap>            
                                <v-flex sm6 md4 v-for="(data,index) in installedBoard" :key="index">
                                    <v-hover>
                                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : (selectingBoard == data.name? 8 : 2)}`">
                                        <v-card-media @click.native="selectingBoard = data.name">
                                            <h4 class="white--text pa-1 pl-2 primary darken-1 mb-1" color="primary">
                                                {{data.title}}
                                            </h4>
                                            <img class="board-image" :src="`file:///${boardImageDir}/${data.name}${data.image}`"/>
                                        </v-card-media>
                                        <v-card-text>
                                            <v-btn v-if="data.installed" icon fab absolute right bottom small dark color="red" style="bottom:25px; right:5px">
                                                <v-icon>fa-trash-o</v-icon>
                                            </v-btn>
                                            <v-btn v-else icon fab absolute right bottom small dark color="blue" style="bottom:25px; right:5px">
                                                <v-icon>fa-download</v-icon>
                                            </v-btn>
      
        <div class="board-desc-text" @click="e=>e.target.classList.toggle('board-desc-text-more')">
            <div class="board-desc-more"><v-icon>fa-chevron-down</v-icon></div>
            {{data.description}}
        </div>
      
                                            
                                            <transition name="fade">
                                                <div v-if="selectingBoard == data.name" class="selected-board-icon">
                                                    <div class="corner-icon">
                                                        <v-icon size="70" color="light-green">fa-check-circle-o</v-icon>
                                                    </div>                       
                                                    <div class="corner-select"></div>
                                                </div>
                                            </transition>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <span class="ml-2"><strong>{{data.version}}</strong></span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px" @click="openLink(data.website)" v-if="data.website">
                                                <v-icon>fa-link</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px" @click="openLink('mailto:'+data.email)" v-if="data.email">
                                                <v-icon>fa-envelope-o</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5" style="min-width:40px" @click="openLink(data.git)" v-if="data.git">
                                                <v-icon>fa-github</v-icon>
                                            </v-btn>
                                        </v-card-actions>   
                                    </v-card>
                                    </v-hover>
                                </v-flex>                                
                            </v-layout>               
                        </v-container>
                    </div>

                    </v-card-text>
                </smooth-scrollbar>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="boardDialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="changeBoard(selectingBoard)">Change Board</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

const { shell } = require('electron');

import VWidget from '@/engine/views/VWidget';
import bm from '@/engine/BoardManager';
import utils from '@/engine/utils';
export default {
    components: {
        VWidget    
    },
    data () {
        return {
            boardImageDir : utils.boardDir,
            selectingBoard : this.$global.board.board,
            cardText : 'test test test\ntest test test\ntest test test\ntest test test',
            boardDialog : false,
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
            installedBoard : bm.boards(),
        }
    },
    methods:{
        getBoardByName(name){
            return this.installedBoard.find(obj => { return obj.name == name});
        },
        openLink(url){
            shell.openExternal(url);
        },
        changeBoard(boardname){        
            this.boardDialog = false;
            this.$global.board.board = boardname;
        }
    },
    mounted(){
        //console.log(bm.boards());
    }
}
</script>
<style>
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
