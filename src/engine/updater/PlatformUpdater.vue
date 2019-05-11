<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="modeDialog = !modeDialog">
                <v-icon dark>fa-users</v-icon>
            </v-btn>
            <span>New platform version</span>
        </v-tooltip>

        <!-- app updater -->
        <v-dialog v-model="updateDialog" scrollable persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Platform Update Alert!</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 300px;">
                    <template v-if="updateStatus === 'UPDATING'">
                        <div class="text-xs-center mt-3">
                            <v-progress-circular
                                    :rotate="360"
                                    :size="200"
                                    :width="30"
                                    :value="updateValue"
                                    :indeterminate="updateValue < 0"
                                    color="teal"
                            >
                                {{ updateValue }} %
                            </v-progress-circular>
                        </div>
                        <div class="text-xs-center mt-4">
                            <span>{{updateText}}</span>
                        </div>
                    </template>
                    <template v-else-if="updateStatus === 'ERROR'">
                        <div class="text-xs-center mt-3">
                            <v-icon :size="200" color="red">fa-exclamation-triangle</v-icon>
                        </div>
                    </template>
                    <template v-else>
                        <p v-html="update.info"></p>
                    </template>
                </v-card-text>
                <v-card-actions v-if="updateStatus !== 'UPDATING'">
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="updateDialog = false">Next time</v-btn>
                    <v-btn color="primary" @click="updateApp">Update Now!</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    <!-- end update -->
    </div>
</template>

<script>
  const fs = require('fs');
  import util from '@/engine/utils';
  const EAU = require('electron-asar-hot-updater');
  const electron = require('electron');
  var mother = null;
  export default {
    name: 'app-updater',
    components: {

    },
    data () {
      return {
        updateDialog : false,
        update : {
          info:'',
          version:'',
        },
        updateStatus : 'IDLE',
        updateValue : 0,
        updateText : '',
      }
    },
    created(){
      mother = this;
      this.checkUpdate();
      electron.ipcRenderer.on('help-update',()=>
      {
        mother.$dialog.notify.info('Checking new update');
        this.checkUpdate(true,true);
      });
    },
    mounted(){

    },
    destroyed() {

    },
    methods:{
      isOnline()
      {
        return window.navigator.onLine;
      },
      checkUpdate(showNotification = false,forceShowUpdate = false){
        this.$db.collection('apps').get().then(appData =>{
          if(appData.size === 1){
            let data = appData.docs[0].data();
            this.update = data;
            //this.updateDialog = true;
            EAU.init({
                       'server': false, // Where to check. true: server side, false: client side, default: true.
                       'debug': false // Default: false.
                     });
            EAU.process(data,function (error, last, body) {
              if(!error){
                if(mother.$global.setting.ignoreUpdateVersion === last && forceShowUpdate === false){
                  console.log('User ignored update popup');
                  return false;
                }
                mother.updateDialog = true;
              }else if (error === 'no_update_available') {
                if(showNotification){
                  mother.$dialog.notify.info('This is newest version');
                }
                return false;
              }else{
                mother.$dialog.notify.error('check version error : ' + error);
                return false;
              }
            });
          }
        });
      },
      ignoreUpdate(version){
        this.$global.setting.ignoreUpdateVersion = version;
        this.updateDialog = false;
      },
      updateApp(){
        this.updateStatus = 'UPDATING';
        this.updateText = 'Downloading ... ';
        EAU.progress(function(state){
          if(state.size.total){
            mother.updateValue = Math.round(state.percent * 100);
            mother.updateText = `Downloading ${util.humanFileSize(state.size.transferred)} of ${util.humanFileSize(state.size.total)}, speed : ${util.humanFileSize(state.speed)}/s`;
          }else{
            mother.updateText = `Downloading ${util.humanFileSize(state.size.transferred)} , speed : ${util.humanFileSize(speed)}/s`;
          }
        });
        /*EAU.progress(function (state) {
            // The state is an object that looks like this:
            // {
            //     percent: 0.5,
            //     speed: 554732,
            //     size: {
            //         total: 90044871,
            //         transferred: 27610959
            //     },
            //     time: {
            //         elapsed: 36.235,
            //         remaining: 81.403
            //     }
            // }
        })*/

        EAU.download(function (error) {
          if (error) {
            mother.updateStatus = 'ERROR';
            mother.updateText = error;
            setTimeout(()=>{
              mother.updateStatus = 'IDLE';
            },2000);
            return false;
          }
          //
          console.log('Update success');
          mother.updateText = "Restarting ...";
          setTimeout(()=>{
            electron.remote.app.relaunch();
            electron.remote.app.exit(0);
          },2000);
        })
      },
    },
    watch : {
      /*pluginDialog : function(val){
          if(val){//on opening
              this.listOnlinePlugin();
          }
      }*/
    }
  }
</script>