<template>
    <v-footer height="23" style="z-index: 99999" min-height="10" class="grey lighten-3">
        <v-layout row wrap>
            <v-flex xs4>
                <v-card>
                    <v-card-text class="px-0 text-xs-left pl-3 pt-0 pb-0 ma-0">
                        <v-icon>fa-microchip</v-icon>
                        <span class="caption">
                            Board : {{$global.board.board_info.title}} ({{$global.board.board_info.name}})
                        </span>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs2>
                <v-card>
                    <v-card-text class="px-0 text-xs-center pa-0 ma-0">
                        <span class="caption">
                            Mode : {{$global.editor.mode}}
                        </span>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card>
                    <v-card-text class="px-0 text-xs-right pr-3 pt-0 pb-0 ma-0">
                        <v-icon v-if="$global.editor.mode >= 3">fa-code</v-icon>
                        <v-icon v-else>fa-puzzle-piece</v-icon>
                        <span class="caption">
                            &nbsp;&nbsp;{{editorStatus}}
                        </span>
                    </v-card-text>
                </v-card>
            </v-flex>
      </v-layout>
    </v-footer>
</template>
<script>
import { stat } from 'fs';
import { setTimeout } from 'timers';
var mother = null;
export default {
    name: 'app-footer',
    data: () => ({
        editorStatus : '',
        infoStatus : '',
        status : '',
        cm : null,
        workspace : null,
    }),
    mounted(){
        mother = null;
        this.mountCm();
        this.mountBly();
    },
    methods : {
        mountCm : function(){
            if(this.$global.editor.Editor){
                this.cm = this.$global.editor.Editor;
                //this.$global.editor.Editor.model.onDidChangeContent(this.updateEditorStatus);
                this.$global.editor.Editor.onDidChangeCursorPosition(this.updateEditorStatus,'',true);
            }else{
                setTimeout(this.mountCm,1000);
            }
        },
        mountBly : function(){
            if(this.$global.editor.workspace){
                this.workspace = this.$global.editor.workspace;
                this.workspace.addChangeListener(this.updateBlock);
            }else{
                setTimeout(this.mountBly,1000);
            }
        },
        updateEditorStatus : function(e){
            if(this.$global.editor.mode >= 3){
                let text = ` Ln ${e.position.lineNumber}, Col ${e.position.column}`;
                this.editorStatus = text;
            }
        },
        updateBlock : function(e){
            var text = "";
            if(e.type == 'ui'){
                if(e.newValue != null){
                    text = "selected  ";
                    var block = this.workspace.getBlockById(e.newValue);
                    if(block){
                        text += block.type;
                    }
                    this.editorStatus = text;
                }else if(e.newValue == null && e.oldValue && e.blockId == null){
                    text += "deselected";
                    this.editorStatus = text;
                }
            }else if(e.type == 'move'){
                let cod = e.newCoordinate;
                text += "move ";
                var block = this.workspace.getBlockById(e.blockId);
                if(block){
                    text += block.type;
                }
                if(cod){
                    text += ` to (${Math.round(cod.x)},${Math.round(cod.y)})`;
                }
                this.editorStatus = text;
            }
        },
        updateInfoStatus : function(text){
            this.infoStatus = text;
        },
        updateStatus : function(text){
            this.status = text;
        }
    }
}
</script>
