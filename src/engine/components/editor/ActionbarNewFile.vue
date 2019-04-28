<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="newFile">
            <v-icon dark>fa-file-text-o</v-icon>
        </v-btn>
        <span>New file</span>
    </v-tooltip>
</template>
<script>
const electron = require('electron');
export default {
    data(){
        return {
            
        }
    },
    created(){
        electron.ipcRenderer.on('file-new',this.newFile);
    },
    methods : {
        newFile : async function(){
            if(this.$global.editor.mode < 3){
                var blockCode = this.$global.editor.blockCode;
                let rexEmptyBlock = /<xml.*?><variables><\/variables><block type="arduino_init\".*?><\/block><block type="arduino_loop\".*?><\/block><\/xml>/g;
                if(blockCode == "" || 
                blockCode == '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables></xml>' ||
                rexEmptyBlock.test(blockCode)){ //it empty workspace
                    this.$global.ui.snackbar("Workspace already empty.");
                }else{ //non-empty workspace
                    const res = await this.$dialog.confirm({
                        text: 'This workspace is not empty. Do you really want to clear this workspace?',
                        title: 'Warning',
                        actions : {
                            'false' : 'Cancel',
                            'true' : 'Clear'
                        }
                    });
                    if(res){
                        this.$global.editor.blockCode = "";
                        this.$global.$emit('editor-mode-change',this.$global.editor.mode);
                    }
                }
            }else{
                const res = await this.$dialog.confirm({
                    text: 'This workspace is not empty. Do you really want to clear this workspace?',
                    title: 'Warning',
                    actions : [
                        { text : 'Cancel', key : false },
                        { text : 'Clear' , key : true},
                        { text : 'Convert Block' ,key : 'convert'}
                    ]
                });
                if(res){
                    this.$global.editor.sourceCode = "";
                    this.$global.$emit('editor-mode-change',this.$global.editor.mode,res === 'convert');
                }
            }
        }
    }
}
</script>
