<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="compileDialog = true">
            <v-icon dark>fa-play</v-icon>
            </v-btn>
            <span>Compile &#x26; Run</span>
        </v-tooltip>

        <v-widget title="Basic Usage">
            <div slot="widget-content">
                <v-dialog v-model="compileDialog" persistent max-width="450px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Compile &#x26; Run</span>
                        </v-card-title>
                        
                        <v-card-text>
                            <v-container>
                                <v-layout align-center column>           
                                    <v-flex xs12>
                                        <v-progress-circular v-if="compileStep < 3"
                                            :size="80"
                                            :width="8"
                                            color="primary"
                                            indeterminate>
                                        </v-progress-circular>
                                        <v-fade-transition :hide-on-leave="true">
                                            <v-icon color="green" size="110" v-if="compileStep >= 3">check_circle_outline</v-icon>
                                        </v-fade-transition>
                                    </v-flex>                                    
                                </v-layout>
                            </v-container>
                            <v-flex xs12>
                                <v-stepper v-model="compileStep" vertical class="elevation-0 pb-0">
                                    <v-stepper-step step="1" :complete="compileStep > 0" @click="compileStep = 1">
                                        Find KidBright
                                        <small v-if="compileStep >= 2">KidBright at COM15 mac : 12-AA-58-48-AC-25</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="1" v-if="compileStep >= 1">
                                        KidBright at COM15 mac : 12-AA-58-48-AC-25
                                    </v-stepper-content>

                                    <v-stepper-step step="2" :complete="compileStep > 1">
                                        Create an ad group
                                        <small v-if="compileStep >= 3">check if KidBright connected</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="2" v-if="compileStep >= 2">
                                        KidBright Compile Step 2
                                    </v-stepper-content>

                                    <v-stepper-step step="3" :complete="compileStep > 2">
                                        Create an ad
                                    </v-stepper-step>
                                    <v-stepper-content step="3" v-if="compileStep >= 3">
                                        KidBright Compile Step 3
                                        <v-progress-linear        
                                            height="2"
                                            v-model="value"
                                            :active="show"
                                            :indeterminate="query"
                                            :query="true"
                                        ></v-progress-linear>                                        
                                    </v-stepper-content>
                                </v-stepper>
                            </v-flex>                 
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="compileStep = 1">Reset</v-btn>
                            <v-btn color="blue darken-1" flat @click="compileStep += 1">Step</v-btn>
                            <v-btn color="blue darken-1" flat @click="compileDialog = false" :disabled="compileStep < 3">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-widget>
    </div>
</template>

<script>
const engine = Vue.prototype.$engine;
const G = Vue.prototype.$global;
var path = `${engine.util.boardDir}/${G.board.board}/compiler`;
console.log(path);
var boardCompiler = engine.util.requireFunc(path);
console.log(boardCompiler);

export default {
  data () {
    return {
        compileStep : 1,
        compileDialog : false,
        complete : false,
        //test progress bar
        value: 0,
        query: false,
        show: true,
        interval: 0
    };
  },
  
  mounted () {
    this.queryAndIndeterminate()
  },

  beforeDestroy () {
    clearInterval(this.interval)
  },
  methods: {
      
    queryAndIndeterminate () {
      this.query = true
      this.show = true
      this.value = 0

      setTimeout(() => {
        this.query = false

        this.interval = setInterval(() => {
          if (this.value === 100) {
            clearInterval(this.interval)
            this.show = false
            return setTimeout(this.queryAndIndeterminate, 2000)
          }
          this.value += 25
        }, 1000)
      }, 2500)
    }
  },
  watch:{
        'compileDialog': function(val){
            if(val){//on opening
                this.compileStep = 1;
                this.complete = false;
            }
        }
    }
}
</script>