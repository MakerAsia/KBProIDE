<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="newFile">
            <v-icon dark>fa-file-text-o</v-icon>
        </v-btn>
        <span>New file</span>
    </v-tooltip>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    methods : {
        newFile : async function(){
            this.$global.$emit('editor-newtab',{
                type : 'block',
                data : {
                    name : '2',
                    title : 'tesss'
                }
            })
        }
    }
}
</script>
