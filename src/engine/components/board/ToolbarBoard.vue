<template>
    <div>    
        <v-tooltip bottom>            
            <v-btn color="primary darken-2" slot="activator" icon @click="boardDialog = !boardDialog"> 
                <v-icon dark>fa-microchip</v-icon>
            </v-btn>
            <span>Board Manager</span>
        </v-tooltip>
        <v-dialog v-model="boardDialog" max-width="800px" max-height="80%" scrollable>            
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
                            <v-layout row wrap>                        
                                <v-flex sm6>
                                    <v-card>
                                        <v-card-media>
                                            <h4 class="white--text pa-1 board-header">
                                                Kid Bright (Original)
                                            </h4>
                                            <img class="board-image" src="https://i.ibb.co/K7NsyGN/display.jpg"/>
                                        </v-card-media>
                                        <v-card-text>
                                            <v-btn icon fab absolute right bottom small dark color="primary" style="bottom:25px; right:5px">
                                                <v-icon>fa-download</v-icon>
                                            </v-btn>
                                            <div>
                                                {{cardText}}
                                            </div>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <span class="ml-2"><strong>by Comdet</strong></span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px">
                                                <v-icon>fa-link</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px">
                                                <v-icon>fa-envelope-o</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5" style="min-width:40px">
                                                <v-icon>fa-github</v-icon>
                                            </v-btn>
                                        </v-card-actions>   
                                    </v-card>
                                </v-flex>
                                <v-flex sm6>
                                    <v-card>
                                        <v-card-media src="https://i.ibb.co/K7NsyGN/display.jpg" height="150" contain>
                                        <h4 class="white--text pa-1 board-header">
                                            Kid Bright (Original)
                                        </h4>
                                        </v-card-media>
                                        <v-card-text>
                                            <v-btn icon fab absolute right bottom small dark color="primary" style="bottom:25px; right:5px">
                                                <v-icon>fa-download</v-icon>
                                            </v-btn>
                                            <div>
                                                {{cardText}}
                                            </div>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <span class="ml-2"><strong>by Comdet</strong></span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px">
                                                <v-icon>fa-envelope-o</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5" style="min-width:40px">
                                                <v-icon>fa-github</v-icon>
                                            </v-btn>
                                        </v-card-actions>   
                                    </v-card>
                                </v-flex>
                            </v-layout>     
                            <v-layout row wrap>                        
                                <v-flex sm6>
                                    <v-card>
                                        <v-card-media src="/static/nature/n1.jpeg" height="150">
                                        <h4 class="white--text pa-2">
                                            Kid Bright (Original)
                                        </h4>
                                        </v-card-media>
                                        <v-card-text>
                                            <v-btn icon fab absolute right bottom small dark color="primary" style="bottom:25px; right:5px">
                                                <v-icon>fa-download</v-icon>
                                            </v-btn>
                                            <div>
                                                {{cardText}}
                                            </div>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <span class="ml-2"><strong>by Comdet</strong></span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px">
                                                <v-icon>fa-envelope-o</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5" style="min-width:40px">
                                                <v-icon>fa-github</v-icon>
                                            </v-btn>
                                        </v-card-actions>   
                                    </v-card>
                                </v-flex>
                                <v-flex sm6>
                                    <v-card>
                                        <v-card-media src="/static/nature/n2.jpeg" height="150">
                                        <h4 class="white--text pa-2">
                                            Kid Bright (Original)
                                        </h4>
                                        </v-card-media>
                                        <v-card-text>
                                            <v-btn icon fab absolute right bottom small dark color="red" style="bottom:25px; right:5px">
                                                <v-icon>fa-trash</v-icon>
                                            </v-btn>
                                            <div>
                                                {{cardText}}
                                            </div>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <span class="ml-2"><strong>by Comdet</strong></span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px">
                                                <v-icon>fa-envelope-o</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5" style="min-width:40px">
                                                <v-icon>fa-github</v-icon>
                                            </v-btn>
                                        </v-card-actions>   
                                    </v-card>
                                </v-flex>
                            </v-layout>   

                            <v-layout row wrap>
                                <v-flex sm6>
                                    <v-card>
                                        <v-card-media src="/static/nature/n1.jpeg" height="150">
                                        <h4 class="white--text pa-2">
                                            Kid Bright (Original)
                                        </h4>
                                        </v-card-media>
                                        <v-card-text>
                                            <v-btn icon fab absolute right bottom small dark color="primary" style="bottom:25px; right:5px">
                                                <v-icon>fa-download</v-icon>
                                            </v-btn>
                                            <div>
                                                {{cardText}}
                                            </div>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <span class="ml-2"><strong>by Comdet</strong></span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px">
                                                <v-icon>fa-envelope-o</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5" style="min-width:40px">
                                                <v-icon>fa-github</v-icon>
                                            </v-btn>
                                        </v-card-actions>   
                                    </v-card>
                                </v-flex>
                                <v-flex sm6>
                                    <v-card>
                                        <v-card-media src="/static/nature/n2.jpeg" height="150">
                                        <h4 class="white--text pa-2">
                                            Kid Bright (Original)
                                        </h4>
                                        </v-card-media>
                                        <v-card-text>
                                            <v-btn icon fab absolute right bottom small dark color="red" style="bottom:25px; right:5px">
                                                <v-icon>fa-trash</v-icon>
                                            </v-btn>
                                            <div>
                                                {{cardText}}
                                            </div>
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <span class="ml-2"><strong>by Comdet</strong></span>
                                            <v-spacer></v-spacer>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0" style="min-width:40px">
                                                <v-icon>fa-envelope-o</v-icon>
                                            </v-btn>
                                            <v-btn flat small color="primary" dark class="right pa-0 ma-0 mr-5" style="min-width:40px">
                                                <v-icon>fa-github</v-icon>
                                            </v-btn>
                                        </v-card-actions>   
                                    </v-card>
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
import VWidget from '@/engine/views/VWidget';
export default {
  components: {
    VWidget    
  },
  data () {
    return {
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
        } 
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
    background-color: rgba(0,0,0,0.4);
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
