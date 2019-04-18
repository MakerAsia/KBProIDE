<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click.native="openFilePopUp">
                <v-icon dark>fa-folder-open</v-icon>
            </v-btn>
            <span>Open file</span>
        </v-tooltip>        
    </div>
</template>

<script>
import { resolve } from 'url';
const {dialog} = require('electron').remote;
const fs = require('fs');
const base64 = require('base64-js');
//from kbide 
// https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings#answer-30106551
function b64EncodeUnicode(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
		return String.fromCharCode(parseInt(p1, 16))
	}))
}

function b64DecodeUnicode(str) {
	return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
	}).join(''))
}

//const WIN = new BrowserWindow({width: 800, height: 600});
export default {
    data(){
        return {
            openDialog : false,
            insertBlockMode : 'replace', //'insert' or 'replace'
        }
    },
    methods : {
        openFilePopUp : async function(){
            let mode = this.$global.editor.mode;
            let isSaved = this.$global.editor.saved;
            if(!isSaved){
                let userDec = await this.$dialog.confirm({
                    title : 'Save you code first?',
                    text : "It look like you haven't save workspace yet, openning new file will overwrite your code",
                    actions : {
                        'false' : 'Cancel',
                        'true' : 'Overwrite'
                    }
                });
                if(userDec){
                    let blyOption = {
                        title : 'Open Blockly File',
                        filters : [ 
                            { name : 'Blockly file' , extensions : ['bly','txt'] }
                        ]
                    }
                    let codeOption = {
                        title : 'Open Code File',
                        filters : [ 
                            { name : 'Source code file' , extensions : ['c','cpp'] }
                        ]
                    }
                    let filePath = dialog.showOpenDialog(null,(mode>2) ? codeOption : blyOption);
                    if(filePath){
                        if(mode > 2){ //source code 
                            this.$global.editor.sourceCode = fs.readFileSync(filePath,'utf8');
                            this.$global.editor.saved = false;
                        }else{
                            this.$global.editor.rawCode =  fs.readFileSync(filePath,'utf8')
                        }
                    }
                }
            }
        },
        openFile : function(){
            
        }
    }
}
</script>