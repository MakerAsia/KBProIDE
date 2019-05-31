<template class="absolute">
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
            <v-flex xs9 class="pa-1" style="display: flex; flex-direction: column">
                <v-flex style="display: flex; flex: 1 1 auto;">
                    <v-card style="font-size:13px;overflow-y: scroll; width: 100%;">
                        123456
                    </v-card>
                </v-flex>
                <div class="d-flex mt-2">
                    <v-flex xs11 style="height: 45px;">
                        <v-text-field :height="25"
                                      label="Message"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs1>
                        <v-btn block color="primary">
                            Send
                            <v-icon right dark>fa-paper-plane</v-icon>
                        </v-btn>
                    </v-flex>
                </div>
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
                <v-btn v-model="fab" color="primary" dark fab small>
                    <v-icon v-if="showMode==='text'">list_alt</v-icon>
                    <v-icon v-if="showMode==='graph'">show_chart</v-icon>
                    <v-icon>close</v-icon>
                </v-btn>
            </template>
            <v-tooltip left>
                <v-btn fab dark small color="primary" slot="activator" @click="showMode='text'">
                    <v-icon>list_alt</v-icon>
                </v-btn>
                <span>Show Text</span>
            </v-tooltip>
            <v-tooltip left>
                <v-btn fab dark small color="primary" slot="activator" @click="showMode='graph'">
                    <v-icon>show_chart</v-icon>
                </v-btn>
                <span>Show Graph</span>
            </v-tooltip>
        </v-speed-dial>
    </v-card>
</template>
<script>
  export default {
    name: "SerialMonitor.vue",
    data() {
      return {
        fab: false,
        currentPort: "COM3",
        comports: [],
        showMode: "text",
        baudrate: 115200,
        baudrates: [300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 74880, 115200, 230400, 250000, 500000, 921600],
        send_postfix: [
          {label: "RAW", value: "", content: ""},
          {label: "LF", value: "\n", content: "\\n"},
          {label: "CR", value: "\r", content: "\\r"},
          {label: "CRLF", value: "\r\n", content: "\\r\\n"},
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
          btn_send_disabled: false,
        },
      };
    },
  };

</script>
<style scoped>
    .serial-console {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
    }
</style>
<style>
    .serial-console .v-speed-dial {
        position: absolute;
    }

    .serial-console .v-btn--floating {
        position: relative;
    }
    /*
    .v-tabs .v-window-item .v-window__container{
        position: absolute !important;
        width: 100%;
        height: 100%;
    }*/
</style>