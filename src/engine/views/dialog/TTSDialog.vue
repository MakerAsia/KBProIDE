<template>
    <v-card>
        <v-card-title>
            <span class="headline">Music Synthesizer</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-layout column>
                    <vue-tags-input
                            v-model="tag"
                            :tags="tags"
                            @tags-changed="newTags => tags = newTags"
                            :autocomplete-items="autocompleteItems"
                    />
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>
<script>
  import VueTagsInput from "@johmun/vue-tags-input";

  export default {
    components: {
      VueTagsInput,
    },
    data() {
      return {
        autocompleteItems: [
          {text: "Spain"},
          {text: "France"},
          {text: "USA"},
          {text: "Germany"},
          {text: "China"},
        ],
        tag: "",
        tags: [],
      };
    },
    computed(){

    },
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
</style>