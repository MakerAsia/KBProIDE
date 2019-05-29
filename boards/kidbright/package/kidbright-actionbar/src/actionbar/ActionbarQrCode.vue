<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="showQRCode">
                <v-icon dark>fa-qrcode</v-icon>
            </v-btn>
            <span>Show QR Code</span>
        </v-tooltip>
        <v-dialog v-model="qrDialog" width="270">
            <v-fade-transition :hide-on-leave="true">
                <v-layout align-center justify-center column fill-height class="pa-3 white" v-if="success !== true">
                    <v-flex sm12 text-xs-center>
                        <v-progress-circular v-if="success === 'wait'"
                                             :size="50"
                                             color="primary"
                                             indeterminate
                        ></v-progress-circular>
                        <v-icon color="red" size="50" v-if="success === false">warning</v-icon>
                    </v-flex>
                    <v-flex sm12 text-xs-center mt-2>
                        {{text}}
                    </v-flex>
                </v-layout>
            </v-fade-transition>
            <v-flex sm12 text-xs-center pa-2 class="white" v-if="success === true">
                {{text}}
                <v-fade-transition :hide-on-leave="true">
                    <VueQRCodeComponent :text="text" v-if="success === true"></VueQRCodeComponent>
                </v-fade-transition>
            </v-flex>
        </v-dialog>
    </div>
</template>

<script>
  import VueQRCodeComponent from "vue-qrcode-component";

  const engine = Vue.prototype.$engine;
  const G = Vue.prototype.$global;
  var path = `${engine.util.boardDir}/${G.board.board}/compiler`;
  var boardCompiler = engine.util.requireFunc(path);
  var comport = "";
  export default {
    components: {
      VueQRCodeComponent,
    },
    data() {
      return {
        success: "wait",
        text: "",
        qrDialog: false,
      };
    },
    methods: {
      showQRCode() {
        this.success = "wait";
        this.text = "Generate QR Code";
        boardCompiler.listPort().then(comp => {
          comport = comp[0];
          return boardCompiler.readMac({portName: comport});
        }).then((boardMac) => {
          this.text = boardMac.mac;
          this.success = true;
        }).catch(err => {
          this.success = false;
          this.text = "Error : " + err;
        });
        this.qrDialog = true;
      },
    },
  };
</script>
<style>
</style>
