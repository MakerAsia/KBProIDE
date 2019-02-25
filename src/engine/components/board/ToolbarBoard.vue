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
                    <span class="headline">Select board</span>
                    <v-spacer class="hidden-xs-only"></v-spacer>
                     <v-text-field 
                        prepend-icon="search" 
                        label="Board name" 
                        class="ma-0 pa-0 search-board"                        
                        single-line 
                        hide-details                         
                        v-model="searchText"></v-text-field>                    
                </v-card-title>
                <v-divider></v-divider>
                <smooth-scrollbar :options="scrollSettings" ref="scrollbar">
                    <v-card-text>
                    <div id="pageCard">
                        <v-container grid-list-xl fluid>
                            <v-layout wrap>            
                                <v-flex sm6 md4 v-for="(data,index) in boardData" :key="index">
                                    <v-hover>
                                    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : (selectingBoard == data.boardName? 8 : 2)}`" @click.native="selectingBoard = data.boardName">
                                        <v-card-media>
                                            <h4 class="white--text pa-1 pl-2 primary darken-1 mb-1" color="primary">
                                                {{data.name}}
                                            </h4>
                                            <img class="board-image" :src="data.image"/>
                                        </v-card-media>
                                        <v-card-text>
                                            <v-btn v-if="data.installed" icon fab absolute right bottom small dark color="red" style="bottom:25px; right:5px">
                                                <v-icon>fa-trash-o</v-icon>
                                            </v-btn>
                                            <v-btn v-else icon fab absolute right bottom small dark color="blue" style="bottom:25px; right:5px">
                                                <v-icon>fa-download</v-icon>
                                            </v-btn>
                                            <div>
                                                {{data.desc}}
                                            </div>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <span class="ml-2"><strong>{{data.author}}</strong></span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px" @click="openLink(data.link)">
                                                <v-icon>fa-link</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px" @click="openLink('mailto:'+data.mail)">
                                                <v-icon>fa-envelope-o</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5" style="min-width:40px" @click="openLink(data.git)">
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
                    <v-btn color="blue darken-1" flat @click.native="boardDialog = false">Change Editor</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>

const { shell } = require('electron');

import VWidget from '@/engine/views/VWidget';
export default {
  components: {
    VWidget    
  },
  data () {
    return {
        selectingBoard : 'kidbright',
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
        boardData : [
            {
                boardName : 'kidbright',
                name : 'KidBright (Original)',
                desc : 'test test test test more ...',
                author : 'xxxx test',
                link : 'http://google.com',
                mail : 'comdet.p@gmail.com',
                git : 'https://github.com/xxxx',
                installed : true,
                image : 'https://i.ibb.co/K7NsyGN/display.jpg'
            },
            {
                boardName : 'kidbright-arduino',
                name : 'KidBright (Arduino)',
                desc : 'test test test test more ...',
                author : 'xxxx test',
                link : 'http://google.com',
                mail : 'comdet.p@gmail.com',
                git : 'https://github.com/xxxx',
                installed : true,
                image : 'https://i.ibb.co/K7NsyGN/display.jpg'
            },
            {
                boardName : 'KBPro',
                name : 'KidBright (Original)',
                desc : 'test test test test more ...',
                author : 'xxxx test',
                link : 'http://google.com',
                mail : 'comdet.p@gmail.com',
                git : 'https://github.com/xxxx',
                installed : false,
                image : '/static/nature/n2.jpeg'
            },
            {
                boardName : 'arduino-uno',
                name : 'KidBright (Original)',
                desc : 'test test test test more ...',
                author : 'xxxx test',
                link : 'http://google.com',
                mail : 'comdet.p@gmail.com',
                git : 'https://github.com/xxxx',
                installed : true,
                image : '/static/nature/n3.jpeg'
            },
            {
                boardName : 'arduino-mega',
                name : 'KidBright (Original)',
                desc : 'test test test test more ...',
                author : 'xxxx test',
                link : 'http://google.com',
                mail : 'comdet.p@gmail.com',
                git : 'https://github.com/xxxx',
                installed : false,
                image : '/static/nature/n4.jpeg'
            },
        ]
    }
  },
  methods:{
      openLink : (url)=>{
          shell.openExternal(url);
      }
  },
  mounted(){
  }
}
</script>
<style>
.search-board {
    width: 40px;
    margin-bottom: -10px !important;
}
.board-header {
    
}
.board-image{
    display: block;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    line-height: 0;
    height: 150px;
}
</style>
