<template>
    
        <multipane class="vertical-panes-editor" layout="vertical" @paneResizeStop="onResizePanel" fill-height>
            <!-- editor -->
            <div class="pane" :style="[this.$global.editor.mode == 1 ? { width:'100%', height :'100%'} : (this.$global.editor.mode == 2 ? { minWidth: '500px', width: '75%' } : { width: '0px' })]">
                <v-tabs 
                    color="primary" 
                    v-model="blockTab" 
                    dark 
                    slider-color="yellow" 
                    :class="blockTabs.length <= 1? 'v-tabs-singletab' : 'v-tabs-multitab'" 
                >                        
                            <!-- tab header -->
                            <v-tab v-for="(tab, index) in blockTabs" 
                                :key="index" 
                                :href="`#blocktab-${tab.name}`"                                 
                                :style="blockTabs.length <= 1? { display :'none'} : { display: 'block' }"
                            >
                                {{ tab.title }}
                                <v-btn icon small class="close-tab-btn-control">
                                    <v-icon dark>fa-close</v-icon>
                                </v-btn>
                            </v-tab>
                            <!-- end -->
                                             
                        <!-- tab body -->
                        <v-tab-item v-for="(tab, index) in blockTabs" :key="`blocktab-${tab.name}`" :value="`blocktab-${tab.name}`" >
                            <div :id="`blocklyDiv-${tab.name}`" :key="index" style="position:absolute; width:100%; height:100%;" color="onThemeChange"></div> 
                            <xml :id="`toolbox-${tab.name}`" ref=toolbox style="display: none">
                                <category name="Basic" colour="160" icon="/static/icons/SVG/c1.svg">
                                    <block type="basic_led16x8"></block>
                                </category>
                            </xml>
                        </v-tab-item>
                        <!-- end -->
                </v-tabs>

                <v-dialog v-model="variableDialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{variableMessage}}</span>
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
                            <v-btn color="blue darken-1" flat @click="variableDialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" flat :disabled="!validated" ref="variableOK" @click="variableDialog = false">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="musicDialog" max-width="785px">
                    <piano-dialog ref="musicNotes" @close="()=>{musicDialog = false}"></piano-dialog>
                </v-dialog>
            </div>
            <!-- end --> 
            <multipane-resizer v-if="this.$global.editor.mode == 2"></multipane-resizer>
            <!-- source code -->
            <div class="pane" :style="[this.$global.editor.mode == 1 ? {width: '0px'} : (this.$global.editor.mode == 2?{ flexGrow: 1 } : { width:'100%', height :'100%'})]">
                <code-mirror ref="cm" v-if="$global.editor.mode < 3"
                    v-model="$global.editor.rawCode"
                    :options="editor_options">
                </code-mirror>
                <code-mirror ref="cm" v-else-if="$global.editor.mode == 3"
                    v-model="$global.editor.sourceCode"
                    :options="editor_options">
                </code-mirror>
            </div>
            <!-- end -->
        </multipane>    
        
    
</template>
<script>
var path = require('path');
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
//---- search ----//
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/matchesonscrollbar.css';
import 'codemirror/addon/dialog/dialog';
import "codemirror/addon/search/searchcursor";
import "codemirror/addon/search/search";
import "codemirror/addon/scroll/annotatescrollbar";
import "codemirror/addon/search/matchesonscrollbar";
import "codemirror/addon/search/jump-to-line";
// === uitls ===
import util from '@/engine/utils';
const fs = require('fs');
// === engine ===
import plug from '@/engine/PluginManager';
// === dialog ===
import VariableNamingDialog from '@/engine/views/dialog/VariableNamingDialog';
import PianoDialog from '@/engine/views/dialog/PianoDialog';

