<template>
    <div>    
        <v-tooltip bottom>            
            <v-btn color="primary darken-2" slot="activator" icon @click="boardDialog = !boardDialog"> 
                <v-icon dark>fa-microchip</v-icon>
            </v-btn>
            <span>Board Manager</span>
        </v-tooltip>
        <v-dialog v-model="boardDialog" max-width="80%" max-height="81%" scrollable persistent>            
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
                        :append-outer-icon="searchText ? 'fa-chevron-circle-right' : ''"
                        @click:append-outer="listAllBoard(searchText)"
                        @click:clear="listAllBoard()"
                        @change="listAllBoard(searchText)"
                        v-model="searchText"></v-text-field>
                </v-card-title>
                <v-divider></v-divider>
                <smooth-scrollbar>
                    <v-card-text>
                        <v-subheader>
                            Installed
                        </v-subheader>
                    <div>
                        <v-container grid-list-xl fluid>
                            <v-layout wrap>
                                <v-flex sm6 md4 v-for="(data) in localBoards" :key="data.name">
                                    <v-hover>
                                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : (selectingBoard == data.name? 8 : 2)}`">
                                        <v-card-media @click.native="selectingBoard = data.name">
                                            <h4 class="white--text pa-1 pl-2 primary darken-1 mb-1" color="primary">
                                                {{data.title}}
                                            </h4>
                                            <img class="board-image" :src="`file:///${boardImageDir}/${data.name}${data.image}`"/>
                                        </v-card-media>
                                        <v-card-text>
                                            <v-btn
                                                icon fab absolute right bottom small dark
                                                class="red"
                                                style="bottom:25px; right:5px"
                                                @click="toberemove = data.name; confirmRemoveDialog = true"
                                                :disabled="data.status != 'READY'"
                                            >
                                                <v-icon>fa-trash-o</v-icon>
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

                    <v-divider></v-divider>
                    <v-subheader>
                        Online available
                    </v-subheader>

                    <div>
                        <v-container grid-list-xl fluid>
                            <v-layout wrap>
                                <v-flex v-if="isOnline() === false" xs12 md12 sm12 class="text-xs-center">
                                    Please connect internet to use this feature.
                                </v-flex>
                                <v-flex v-else-if="onlineBoardStatus === 'wait'" xs12 md12 sm12 class="text-xs-center">
                                    <v-progress-circular
                                        :size="50"
                                        color="primary"
                                        indeterminate
                                    ></v-progress-circular>
                                </v-flex>
                                <v-flex v-else-if="onlineBoardStatus != 'wait'" sm6 md4 v-for="(data) in onlineBoards" :key="data.name">
                                    <template v-if="data.status != 'INSTALLED'">
                                        <v-card>
                                            <v-card-media>
                                                <h4 class="white--text pa-1 pl-2 primary darken-1 mb-1" color="primary">
                                                    {{data.title}}
                                                </h4>
                                                <v-img contain v-if="data.image.startsWith('http') === true" class="board-image" :src="data.image"/>
                                                <v-img contain v-else class="board-image" :src="`file:///${boardImageDir}/${data.name}${data.image}`"/>
                                            </v-card-media>
                                            <v-card-text>
                                                <v-btn
                                                    icon fab absolute right bottom small dark
                                                    style="bottom:25px; right:5px"
                                                    class="primary"
                                                    :disabled="data.status != 'READY'"
                                                    @click="tobeinstall = data.name; confirmInstallDialog = true"
                                                >
                                                    <v-icon v-if="data.status == 'READY'">fa-download</v-icon>
                                                    <v-progress-circular
                                                        v-else-if="data.status != 'READY'"
                                                        indeterminate
                                                        color="primary lighten-4"
                                                    >
                                                    </v-progress-circular>
                                                </v-btn>
                                                <div class="board-desc-text" @click="e=>e.target.classList.toggle('board-desc-text-more')">
                                                    <div class="board-desc-more"><v-icon>fa-chevron-down</v-icon></div>
                                                    {{data.description}}
                                                </div>
                                            </v-card-text>
                                            <v-divider></v-divider>
                                            <p v-if="data.status != 'READY'" class="text-info-status">{{statusText}}</p>
                                            <v-progress-linear 
                                                v-if="data.status != 'READY'"
                                                height="2"
                                                style="position:absolute; margin-top: -2px;"
                                                color="primary"
                                                v-model="statusProgress"
                                                :indeterminate="data.status == 'DOWNLOAD'">
                                            </v-progress-linear>
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
                                    </template>
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
        <v-dialog v-model="confirmRemoveDialog" persistent max-width="500px">
            <v-card>
                <v-card-title class="headline">Remove board confirmation</v-card-title>
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
                <v-card-title class="headline">Install board confirmation</v-card-title>
                <v-card-text>Do you want to install <strong>{{tobeinstall}}</strong>?</v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="green--text darken-1" flat="flat" @click.native="confirmInstallDialog = false">Cancel</v-btn>
                <v-btn class="green--text darken-1" flat="flat" @click.native="confirmInstallDialog = false; installOnlineBoard(tobeinstall);">OK</v-btn>
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
import bm from '@/engine/BoardManager';
import util from '@/engine/utils';
export default {
    components: {
        VWidget
    },
    data () {
        return {
            boardImageDir : util.boardDir,
            selectingBoard : this.$global.board.board,
            boardDialog : false,
            confirmRemoveDialog : false,
            confirmInstallDialog : false,
            searchText : '',             
            isInstalling : false,

            installedBoard : bm.boards().map(obj=>{ obj.status =  'READY'; return obj;}),
            localBoards : bm.boards().map(obj=>{ obj.status =  'READY'; return obj;}),
            onlineBoardStatus : 'wait',
            onlineBoardPage : 0,
            onlineBoards : [],
            tobeinstall : '',
            toberemove : '',
            statusText : '',
            statusProgress : 0,
        }
    },
    methods:{        
        getBoardByName(name){
            return this.installedBoard.find(obj => { return obj.name == name});
        },
        getOnlineBoardByName(name){
            return this.onlineBoards.find(obj=>{ return obj.name == name});
        },
        openLink(url){
            shell.openExternal(url);
        },
        changeBoard(boardname){        
            this.boardDialog = false;
            this.$global.board.board_info =  bm.boards().find(obj => obj.name == boardname);
            this.$global.board.board = boardname;
        },
        isOnline()
        {
            return window.navigator.onLine;
        },
        listAllBoard(name = ''){            
            this.listOnlineBoard(name);
            this.listLocalBoard(name);
        },
        listOnlineBoard(name = ''){
            this.onlineBoardStatus = 'wait';
            bm.listOnlineBoard(name).then(res=>{                
                //name,start return {end : lastVisible, boards : onlineBoards}
                this.onlineBoardPage = res.end;
                this.onlineBoards = res.boards.map(obj=>{ obj.status =  'READY'; return obj;});
                this.onlineBoardStatus = 'OK';                
            }).catch(err=>{
                this.onlineBoardStatus = 'ERROR';
            });   
        },
        listLocalBoard(name = ''){
            if(name != ''){
                this.localBoards = this.installedBoard.filter(obj=> {return obj.name.startsWith(name)});
            }else{
                this.localBoards = this.installedBoard;
            }            
        },
        installOnlineBoard(name){
            let b = this.getOnlineBoardByName(name);
            b.status='DOWNLOAD';
            this.statusText = "Downloading";
            this.statusProgress = 0;
            bm.installBoardByName(name,progress => {
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
            })
        }
    },
    mounted(){
        
    },
    destroyed() {
      
    },
    watch : {
        boardDialog : function(val){
            if(val){//on opening
                this.listOnlineBoard();
            }
        }
    }
}
</script>
<style>
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
