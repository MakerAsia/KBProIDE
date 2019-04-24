<template>
    <div>
        <v-divider></v-divider>
        <v-flex>
            <v-subheader class="px-1 my-2">
                Editor Setting
            </v-subheader>
            <div class="my-3">
                <v-select
                    :items="editorTheme"
                    label="Select theme"
                    v-model="editorThemeValue">
                </v-select>
            </div>
            <div class="my-3">
                <v-select
                    :items="fontSize"
                    label="Font size"
                    v-model="editorFontsize"
                ></v-select>
            </div>
        </v-flex>
    </div>
</template>
<script>
export default {
  data () {
        return {
            fontSize : ['10','12','14','16','18','20','24','28','32','64','78'],
            editorTheme : [ 
                'default','3024-day','3024-night','abcdef','ambiance','base16-dark',
                'base16-light','bespin','blackboard','cobalt','colorforth','darcula',
                'dracula','duotone-dark','duotone-light','eclipse','elegant','erlang-dark',
                'gruvbox-dark','hopscotch','icecoder','idea','isotope','lesser-dark','liquibyte',
                'lucario','material','mbo','mdn-like','midnight','monokai','neat','neo','night',
                'oceanic-next','panda-syntax','paraiso-dark','paraiso-light','pastel-on-dark',
                'railscasts','rubyblue','seti','shadowfox','solarized dark','solarized light',
                'the-matrix','tomorrow-night-bright','tomorrow-night-eighties','ttcn','twilight',
                'vibrant-ink','xq-dark','xq-light','yeti','zenburn'],
            editorThemeValue : this.$global.editor.theme,
            editorFontsize : this.$global.editor.fontSize,
        };
    },
    watch: {    
        editorThemeValue : {
            handler(value){
                if(value){
                    this.$global.editor.theme = value;
                    this.$global.$emit('editor-theme-change',value);
                }
            },
            immediate : true
        },
        editorFontsize : {            
            handler(value){
                if(value){
                    this.$global.editor.fontSize = value
                    this.$global.$emit('editor-fontsize-change',value);
                }
            }
        }
    },
};
</script>
