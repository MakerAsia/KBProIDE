<template>
    <v-card>
        <v-card-title>
            <span class="headline">Music Synthesizer</span>
        </v-card-title>

        <v-card-text>
            <v-containe>
                <v-layout column>
                    <v-flex xs12 mb-2>
                        <vue-tags-input
                                v-model="tag"
                                :tags="tags"
                                :allow-edit-tags="false"
                                :autocomplete-filter-duplicates="false"
                                :add-from-paste="false"
                                :add-only-from-autocomplete="true"
                                :avoid-adding-duplicates="false"
                                @tags-changed="newTags => tags = newTags"
                                :autocomplete-items="filteredItems"
                        />
                    </v-flex>
                    <v-flex xs12 align-center>
                        <piano @pressed="pressedNote"></piano>
                    </v-flex>
                </v-layout>
            </v-containe>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="OK">OK</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import Piano from "@/engine/views/widgets/piano/Piano";
  import Notes from "../widgets/piano/midikey";

  export default {
    components: {
      Piano
    },
    data() {
      return {
        tag: "",
        tags: [],
        notes: Notes,
        synth: null
      };
    },
    mounted() {
      //Tone.start();
      this.synth = new Tone.Synth().toMaster();
    },
    computed: {
      filteredItems() {
        return this.notes.filter(i => {
          return i.text.toLowerCase().startsWith(this.tag.toLocaleLowerCase());
        }).sort((a, b) => {
          return a.text.length - b.text.length;
        });
      }
    },
    methods: {
      pressedNote: function(note) {
        if (note !== "SIL") {
          this.synth.triggerAttackRelease(note, "8n");
        }
        this.tags.push({ text: note });
      },
      close() {
        this.$emit("close");
      },
      OK() {
        this.$emit("result", this.tags.map(obj => obj.text));
      }
    }
  };
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
        padding-left: 7px;
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
