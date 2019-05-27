<template>
    <v-card>
        <v-card-title>
            <span class="headline">Text To Speech</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-container>
                <v-layout column>
                    <p class="subheading">
                        Type the words (support only listed auto complete)
                    </p>
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
  import VueTagsInput from "@johmun/vue-tags-input";
  import Words from "./tts";
  export default {
    components: {
      VueTagsInput,
    },
    /*props:{
      tags: {
        type: Array,
        required: false
      },
    },*/
    data() {
      return {
        autocompleteItems: Words,
        tag: "",
        tags : []
      };
    },
    computed:{
      filteredItems() {
        return this.autocompleteItems.filter(i => {
          return i.text.toLowerCase().startsWith(this.tag.toLocaleLowerCase());
        }).sort((a,b)=>{
          return a.text.length - b.text.length;
        });
      },
    },
    methods : {
      close(){
        this.$emit('close');
      },
      OK(){
        this.$emit('result',this.tags.map(obj => obj.text));
      }
    }
  };
</script>
<style lang="css">
    .vue-tags-input{
        max-width: unset !important;
    }
    .ti-tag{
        font-size: 15px !important;
    }
    .ti-new-tag-input-wrapper input{
        font-size: 15px;
    }
    .ti-tag.ti-invalid{
        background-color: #5C6BC0 !important;
    }
    .ti-autocomplete{
        position: fixed !important;
        height: 215px;
        width: 62% !important;
        overflow: scroll;
        box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);
    }
</style>