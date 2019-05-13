<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="compileDialog = true">
                <v-icon dark>fa-check</v-icon>
            </v-btn>
            <span>Just Compile</span>
        </v-tooltip>

        <v-widget title="Basic Usage">
            <div slot="widget-content">
                <v-dialog v-model="compileDialog" persistent max-width="450px">
                    <v-card>
                        <v-card-title>
                            <span class="headline">Compile Program</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-layout align-center column>
                                    <v-flex xs12>
                                        <v-progress-circular v-if="compileStep <= 2"
                                                             :size="80"
                                                             :width="8"
                                                             color="primary"
                                                             indeterminate>
                                        </v-progress-circular>
                                        <v-fade-transition :hide-on-leave="true">
                                            <v-icon color="green" size="110" v-if="compileStep > 2">
                                                check_circle_outline
                                            </v-icon>
                                        </v-fade-transition>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            <v-flex xs12>
                                <v-stepper v-model="compileStep" vertical class="elevation-0 pb-0">
                                    <v-stepper-step step="1" :complete="compileStep > 1"
                                                    :rules="[()=>{ return stepResult['1'].result }]">
                                        Finding board
                                        <small v-if="compileStep > 1">{{stepResult["1"].msg}}</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="1" v-if="compileStep >= 1">
                                        {{stepResult["1"].msg}}
                                    </v-stepper-content>

                                    <v-stepper-step step="2" :complete="compileStep > 2"
                                                    :rules="[()=>{ return stepResult['2'].result }]">
                                        Compile the code
                                        <small v-if="compileStep > 2">{{stepResult["2"].msg}}</small>
                                    </v-stepper-step>
                                    <v-stepper-content step="2" v-if="compileStep >= 2">
                                        {{stepResult["2"].msg}}
                                    </v-stepper-content>
                                </v-stepper>
                            </v-flex>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="compileDialog = false"
                                   :disabled="compileStep < 2 && failed === false">Close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
        </v-widget>
    </div>
</template>

<script>
  const engine = Vue.prototype.$engine;
  const G = Vue.prototype.$global;
  var path = `${engine.util.boardDir}/${G.board.board}/compiler.js`;
  var boardCompiler = engine.util.requireFunc(path);

  var comport = "";
  var mac = "";
  var boardName = "";

  export default {
    data() {
      return {
        compileStep: 1,
        compileDialog: false,
        failed: false,
        stepResult: {
          "1": {
            result: true,
            msg: "",
          },
          "2": {
            result: true,
            msg: "",
          },
          "3": {
            result: true,
            msg: "",
          },
        },
      };
    },

    mounted() {

    },

    beforeDestroy() {

    },
    methods: {
      run() { //find port and mac
        console.log("---> step 1 <---");
        comport = G.board.package["arduino-esp32-actionbar"].comport;
        this.stepResult["1"].msg = `Finding board using ${comport}`;
        if (!comport) {
          console.log("------ process error ------");
          this.stepResult["1"].msg = `Cannot find COMPORT : ${comport}`;
          this.stepResult["1"].result = false;
          this.failed = true;
          return;
        }
        boardCompiler.readMac(comport).then(boardMac => {
          this.stepResult["1"].msg += ` MAC ${boardMac.mac}`;
          mac = boardMac.mac;
          boardName = mac.replace(/:/g, "-");
          console.log(`[STEP 1] got it boardName = ${boardName} mac = ${mac}`);
          this.compileStep = 2;
          console.log("---> step 2 <---");
          this.stepResult["2"].msg = "Compile board ... ";
          //------ just update it prevent unupdated data -------//
          G.editor.rawCode = G.editor.Blockly.JavaScript.workspaceToCode(G.editor.workspace);
          var xml = G.editor.Blockly.Xml.domToText(G.editor.Blockly.Xml.workspaceToDom(G.editor.Blockly.mainWorkspace));
          G.editor.blockCode = xml;
          //----------------------------------------------------//
          var rawCode = (G.editor.mode >= 3) ? G.editor.sourceCode : G.editor.rawCode;
          var isSourceCode = (G.editor.mode >= 3) ? true : false;
          var config = {
            board_mac_addr: mac,
            isSourceCode: isSourceCode,
          };
          let compileCb = (status) => {
            console.log(`compileCb called.`);
            this.stepResult["2"].msg = status;
          };
          return boardCompiler.compile(rawCode, boardName, config, compileCb);
        }).then(() => {
          this.compileStep = 3;
          this.stepResult["2"].msg = "Compile done!";
          console.log("---> step 3 <---");
        }).catch(err => {
          console.log("------ process error ------");
          console.log(err);
          this.failed = true;
          if (this.compileStep == 1) {
            this.stepResult["1"].msg = "Cannot find KidBright : " + err;
            this.stepResult["1"].result = false;
          } else if (this.compileStep == 2) {
            this.stepResult["2"].msg = "Compile error : " + err;
            this.stepResult["2"].result = false;
          } else if (this.compileStep == 3) {
            this.stepResult["3"].msg = "Cannot upload program : " + err;
            this.stepResult["3"].result = false;
          }
        });
      },
    },
    watch: {
      "compileDialog": function(val) {
        if (val) {//on opening
          this.compileStep = 1;
          this.failed = false;
          this.stepResult["1"].result = true;
          this.stepResult["2"].result = true;
          this.stepResult["3"].result = true;
          this.run();
        }
      },
    },
  };
</script>
