<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="syncClock">
            <v-icon dark>fa-clock-o</v-icon>
            </v-btn>
            <span>Sync Clock</span>
        </v-tooltip>
        <v-snackbar
            color="primary darken-4"
            v-model="snackbar"
            :timeout="0"
            :top="true"
        >
        {{text}}
        <v-fade-transition :hide-on-leave="true">
            <v-icon color="primary lighten-3" size="40" v-if="success === true" style="margin-right:-5px">check_circle_outline</v-icon>
            <v-icon color="primary lighten-3" size="30" v-if="success === false" style="margin-right:-5px">warning</v-icon>
        </v-fade-transition>
        <v-fade-transition :hide-on-leave="true">
        <v-progress-circular
            v-if="success === 'wait'"
            indeterminate
            color="primary lighten-3"
        ></v-progress-circular>
        </v-fade-transition>
        </v-snackbar>
    </div>
</template>

<script>

const engine = Vue.prototype.$engine;
const G = Vue.prototype.$global;
var path = `${engine.util.boardDir}/${G.board.board}/compiler`;
var boardCompiler = engine.util.requireFunc(path);
var comport = '';
export default{
    data () {
        return {
            success : 'wait',
            text : '',
            snackbar: false,            
        }
    },    
    methods : {
        closeSneak(){
            var self = this;
            setTimeout(()=>{
                self.snackbar = false;
            },3000);
        },
        syncClock(){
            this.success = 'wait';
            this.snackbar = true;
            this.text = "Sync clock : ";
            boardCompiler.listPort().then(comp=>{
                console.log(comp);
                comport = comp[0];
                this.text += comport;                
                return boardCompiler.setClock(comport)
            }).then(()=>{
                setTimeout(()=>{
                    this.text += "  success";
                    this.success = true;
                    this.closeSneak();
                },3000);                
            }).catch(err=>{
                console.log('set clock error!');
                console.log(err);
                setTimeout(()=>{
                    this.text += " fail";
                    this.success = false;
                    this.closeSneak();
                },3000);
            });
        }
    }
}
</script>
<style>
</style>