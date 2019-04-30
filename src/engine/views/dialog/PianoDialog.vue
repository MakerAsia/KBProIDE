<template>
        <v-card>
            <v-card-title>
                <span class="headline">Music Synthesizer</span>
            </v-card-title>
            
            <v-card-text>                            
                <v-container>
                    <v-layout column>                                    
                        <!--v-flex>
                            <v-layout justify-space-between mb-3>
                                <v-flex text-xs-left>
                                    <span class="display-2 font-weight-light" v-text="bpm"></span>
                                    <span class="subheading font-weight-light mr-1">BPM</span>
                                    <v-fade-transition>
                                        <v-avatar
                                            v-if="isPlaying"
                                            :color="color"
                                            :style="{ animationDuration: animationDuration }"
                                            class="mb-1 v-avatar--metronome"
                                            size="15"
                                        ></v-avatar>
                                    </v-fade-transition>
                                </v-flex>
                                <v-flex xs5 text-xs-right>
                                    <v-select
                                        v-model="selectedInstrument"
                                        :items="instruments"
                                        label="Instument"
                                    ></v-select>
                                </v-flex>
                                <v-flex xs1 text-xs-right>
                                    <v-btn
                                        :color="color" dark depressed fab small
                                        @click="playNotes"
                                    >
                                    <v-icon>
                                        {{ isPlaying ? 'fa-pause' : 'fa-play' }}
                                    </v-icon>
                                    </v-btn>
                                </v-flex>
                            </v-layout>                                
                            <v-slider v-model="bpm" :color="color" always-dirty min="40" max="218">                                            
                            </v-slider>
                        </v-flex-->    
                        <v-flex xs12 mb-2>
                            <v-combobox multiple
                                width="100%"                                            
                                v-model="select"
                                label="Music Notes" 
                                append-icon
                                chips                                            
                                class="tag-input"
                                clearable
                                :search-input.sync="search" 
                                @click:append="clickedNote"
                                @keyup.tab="updateTags"                                            
                                @paste="updateTags">
                                <template v-slot:selection="data">
                                    <v-chip
                                        :selected="data.selected"
                                        close
                                        @input="remove(data.item)"
                                        @click="clickedNote(data.item)"
                                    >
                                    <strong>{{ data.item }}</strong>&nbsp;                                                
                                    </v-chip>
                                </template>
                            </v-combobox>
                        </v-flex>
                        <v-flex xs12 align-center>
                            <piano @pressed="pressedNote"></piano>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" flat @click="OK">OK</v-btn>
            </v-card-actions>
        </v-card>
</template>

<script>
import Piano from '@/engine/views/widgets/piano/Piano'
//import Tone from 'tone'
//var synth = new Tone.Synth().toMaster()
export default {
    components :{
        Piano
    },
    data () {
        return {
            select: [],
            selectedInstrument : 'Piano',
            instruments : ["Piano","Xasophone","Something"],
            search: "", //sync search
            bpm: 40,
            interval: null,
            isPlaying: false
        };
    },
    computed: {
        color () {
            if (this.bpm < 100) return 'indigo'
            if (this.bpm < 125) return 'teal'
            if (this.bpm < 140) return 'green'
            if (this.bpm < 175) return 'orange'
            return 'red'
        },
        animationDuration () {
            return `${60 / this.bpm}s`
        }
    },
    methods: {        
        playNotes () {
            this.isPlaying = !this.isPlaying
        },
        updateTags() {
            this.$nextTick(() => {
                this.select.push(...this.search.split(","));
                this.$nextTick(() => {
                this.search = "";
                });
            });
        },
        pressedNote : function(note) {
            //synth.triggerAttackRelease(note, '8n')
            this.select.push(note);
        },
        clickedNote : function(note){
            //synth.triggerAttackRelease(note, '8n')
        },
        remove (item) {
            this.select.splice(this.select.indexOf(item), 1)
            this.select = [...this.select]
        },
        close(){
            this.$emit('close');
        },
        OK(){
            this.$emit('result',this.select.join(","));
        }        
    }
}
</script>

<style>
.tag-input span.chip {
  background-color: #1976d2;
  color: #fff;
  /*font-size: 1em;*/
}

.tag-input span.v-chip {
  background-color: #1976d2;
  color: #fff;
  /*font-size:1em;*/
  padding-left:7px;
}

/*.tag-input span.v-chip::before {
    content: "label";
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 20px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
}*/
</style>