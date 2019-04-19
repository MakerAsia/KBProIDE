<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="$global.ui.rightDrawer('./components/setting/RightDrawer')">
            <v-icon dark>fa-floppy-o</v-icon>
        </v-btn>
        <span>Save file</span>
    </v-tooltip>
</template>

<script>
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
            saveDialog : false,
            pathSeted : false, //'insert' or 'replace'
        }
    },
    methods : {
        saveFilePopUp : async function(){
            let mode = this.$global.editor.mode;
            let isSaved = this.$global.editor.saved;
            if(!isSaved){
                
            }
        },
    }
}
</script>