var renderBlock = function(blocks,level = 1){
    let res = '';
    if(blocks == undefined){        
        return res;
    }
    blocks.forEach(element=>{        
        if(level == 1){
            if(element.blocks){
                var insideBlock = renderBlock(element.blocks,level+1);
            }else{
                var insideBlock = "";
            }
            if(element.xml){
                var insideBlock = element.xml;
            }
            var custom = element.custom? `custom="${element.custom}" `:"";
            res += `<category name="${element.name}" colour="${element.color}" ${custom}icon="${element.icon}">${insideBlock}</category>`;
        }else{            
            if(typeof(element) === 'string'){ //block element
                res += `<block type="${element}"></block>`;
            }else if(typeof(element) == 'object' && element.xml){
                res += element.xml;
            }else if(typeof(element) === 'object' && 'type' in element && element.type == 'category'){
                let insideBlock = renderBlock(element.blocks,level+1);
                var custom = element.custom? `custom="${element.custom}" `:"";
                res += `<category name="${element.name}" ${custom}icon="${element.icon}">${insideBlock}</category>`;
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

var loadAndRenderPluginsBlock = function(Blockly,boardName)
{
    var pluginName = 'Plugins';
    var plugins = plug.loadPlugin(boardName);
    let catStr = '';
    //console.log(plugins);
    plugins.categories.forEach(cat=>{        
        let blockStr = '';
        Object.keys(cat.plugins).forEach(subPlugin => {
            let blocks = cat.plugins[subPlugin].blocks;
            let dir = cat.plugins[subPlugin].dir;
            //----- load block -----//
            try{
                eval(fs.readFileSync(`${dir}/blocks.js`,'utf8'));
                eval(fs.readFileSync(`${dir}/generators.js`,'utf8'));
            }catch(e){
                console.log(`Error : cannot load plugin block [${subPlugin}] => `+e);
            }
            //----------------------//
            blocks.forEach(typeName => {
                blockStr += `<block type="${typeName}"></block>`;
            });
        })        
        //let thName = cat.category.title;
        let name = cat.category.title;
        let color = cat.category.color;
        catStr += `<category name="${name}" colour="${color}">${blockStr}</category>`;
    });
    return `<sep></sep><category name="${pluginName}" color="290">${catStr}</category>`;
}

var loadBlock = function(boardName,target){
    //look for board first
    var blockFile = `${util.boardDir}/${boardName}/block/config.js`;    
    if(!util.fs.existsSync(blockFile)){
        return null;
    }
    var blocks = util.requireFunc(blockFile);
    return blocks;
};
var initBlockly = function(boardInfo){
    var boardName = boardInfo.name;
    var platformName = boardInfo.platform;
    var blockyDir = `${util.boardDir}/${boardName}/block`;
    var platformBlockDir = `${util.platformDir}/${platformName}/block`;
    //lookup platform first
    var platformBlockFile =  util.fs.readdirSync(platformBlockDir).map(obj => `${platformBlockDir}/${obj}`);
    var blocklyFile = util.fs.readdirSync(blockyDir).map(obj => `${blockyDir}/${obj}`);
    var blocks = platformBlockFile.concat(blocklyFile);
    if(blocklyFile.length > 0){
        blocklyFile.sort(function(a, b){
            return a.length - b.length;
        });
        blocklyFile.forEach(element => {
            if(element.includes('config.js')){ //skip config.js file
                return;
            }
            try {
                let name = path.basename(element);
                if(name.startsWith('block') && name.endsWith('js')){
                    util.requireFunc(element)(Blockly);
                    let generatorFile = name.replace("block","generator");
                    util.requireFunc(`${path.dirname(element)}/${generatorFile}`)(Blockly);
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
var myself;
export default {
    name: 'editor',
    components: {
        Multipane,
        MultipaneResizer,
        CodeMirror,
        VariableNamingDialog,
        PianoDialog
    },
    data(){
     return {
        blockTab : null,
        blockTabs : [],

        workspace: null,
        toolbox: null,
        editor_options: {
            mode: 'text/x-c++src',
            theme: 'mdn-like',
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            readOnly: true,
            extraKeys: {"Alt-F": "findPersistent"},
        },
        editorTabs : [
           { name : 'main', filename : 'main.cpp' }
        ],
        variableDialog : false,
        variable_name : this.name,
        variableMessage : 'Variable Name',
        validated : false,
        variable_name_validator : value => {
            const pattern = /(?:^(uint16\s*|uint32\s*|uint8\s*|auto\s*|const\s*|unsigned\s*|signed\s*|register\s*|volatile\s*|static\s*|void\s*|short\s*|long\s*|char\s*|int\s*|float\s*|double\s*|_Bool\s*|complex\s*|return\s*)+$)|(?:\s+\*?\*?\s*)|(^[0-9])|([^_A-Za-z0-9]+)/;            
            this.validated = !pattern.test(value);
            if(value == null || value == ""){
                this.validated = false;
            }
            return this.validated || 'Invalid variable name';
        },
        musicDialog : false,
     }
   },
   mounted(){
        myself = this;
        Blockly.Msg = Object.assign(en, Blockly.Msg);
        Blockly.Msg = Blockly.Msg();

        Blockly.utils.getMessageArray_ = function () {
            return Blockly.Msg
        }
        
        /*let createdBlock = this.createBlockly(this.blockTabs[0].name);
        this.blockTabs[0].workspace = createdBlock.workspace;
        this.blockTabs[0].toolbox = createdBlock.toolbox;
        this.workspace = this.blockTabs[0].workspace;
        this.toolbox = this.blockTabs[0].toolbox;
        */
        this.onNewTab({
            type : 'block',
            data : {
                name : '1',
                title : 'Untitled *',
            }            
        }).then(()=>{
            
        });

        // override prompt function, fixed electron dialog problem
        Blockly.prompt = function(message, defaultValue, callback) {
            myself.variable_name = defaultValue;                   
            myself.variableMessage = message;            
            myself.$refs.variableOK.$on('click',function(){
                var new_val = myself.variable_name;
                if ((new_val) && (new_val != '') && myself.validated) {
                    callback(new_val);
                } else {
                    callback(null);
                }
                myself.$refs.variableOK.$off('click');
                myself.variableDialog = false;

            });
            myself.variableDialog = true;
        };

        Blockly.music = function(notes,cb){
            if(notes){
                myself.$refs.musicNotes.select = notes.split(',');
            }
            myself.$refs.musicNotes.$on('result',function(n){
                myself.musicDialog = false;
                cb(n);
            });
            myself.musicDialog = true;
        };
        //---- theme config ---///
        if(this.$vuetify.theme.primary == null){
            this.$vuetify.theme.primary = '#009688';
        }
        console.log('blocly mounted');        

        //---- global event
        this.$global.$on('theme-change',this.onThemeChange);
        this.$global.$on('panel-resize',this.onResizePanel);
        this.$global.$on('board-change',this.onBoardChange);        
        this.$global.$on('editor-mode-change',this.onEditorModeChange);
        this.$global.$on('editor-theme-change',this.onEditorThemeChange);
        this.$global.$on('editor-fontsize-change',this.onEditorFontsizeChange);
        this.$global.$on('editor-newtab',this.onNewTab);
        
        this.$global.editor.Blockly = Blockly;
    },
    methods:{
        createBlockly(id){
            var toolbox = document.getElementById('toolbox-'+id);
            var workspace = Blockly.inject('blocklyDiv-'+id, {
                grid: {
                    spacing: 25,
                    length: 3,
                    colour: '#ccc',
                    snap: true
                },
                media: './static/blockly/media/',
                //rtl: rtl,
                toolbox: toolbox,
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
            return {workspace : workspace, toolbox : toolbox};
        },
        getCm(){
            try{
                if('cm' in myself.$refs){
                    if(myself.$refs.cm != undefined){
                        return myself.$refs.cm.getCodeMirror();
                    }
                }
                return false;
            }catch(e){
                return false;
            }
        },
        onNewTab(data){            
            if(data.type == 'block'){
                let id = data.data.name;           
                this.blockTabs.push(data.data);
                this.blockTab = 'blocktab-'+id;
                return new Promise((resolve,reject)=>{
                    Vue.nextTick().then(()=>{
                        let blockObj = this.blockTabs[this.blockTabs.length - 1];
                        let createdBlock = this.createBlockly(id);
                        myself.blockTabs[myself.blockTabs.length - 1].workspace = createdBlock.workspace;
                        myself.workspace = createdBlock.workspace;
                        myself.blockTabs[myself.blockTabs.length - 1].toolbox = createdBlock.toolbox;
                        myself.toolbox = createdBlock.toolbox;
                        myself.blockTabs[myself.blockTabs.length - 1].blockCode = data.blockCode;
                        //---- board ----//
                        myself.blockTabs[myself.blockTabs.length - 1].board = myself.$global.board.board_info;
                        //---- render block
                        this.onBoardChange(this.$global.board.board_info);
                        //---- render color
                        let theme = this.$vuetify.theme.primary;
                        let lighter = util.ui.colorLuminance(theme,0.2);
                        let elem = document.body.getElementsByClassName('blocklyToolboxDiv');
                        elem[elem.length - 1].style.backgroundColor = lighter;
                        
                        myself.workspace.addChangeListener(myself.updatecode);
                        Blockly.svgResize(myself.workspace);
                        myself.workspace.scrollCenter();
                        //---- load code ----//            
                        myself.$global.editor.workspace = myself.workspace;            
                        //---- render editor theme
                        myself.onEditorThemeChange(myself.$global.editor.theme);
                        //---- render editor fontsize
                        myself.onEditorFontsizeChange(myself.$global.editor.fontSize);
                        //---- render editor mode change
                        myself.onEditorModeChange(myself.$global.editor.mode);
                        resolve();
                    }).catch(e=>{ reject(e); });
                });
            }else if(data.type == 'code'){
                //TODO : edit here;
            }
        },
        onEditorFontsizeChange(value){
            let cm = myself.getCm();
            if(cm){
                cm.getWrapperElement().style["font-size"] = value+"px";
                cm.refresh();
            }
        },
        onEditorThemeChange(value){
            //console.log(value);
            import('codemirror/theme/'+value+'.css');
            let cm = myself.getCm();
            if(cm){
                cm.setOption("theme", value);
            }
        },
        onEditorModeChange(mode){
            if(mode < 3){
                var xml = '';
                if(this.$global.editor.blockCode != '' &&
                   this.$global.editor.blockCode != '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables></xml>'){
                        var text = this.$global.editor.blockCode;
                        xml = Blockly.Xml.textToDom(text);                    
                }else{
                    var blocks = loadBlock(this.$global.board.board);
                    if(blocks.initial_blocks){
                        xml = Blockly.Xml.textToDom(blocks.initial_blocks);     
                    }
                }
                this.workspace.clear();
                Blockly.Xml.domToWorkspace(xml, Blockly.mainWorkspace);
                setTimeout(() => {
                    Blockly.svgResize(this.workspace);
                }, 300);
            }else if(mode == 3){
                //------ generate template here ------//                
                const boardDirectory = `${util.boardDir}/${this.$global.board.board}`;
                const platformDir = `${util.platformDir}/${this.$global.board.board_info.platform}`;
                if(fs.existsSync(`${boardDirectory}/codegen.js`)){
                    var codegen = util.requireFunc(`${boardDirectory}/codegen`);
                }else{
                    var codegen = util.requireFunc(`${platformDir}/codegen`);
                }
                var {sourceCode,codeContext} = codegen.generate(this.$global.editor.rawCode);
                this.$global.editor.sourceCode = sourceCode;
            }
            if('cm' in this.$refs){
                if(this.$refs.cm != undefined){ //enable editing code
                    let code = this.$refs.cm.getCodeMirror();
                    code.setOption("readOnly", mode < 3);
                }
            }

        },
        onBoardChange: function(boardInfo){            
            initBlockly(boardInfo);
            let boardName = boardInfo.name;
            let blocks = loadBlock(boardName);
            let stringBlock = '';
            if('base_blocks' in blocks){ //render block base from platform
                stringBlock += renderBlock(blocks.base_blocks);
            }

            if('blocks' in blocks){ //render extended block
                stringBlock += renderBlock(blocks.blocks);
            }
            // render plugin blocks            
            stringBlock += loadAndRenderPluginsBlock(Blockly,boardName);
            // TODO : render platform block


            this.toolbox = `<xml id="toolbox" style="display: none">${stringBlock}</xml>`;
            this.workspace.updateToolbox(this.toolbox);

            let found = this.blockTabs.find(obj=> 'blocktab-'+obj.name == this.blockTab);
            if(found){
                found.board = this.$global.board.board_info;
            }            
        },

        onThemeChange(theme){            
            var lighter = util.ui.colorLuminance(theme,0.2);            
            document.body.getElementsByClassName('blocklyToolboxDiv')[0].style.backgroundColor = lighter;
        },

        onResizePanel(pane,container,size){      
            if(this.workspace){
                Blockly.svgResize(this.workspace);
                console.log('editor resized');
            }
        },

        updatecode(e){
            if(e.type != Blockly.Events.UI){                
                this.$global.editor.rawCode = Blockly.JavaScript.workspaceToCode(this.workspace);
                var xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
                this.$global.editor.blockCode = xml;
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
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }
    },
    watch : {
        blockTab : function(val){
            let found = this.blockTabs.find(obj=> 'blocktab-'+obj.name == val);
            if(found){
                this.workspace = found.workspace;
                this.toolbox = found.toolbox;
                if(found.board){
                    if(this.$global.board.board_info.name != found.board.name){
                        this.$global.board.board_info =  found.board;
                        this.$global.board.board = found.board.name;
                        this.$global.$emit('board-change',this.$global.board.board_info);
                    }
                }
                /*Vue.nextTick(()=>{
                    this.onResizePanel(null,null,null);
                });*/
                setTimeout(()=>{
                    this.onResizePanel(null,null,null);                
                },500);
            }
            
        }
    }
}
</script>

<style>
.v-tabs{
    /*height: 100vh;*/
}
.v-tabs__container{
    height: unset;
}
.v-icon.v-icon.v-icon--link{
    display : grid!important;
}
.v-tabs__div{
    height: 30px;
    font-size: 12px !important;
}
.v-tabs__slider {
    height: 3px !important;
}
.v-tabs-multitab .v-window-item{
    height: calc(100vh - 64px - 55px) !important;
}
.v-tabs-multitab > .v-tabs__bar{
    display : block;
}
.v-tabs-singletab .v-window-item{
    height: calc(100vh - 64px - 24px) !important;
}
.v-tabs-singletab > .v-tabs__bar{
    display : none;
}
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
  background: #fff;  
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
.blocklyHtmlInput{
    background-color:white !important;
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
    