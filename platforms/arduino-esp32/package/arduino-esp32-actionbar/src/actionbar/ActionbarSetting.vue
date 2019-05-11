<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="settingDialog = true">
                <v-icon dark>fa-cogs</v-icon>
            </v-btn>

            <span>Setup board</span>
        </v-tooltip>

        <v-dialog v-model="settingDialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Setup board</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-subheader class="pa-0 mb-2">Board setting</v-subheader>
                                <div class="d-flex">
                                    <v-combobox
                                            class="mr-3"
                                            v-model="currentPort"
                                            :items="comports"
                                            label="Select COM port"
                                    ></v-combobox>
                                    <v-combobox
                                            v-model="baudrate"
                                            :items="baudrates"
                                            label="Serial upload baudrate"
                                    ></v-combobox>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="settingDialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
  const engine = Vue.prototype.$engine;
  const G = Vue.prototype.$global;
  const SerialPort = engine.util.requireFunc("serialport");
  export default {
    data() {
      return {
        comports: [],
        isFirstLoad: true,
        currentPort: this.$global.board.package["arduino-esp32-actionbar"].comport,
        baudrates: [115200, 256000, 230400, 512000, 921600],
        baudrate: this.$global.board.package["arduino-esp32-actionbar"].baudrate,
        showPassword: false,
        settingDialog: false,
      };
    },
    mounted() {
      this.listPort();
    },
    methods: {
      listPort() {
        SerialPort.list().then((ports) => {
          if (ports.length > 0) {
            const excludePorts = [
              "/dev/tty.Bluetooth-Incoming-Port",
            ];
            this.comports = ports.map(obj => obj.comName);
            this.comports = this.comports.filter(port => !excludePorts.includes(port));
            /*comName : "COM5"
            locationId : undefined
            manufacturer : "FTDI"
            pnpId : "FTDIBUS\VID_0403+PID_6015+DM01USZ0A\0000"
            productId : "6015"
            serialNumber : "DM01USZ0"
            vendorId :"0403"*/
            //this.comport = this.comports[0];
            if (this.isFirstLoad) {
              this.currentPort = this.comports[0];
            }
          }
        }).catch((err) => {
          console.log("Error on list port");
        });
      },
    },
    watch: {
      settingDialog: function(port) {
        if (port) {//on opening
          this.listPort();
          this.isFirstLoad = false;
        }
      },
      currentPort: function(port) {
        console.log(`current Port changed. to ${port}`);
        //this.$global.board.package["arduino-esp32-actionbar"].comport = this.comports[0];
        this.$global.board.package["arduino-esp32-actionbar"].comport = port;
      },
      baudrate: function(rate) {
        console.log(`current Port changed. to ${port}`);
        this.$global.board.package["arduino-esp32-actionbar"].baudrate = rate;
      },
    },
  };
</script>
<style>
</style>
