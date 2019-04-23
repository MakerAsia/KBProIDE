<template>
    <v-footer height="23" min-height="10" class="grey lighten-3">
        <v-layout row wrap>
            <v-flex xs4>
                <v-card>
                    <v-card-text class="px-0">
                        
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card>
                    <v-card-text class="px-0 text-xs-center">

                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4>
                <v-card>
                    <v-card-text class="px-0 text-xs-right">
                        {{editorStatus}}
                    </v-card-text>
                </v-card>
            </v-flex>
      </v-layout>
    </v-footer>
</template>
<script>
import { stat } from 'fs';
export default {
    name: 'app-footer',
    data: () => ({
        editorStatus : '',
        infoStatus : '',
        status : ''
    }),
    mounted(){

    },
    methods : {
        updateEditorStatus : function(text){
            editorStatus = text;
        },
        updateInfoStatus : function(text){
            infoStatus = text;
        },
        updateStatus : function(text){
            status = text;
        }
    }
}
</script>
