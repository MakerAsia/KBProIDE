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
                        <v-layout col>
                            <v-flex xs12>
                                <v-btn color="primary">
                                    connect
                                </v-btn>
                                <v-menu top :offset-y="true">
                                    <template #activator="{ on: menu }">
                                        <v-tooltip top>
                                            <template #activator="{ on: tooltip }">
                                                <v-btn fab color="primary" style="width:36px; height: 36px;" v-on="{ ...tooltip, ...menu }">
                                                    <v-icon>fa-cog</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>setup sending</span>
                                        </v-tooltip>
                                    </template>
                                    <v-card>
                                        <v-container fluid grid-list>
                                            <v-layout col wrap>
                                                <v-flex xs12>
                                                    <v-header class="title">Serial control</v-header>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout col wrap>
                                                <v-flex xs4>
                                                    <v-subheader class="pl-0">Data Bit</v-subheader>
                                                    <v-btn-toggle v-model="s">
                                                        <v-btn flat>8</v-btn>
                                                        <v-btn flat>7</v-btn>
                                                    </v-btn-toggle>
                                                </v-flex>
                                                <v-flex xs6>
                                                    <v-subheader class="pl-0">Parity bit</v-subheader>
                                                    <v-btn-toggle v-model="s">
                                                        <v-btn flat>NONE</v-btn>
                                                        <v-btn flat>ODD</v-btn>
                                                        <v-btn flat>EVEN</v-btn>
                                                    </v-btn-toggle>
                                                </v-flex>
                                            </v-layout>
                                            <v-layout col wrap>
                                                <v-flex xs4>
                                                    <v-subheader class="pl-0">Stop bit</v-subheader>
                                                    <v-btn-toggle v-model="s">
                                                        <v-btn flat>1</v-btn>
                                                        <v-btn flat>2</v-btn>
                                                    </v-btn-toggle>
                                                </v-flex>
                                                <v-flex xs6>
                                                    <v-subheader class="pl-0">Flow Control</v-subheader>
                                                    <v-btn-toggle v-model="s">
                                                        <v-btn flat>NONE</v-btn>
                                                        <v-btn flat>CTS/RTS</v-btn>
                                                    </v-btn-toggle>
                                                </v-flex>
                                            </v-layout>
                                        </v-container>
                                    </v-card>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs9 class="pa-1" style="display: flex; flex-direction: column">
                <v-flex style="display: flex; flex: 1 1 auto;">
                    <v-card style="font-size:13px;overflow-y: scroll; width: 100%;">
                        123456
                    </v-card>
                </v-flex>
                <div class="mt-2" style="display:flex;flex-direction: row">
                    <v-flex style="flex:1 1 auto; height: 45px;">
                        <v-text-field :height="25" clearable
                                      label="Message"
                        ></v-text-field>
                    </v-flex>
                    <div style="padding: 5px; flex: 0 1 auto;">
                        <v-tooltip top>
                            <v-btn-toggle v-model="current_postfix" slot="activator">
                                <v-btn flat>RAW</v-btn>
                                <v-btn flat>LF</v-btn>
                                <v-btn flat>CR</v-btn>
                                <v-btn flat>CRLF</v-btn>
                            </v-btn-toggle>
                            <span>Send postfix</span>
                        </v-tooltip>
                    </div>
                    <div style="flex: 0 1 auto;">
                        <v-menu top :offset-y="true">
                            <template #activator="{ on: menu }">
                                <v-tooltip top>
                                    <template #activator="{ on: tooltip }">
                                        <v-btn fab color="primary" style="width:36px; height: 36px;" v-on="{ ...tooltip, ...menu }">
                                            <v-icon>fa-cog</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>setup sending</span>
                                </v-tooltip>
                            </template>
                            <v-card>
                            <v-container fluid grid-list>
                                <v-layout col wrap>
                                    <v-flex xs12>
                                        <v-subheader class="pl-0">Send : {{send_time}} time{{send_time>1?'s':''}}</v-subheader>
                                        <v-slider v-model="send_time" min="1" max="100" thumb-label></v-slider>
                                    </v-flex>

                                    <v-flex xs12>
                                        <v-subheader class="pl-0">Delay : {{send_delay}} ms</v-subheader>
                                        <v-slider v-model="send_delay" min="100" max="10000" step="50" thumb-label></v-slider>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                            </v-card>
                        </v-menu>

                    </div>
                    <v-flex style="flex: 0 1 auto;">
                        <v-btn block color="primary">
                            Send{{send_time>1?' ('+send_time+') ':''}}
                            <v-icon v-if="send_time===1" right dark>fa-paper-plane</v-icon>
                            <v-icon v-else dark>loop</v-icon>
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
        current_postfix : 3,
        send_time : 1,
        send_delay : 50,
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