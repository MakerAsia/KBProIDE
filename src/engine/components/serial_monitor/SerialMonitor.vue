<template>
    <v-card flat class="serial-console">
    <v-layout row wrap fill-height class="pa-2">
            <v-flex xs3>
                <v-layout wrap>
                                <v-flex xs12>
                                    <div class="d-flex">
                                        <v-combobox
                                                dense
                                                class="mr-3"
                                                v-model="currentPort"
                                                :items="comports"
                                                label="Select COM port"
                                        ></v-combobox>
                                        <v-combobox
                                                dense
                                                v-model="baudrate"
                                                :items="baudrates"
                                                label="Serial upload baudrate"
                                        ></v-combobox>
                                    </div>
                                </v-flex>
                            </v-layout>
            </v-flex>
            <v-flex xs9 class="pa-1">
                <v-card style="font-size:13px;min-height: 150px; max-height : 500px;overflow-y: scroll">
                    123456
                </v-card>
            </v-flex>
    </v-layout>
        <v-speed-dial
                v-model="fab"
                :top="true"
                :right="true"
                direction="bottom"
                transition="scale-transition"
        >
            <template v-slot:activator>
                <v-btn v-model="fab" color="blue darken-2" dark fab small>
                    <v-icon>account_circle</v-icon>
                    <v-icon>close</v-icon>
                </v-btn>
            </template>
            <v-btn fab dark small color="green">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="indigo">
                <v-icon>add</v-icon>
            </v-btn>
        </v-speed-dial>
    </v-card>
</template>
<script>
  export default {
    name: "SerialMonitor.vue",
    data(){
      return {
        fab: false,
        currentPort : "COM3",
        comports : [],
        baudrate : 115200,
        baudrates: [ 300,1200,2400,4800,9600,19200,38400,57600,74880,115200,230400,250000,500000,921600],
        send_postfix: [
          { label: "RAW", value: "", content: "" },
          { label: "LF", value: "\n", content: "\\n" },
          { label: "CR", value: "\r", content: "\\r" },
          { label: "CRLF", value: "\r\n", content: "\\r\\n" }
        ],
        infos: {
          rx_bytes: 0,
          tx_bytes: 0,
          current_port: "None",
          current_baudrate: 115200,
          current_data_length: "eight",
          current_parity_bit: "no",
          current_stop_bit: "one",
          current_flow_ctrl: false,//false
          string_show_time: false,
          string_show_send: false,
          t_con_msg: [],
          is_connected: false,
          connect_id: null,
          paused: false,
          current_send_type: "TEXT",
          current_send_postfix: "\n",
          current_send_loop_ms: 0,
          current_send_times: 1,
          send_min_loop_ms: 10,
          send_is_sending: false,
          btn_send_disabled: false
        },
      }
    }
  };

</script>

<style>
    .serial-console .v-speed-dial {
        position: absolute;
    }

    .serial-console .v-btn--floating {
        position: relative;
    }
</style>