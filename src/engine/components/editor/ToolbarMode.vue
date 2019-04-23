<template>
    <div>
        <v-tooltip bottom>            
            <v-btn color="primary darken-2" slot="activator" icon @click="modeDialog = !modeDialog"> 
                <v-icon dark>fa-users</v-icon>
            </v-btn>
            <span>User Level</span>
        </v-tooltip>
        <v-dialog v-model="modeDialog" max-width="800px">        
            <v-card>
                <v-card-title>
                    <span class="headline">Select programming level</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-item-group>              
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 md4 v-for="(mode,index) in modes" :key="index">                                
                                    <v-hover>                              
                                        <v-card light slot-scope="{ hover }" :class="`elevation-${hover ? 12 : (selectingMode == index+1? 8 : 2)}`" @click.native="selectingMode = mode.mode" height="200">
                                            <transition name="fade">
                                                <div class="sneaker" v-if="selectingMode == index+1" transition="fade-transition">                
                                                    <v-layout row justify-space-between class="ma-0 grey lighten-2">
                                                        <v-flex xs2>
                                                        </v-flex>
                                                        <v-flex xs2 class="text-sm-right">
                                                            <v-icon color="green">check_circle</v-icon>
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                            </transition>
                                            <v-card-text>
                                                <div class="layout ma-0 align-center column pt-4">
                                                    <v-avatar color="primary" :size="mode.icon.size">
                                                        <img :src="mode.icon.src" alt="Kid Level">                                            
                                                    </v-avatar>
                                                    <div class="flex text-sm-center">
                                                    <div class="subheading">{{mode.name}}</div>
                                                    <span class="caption">{{mode.desc}}</span>
                                                    </div>
                                                </div>
                                            </v-card-text>
                                        </v-card> 
                                    </v-hover>                             
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-item-group>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="modeDialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="changeEditorMode(selectingMode)">Change Editor</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
// === UI Management ===
import UserSelectCard from '@/engine/views/widgets/card/UserSelectCard';
import VWidget from '@/engine/views/VWidget';
export default {
  components: {
    VWidget
  },
  data () {
    return {
        selectingMode : this.$global.editor.mode,
        modes:[
            {
                name: 'Kid Level',
                desc: 'Easy programming with blocks',
                icon: {
                    src: '/static/icons/kid.png',
                    size: '96'
                },
                mode : 1
            },
            {
                name: 'Student Level',
                desc: 'Learning convert block to code',
                icon: {
                    src: '/static/icons/nerd.png',
                    size: '96'
                },
                mode : 2
            },
            {
                name: 'Programmer Level',
                desc: 'Coding with pure editor',
                icon: {
                    src: '/static/icons/programmer.png',
                    size: '96'
                },
                mode : 3
            }
        ],
      modeDialog : false
    };
  },
  computed: {
  },  
  methods: {
      changeEditorMode : async function(mode){
            console.log('editor change mode to : '+mode);    
            this.modeDialog = false;
            if(mode >= 3){ // we ask a convert
                const res = await this.$dialog.confirm({
                    text: 'Do you want to clear and convert block to source code?',
                    title: 'Warning',
                    actions : [
                        { text : 'Cancel', key : false },
                        { text : 'Create new' , key : true},
                        { text : 'Clear & Convert' ,key : 'convert'}
                    ]
                });
                if(res === true || res === 'convert'){
                    this.$global.editor.mode = mode;
                    this.$global.editor.sourceCode = "";
                    //this.$global.$emit('editor-mode-change',this.$global.editor.mode,res === 'convert');
                    this.$nextTick(function () { //wait for element changed before fire event
                        this.$global.$emit('editor-mode-change', mode,res === 'convert');
                    });
                }
            }else{
                this.$global.editor.mode = mode;
                this.$nextTick(function () { //wait for element changed before fire event
                    this.$global.$emit('editor-mode-change', mode);
                });
            }
            
      }
  },
  watch:{
      'modeDialog': function(val){
          if(val){//on opening
            this.selectingMode = this.$global.editor.mode;            
          }
      }
  }
};
</script>

<style lang="stylus" scoped>
/*https://github.com/vuetifyjs/vuetify/issues/2111*/
.dialog { z-index: inherit }

  .caption, .subheading {
    font-weight:400;  
  }
  .sneaker{
      width :100%;
      height :20px;
      display :block;
      position: absolute;
      z-index : 999;
  }
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
