<template>
    <multipane class="vertical-panes-editor" layout="vertical" @paneResizeStop="onResizePanel" fill-height>
        <!-- editor -->
        <div class="pane" :style="[this.$global.editor.mode > 1 ? { minWidth: '500px', width: '75%' } : { width:'100%', height :'100%'}]">
            <div id="blocklyDiv" style="position:absolute; width:100%; height:100%;" color="onThemeChange"></div> 
            <xml id="toolbox" ref=toolbox style="display: none">
                <category name="Basic" colour="160" icon="/static/icons/SVG/c1.svg">
                    <block type="basic_led16x8"></block>
                </category>
            </xml>
        </div>
        <!-- end --> 
        <multipane-resizer v-if="this.$global.editor.mode > 1"></multipane-resizer>
        <!-- source code -->
        <div class="pane" :style="{ flexGrow: 1 }" v-if="this.$global.editor.mode > 1">
            <code-mirror
                v-model="sourcecode"
                :options="editor_options">
            </code-mirror>
        </div>
        <!-- end -->
    </multipane>
</template>
<script>
// === UI Management ===
import { Multipane, MultipaneResizer } from 'vue-multipane';
// === Blockly ===
import Blockly from 'vue-blockly';
import en from 'vue-blockly/dist/msg/en';
// === Editor ===
import CodeMirror from 'vue-cm';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/mdn-like.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/selection/active-line';
// === uitls ===
import util from '@/engine/utils';

var renderBlock = function(blocks,level = 1){
    let res = '';
    blocks.forEach(element=>{        
        if(level == 1){            
            let insideBlock = renderBlock(element.blocks,level+1);
            res += `<category name="${element.name}" colour="${element.color}" icon="${element.icon}">${insideBlock}</category>`;
        }else{            
            if(typeof(element) === 'string'){ //block element
                res += `<block type="${element}"></block>`;
            }else if(typeof(element) === 'object' && 'type' in element && element.type == 'category'){
                let insideBlock = renderBlock(element.blocks,level+1);
                res += `<category name="${element.name}" icon="${element.icon}">${insideBlock}</category>`;
            }else if(typeof(element) === 'object' && 'mutation' in element){
                let objKey = [];
                Object.keys(element.mutation).forEach(key=>{
                    objKey.push(`${key}="${element.mutation[key]}"`);
                })
                res += `<mutation ${objKey.join(' ')}></mutation>`;
            }else if(typeof(element) === 'object'){
                let insideBlock = renderBlock(element.blocks,level+1);
                res += `<block type="${element.name}">${insideBlock}</block>`;
            }
        }
    });
    return res;
};

var loadBlock = function(boardName,target){
    //look for board first
    var blockFile = util.boardDir+'/'+boardName+'/block/config.js';
    if(!util.fs.existsSync(blockFile)){
        return null;
    }
    var blocks = util.requireFunc(blockFile);
    //TODO : look for platform blocks

    return blocks;
};
var initBlockly = function(boardName){
    var blockyDir = util.boardDir+'/'+boardName+'/block';
    var blocklyFile = util.fs.readdirSync(blockyDir);
    
    if(blocklyFile.length > 0){
        blocklyFile.sort(function(a, b){  
            return a.length - b.length;
        });
        blocklyFile.forEach(element => {
            if(element.includes('config.js')){ //skip config.js file
                return;
            }            
            try {
                if(element.startsWith('block') && element.endsWith('.js')){
                    util.requireFunc(blockyDir+'/'+element)(Blockly);
                    let generatorFile = element.replace("block","generator");
                    util.requireFunc(blockyDir+'/'+generatorFile)(Blockly);
                }
                
            } catch (error) {
                console.log('load blockly error');
                console.log(error);
            }            
        });
    }
};

