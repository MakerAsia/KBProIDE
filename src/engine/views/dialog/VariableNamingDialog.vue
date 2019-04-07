<template>    
        <v-card>
            <v-card-title>
                <span class="headline">{{message}}</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-flex xs12>
                    <v-text-field 
                        v-model="variable_name"
                        label="Variable name" 
                        required 
                        clearable 
                        counter
                        maxlength="32"
                        :rules="[variable_name_validator]"></v-text-field>
                    </v-flex>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
                <v-btn color="blue darken-1" flat :disabled="!validated" @click="OK(variable_name)">Save</v-btn>
            </v-card-actions>
        </v-card>    
</template>
<script>
import { watch } from 'fs';
export default {
    name: 'variable-naming-dialog',
    components: {
    },
    props: {
        name : String,
    },
    data(){
     return { 
        variable_name : this.name,
        message : 'Variable Name',
        validated : false,
        variable_name_validator : value => {
            const pattern = /(?:^(uint16\s*|uint32\s*|uint8\s*|auto\s*|const\s*|unsigned\s*|signed\s*|register\s*|volatile\s*|static\s*|void\s*|short\s*|long\s*|char\s*|int\s*|float\s*|double\s*|_Bool\s*|complex\s*|return\s*)+$)|(?:\s+\*?\*?\s*)|(^[0-9])|([^_A-Za-z0-9]+)/;            
            this.validated = !pattern.test(value);
            if(value == null || value == ""){
                this.validated = false;
            }
            return this.validated || 'Invalid variable name';
        },

     }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        OK(varName){            
            this.$emit('var_result',varName);            
        }
    }
}
</script>