/*var reloadBlockly = function(toolbox,workspace,updatecode){
    
}*/
export default {
    name: 'editor',
    components: {
        Multipane,
        MultipaneResizer,
        CodeMirror
    },  
    data(){
     return {
       workspace: null,
       toolbox: null,
       sourcecode : null,
       editor_mode: this.$global.editor.selectedMode,
       editor_options: {
            mode: 'text/x-c++src',
            theme: 'mdn-like',
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            readOnly: true
       }       
     }
   },
   mounted(){        
        Blockly.Msg = Object.assign(en, Blockly.Msg);
        Blockly.Msg = Blockly.Msg();

        Blockly.utils.getMessageArray_ = function () {
            return Blockly.Msg
        }

        this.toolbox = document.getElementById('toolbox');
        this.workspace = Blockly.inject('blocklyDiv', {
            grid: {
                spacing: 25,
                length: 3,
                colour: '#ccc',
                snap: true
            },
            media: './static/blockly/media/',
            //rtl: rtl,
            toolbox: this.toolbox,
            zoom: {
                controls: true,
                wheel: true,
                startScale: 1,
                maxScale: 2,
                minScale: 0.3,
                scaleSpeed: 1.2,
                //scrollbars: false
            },
        });    

        this.workspace.addChangeListener(this.updatecode);
        Blockly.svgResize(this.workspace);
        console.log('blocly mounted');        
        /*if (this.getCookie('lang') == null) {
            console.log('set default lang to en');
		    this.setCookie('lang', 'en', 365);
        }*/
        //---- global event
        this.$global.$on('theme-change',this.onThemeChange);
        this.$global.$on('panel-resize',this.onResizePanel);
        this.$global.$on('board-change',this.onBoardChange);        
        this.$global.$on('editor-change-mode',this.onEditorModeChange);
        let theme = this.$vuetify.theme.primary;
        var lighter = util.ui.colorLuminance(theme,0.2);
        document.body.getElementsByClassName('blocklyToolboxDiv')[0].style.backgroundColor = lighter;
        
        //---- render block
        this.onBoardChange(this.$global.board.board);
    },
    methods:{
        onEditorModeChange(mode){
            Blockly.svgResize(this.workspace);
        },
        onBoardChange: function(boardName){
            initBlockly(boardName);            
            let blocks = loadBlock(boardName);
            let stringBlock = '';
            if('base_blocks' in blocks){ //render block base from platform
                stringBlock += renderBlock(blocks.base_blocks);
            }

            if('blocks' in blocks){ //render extended block
                stringBlock += renderBlock(blocks.blocks);
            }

            this.toolbox = `<xml id="toolbox" style="display: none">${stringBlock}</xml>`;
            this.workspace.updateToolbox(this.toolbox);            
        },

        onThemeChange(theme){            
            var lighter = util.ui.colorLuminance(theme,0.2);            
            document.body.getElementsByClassName('blocklyToolboxDiv')[0].style.backgroundColor = lighter;
        },

        onResizePanel(pane,container,size){            
            Blockly.svgResize(this.workspace);
            console.log('editor resized');
            //console.log(this.$root.editor.MODE);
        },

        updatecode(e){
            if(e.type != Blockly.Events.UI){
                this.sourcecode = Blockly.JavaScript.workspaceToCode(this.workspace); 
            }else{                                
                if(e.element == 'selected'){
                    if(e.newValue != null){ //selected block
                        var block = this.workspace.getBlockById(e.newValue);
                        var code = Blockly.JavaScript.blockToCode(block);
                    }else{ //deselect block
                        console.log("deselected block");
                    }
                }
            }
        },

        getCookie(c_name) {
            if (document.cookie.length > 0) {
                var c_start = document.cookie.indexOf(c_name + '=');
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    var c_end = document.cookie.indexOf(';', c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return null;
        },

        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
    }
}
</script>

<style>
.vertical-panes-editor {
  width: 100%;
  height: 100%; /* minus header and footer */
  border: 1px solid #ccc;
}
.vertical-panes-editor > .pane {
  width : 25%;
}
.vertical-panes > .pane {
  text-align: left;  
  overflow: hidden;
  background: #eee;  
}
.vertical-panes > .pane ~ .pane {
  border-left: 4px solid #ccc;
}
.blocklyToolboxDiv{
    overflow-y: unset !important;    
    background-color: #ACE2FF;
    overflow-x: visible;
    overflow-y: auto;
    position: absolute;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    z-index: 70;
    -webkit-tap-highlight-color: transparent;
}
.layout-v > .multipane-resizer {
    width: 5px;
    height: 100%;
    margin-left: 0px;
    left: 0px;
    background-color: #BBB;
}
.CodeMirror { 
    border: 1px solid #eee;
    height: 100%; 
}  /* minus header and footer */
.blocklyToolboxDiv{
    overflow: scroll;
}
</style>


            <!--<div id="blocklyDiv" style="position:fixed; width:100%; height:95%;">
            </div> 
            <xml id="toolbox" ref=toolbox style="display: none"> 
                <category name='Basic' icon="./static/icons/SVG/c1.svg">
                    <block type="controls_if"></block> 
                    <block type="text"></block>
                    <block type="text_print"></block>         
                </category>    
            </xml>-->
    