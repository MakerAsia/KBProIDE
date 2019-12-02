<template class="absolute">
    <v-card flat class="serial-console">
        <v-layout row wrap fill-height class="pa-2" style="width: 100%;">
            <v-flex xs3>
                <v-flex style="display: flex; flex-direction: column; height: 100%; width: 100%">
                    <div class="d-flex" style="flex-grow: 0">
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
                    <v-layout col style="display: flex; flex: 0 1 auto; flex-grow: 1; overflow: hidden;">
                        <v-flex v-if="showMode === 'text'" xs12 class="ml-2">
                            <v-switch style="height: 25px; margin-top: 0px;"
                                      v-model="auto_scroll"
                                      :label="`Auto Scroll : ${auto_scroll}`">
                            </v-switch>
                            <v-switch style="height: 25px;"
                                      v-model="display_raw"
                                      :label="`Display Hex String : ${display_raw}`">
                            </v-switch>
                        </v-flex>
                        <v-flex xs12 v-else>
                            <v-flex class="pa-2">
                            <span class="subheading">
                                Config dataset :
                            </span>
                                <div class="text-xs-center pa-2"
                                     style="display: flex; justify-content: center; flex-wrap: wrap;">
                                    <!--label: labels[j],
                      fill: false,
                      borderColor: this.get_random_color(),
                      borderWidth: 1,
                      pointRadius: 3,
                      pointHoverRadius: 3,-->
                                    <template v-if="graph_data.datasets.length > 0">
                                        <v-menu v-for="(item,inx) in graph_data.datasets"
                                                :offset-y="true"
                                                top
                                                transition="scale-transition"
                                                origin="left bottom"
                                                :key="inx"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-chip pill v-on="on">
                                                    <v-avatar small :color="getColor(item.borderColor)"></v-avatar>
                                                    <span class="pr-2">
                                                   {{ item.label }}
                                                </span>
                                                </v-chip>
                                            </template>
                                            <v-card class="label-dialog pa-3"
                                                    @click.native.stop
                                                    @click.native.stop.prevent
                                                    @click.stop
                                            >
                                                <v-text-field
                                                        v-model="item.label"
                                                        :height="25"
                                                        label="Variable Name"
                                                ></v-text-field>
                                                <v-layout row>
                                                    <v-flex xs7>
                                                    <span class="subheading">
                                                        Line Color :
                                                    </span>
                                                        <chrome-picker @input="e=>{item.borderColor = e.hex}"
                                                                       :value="item.borderColor"/>
                                                        <compact-picker @input="e=>{item.borderColor = e.hex}"
                                                                        :value="item.borderColor"
                                                                        style="width: 225px;"/>
                                                    </v-flex>
                                                    <v-flex xs5 class="pl-2">
                                                    <span class="subheading">
                                                        Curve :
                                                    </span>
                                                        <v-slider v-model="item.lineTension" :min="0" :max="1"
                                                                  :step="0.01" thumb-label></v-slider>
                                                        <span class="subheading">
                                                        Line Size :
                                                    </span>
                                                        <v-slider v-model="item.borderWidth" :min="1" :max="10"
                                                                  :step="0.2" thumb-label></v-slider>
                                                        <span class="subheading">
                                                        Dot Size :
                                                    </span>
                                                        <v-slider v-model="item.pointRadius" :min="0" :max="5"
                                                                  :step="0.1" thumb-label></v-slider>
                                                    </v-flex>
                                                </v-layout>
                                            </v-card>
                                        </v-menu>
                                    </template>
                                    <span v-else class="subheading">
                                    -- No Data --
                                </span>
                                </div>
                            </v-flex>
                            <v-divider></v-divider>
                            <!--v-flex class="pa-2">
                                <span class="subheading">
                                    Display Size :
                                </span>
                                <v-slider @change="v=>{y_length = v; max_graph_len =v;}" v-model="max_graph_len" :min="10" :max="1000" class="pl-2 pr-2"></v-slider>
                            </v-flex-->
                        </v-flex>
                    </v-layout>
                    <v-layout col style="display: flex; flex: 0 1 auto;">
                        <v-flex xs12>
                            <v-btn :color="isOpened?'error':'primary'" @click="connect">
                                {{isOpened?"Disconnect" : "Connect"}}
                            </v-btn>
                            <v-btn fab @click="pausePlaySerial" :disabled="!isOpened"
                                   :color="isPause?'warning':'primary'"
                                   style="width:36px; height: 36px;">
                                <v-icon v-if="!isPause">fa-pause</v-icon>
                                <v-icon v-else>fa-play</v-icon>
                            </v-btn>
                            <v-btn fab @click="reconnect" color="primary" :disabled="!isOpened"
                                   style="width:36px; height: 36px;">
                                <v-icon>fa-repeat</v-icon>
                            </v-btn>
                            <v-menu top :offset-y="true">
                                <template #activator="{ on: menu }">
                                    <v-tooltip top>
                                        <template #activator="{ on: tooltip }">
                                            <v-btn fab color="primary" style="width:36px; height: 36px;"
                                                   v-on="{ ...tooltip, ...menu }">
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
                                                <div class="title">Serial control</div>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout col wrap>
                                            <v-flex xs4>
                                                <v-subheader class="pl-0">Data Bit</v-subheader>
                                                <v-btn-toggle v-model="serial_data_bit">
                                                    <v-btn flat>8</v-btn>
                                                    <v-btn flat>7</v-btn>
                                                </v-btn-toggle>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-subheader class="pl-0">Parity bit</v-subheader>
                                                <v-btn-toggle v-model="serial_parity_bit">
                                                    <v-btn flat>NONE</v-btn>
                                                    <v-btn flat>ODD</v-btn>
                                                    <v-btn flat>EVEN</v-btn>
                                                </v-btn-toggle>
                                            </v-flex>
                                        </v-layout>
                                        <v-layout col wrap>
                                            <v-flex xs4>
                                                <v-subheader class="pl-0">Stop bit</v-subheader>
                                                <v-btn-toggle v-model="serial_stop_bit">
                                                    <v-btn flat>1</v-btn>
                                                    <v-btn flat>2</v-btn>
                                                </v-btn-toggle>
                                            </v-flex>
                                            <v-flex xs6>
                                                <v-subheader class="pl-0">Flow Control</v-subheader>
                                                <v-btn-toggle v-model="serial_flow_ctrl">
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
            </v-flex>
            <v-flex xs9 class="pa-1" style="display: flex; width: 100%; flex-direction: column">
                <v-flex style="display: flex; flex: 1 1 auto; flex-basis: 50%">
                    <v-card v-if="showMode==='text'" style="font-size:13px;overflow-y: scroll; width: 100%;">
                        <ol ref="monitor" class="monitor-line">
                            <li v-for="(line,inx) in serial_data" :key="inx" class="serial-line">
                                {{line}}
                            </li>
                        </ol>
                    </v-card>
                    <line-chart v-else :chartData="graph_data" :options="graph_options" ref="line_chart"
                                style="width: 100%"></line-chart>
                </v-flex>
                <div class="mt-2" style="display:flex;flex-direction: row">
                    <v-flex style="flex:1 1 auto; height: 45px;">
                        <v-text-field
                                v-model="send_string"
                                :height="25"
                                clearable
                                :disabled="!isOpened"
                                label="Message"
                        ></v-text-field>
                    </v-flex>
                    <div style="padding: 5px; flex: 0 1 auto;">
                        <v-tooltip top>
                            <v-btn-toggle v-model="current_postfix" slot="activator">
                                <v-btn flat v-for="(msg,ind) in send_postfix" :key="ind">{{msg.label}}</v-btn>
                            </v-btn-toggle>
                            <span>Send postfix</span>
                        </v-tooltip>
                    </div>
                    <div style="flex: 0 1 auto;">
                        <v-menu top :offset-y="true">
                            <template #activator="{ on: menu }">
                                <v-tooltip top>
                                    <template #activator="{ on: tooltip }">
                                        <v-btn fab color="primary" style="width:36px; height: 36px;"
                                               v-on="{ ...tooltip, ...menu }">
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
                                            <v-subheader class="pl-0">Send : {{send_time}} time{{send_time>1?"s":""}}
                                            </v-subheader>
                                            <v-slider v-model="send_time" min="1" max="100" thumb-label></v-slider>
                                        </v-flex>

                                        <v-flex xs12>
                                            <v-subheader class="pl-0">Delay : {{send_delay}} ms</v-subheader>
                                            <v-slider v-model="send_delay" min="100" max="10000" step="50"
                                                      thumb-label></v-slider>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card>
                        </v-menu>
                    </div>
                    <v-flex style="flex: 0 1 auto;">
                        <v-btn @click="sendData(send_string,send_time,send_delay)" block color="primary"
                               :disabled="!isOpened">
                            Send{{send_time>1?" ("+send_time+") ":""}}
                            <v-icon v-if="send_time===1" right dark>fa-paper-plane</v-icon>
                            <v-icon v-else dark>loop</v-icon>
                        </v-btn>
                    </v-flex>
                </div>
            </v-flex>
        </v-layout>
        <div v-if="showMode==='graph'" class="auto-scroll-switch">
            <v-tooltip top>
                <v-btn small fab color="primary" @click="saveGraphImage" slot="activator">
                    <v-icon>image</v-icon>
                </v-btn>
                <span>Save graph as image</span>
            </v-tooltip>
        </div>
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
                    <v-icon v-else-if="showMode==='graph'">show_chart</v-icon>
                    <!--v-icon>close</v-icon-->
                </v-btn>
            </template>
            <v-tooltip left>
                <v-btn fab small color="primary" slot="activator" @click="showMode='text'">
                    <v-icon>list_alt</v-icon>
                </v-btn>
                <span>Show Text</span>
            </v-tooltip>
            <v-tooltip left>
                <v-btn fab small color="primary" slot="activator" @click="showMode='graph'">
                    <v-icon>show_chart</v-icon>
                </v-btn>
                <span>Show Graph</span>
            </v-tooltip>
        </v-speed-dial>
    </v-card>
</template>
<script>
  const util = Vue.prototype.$engine.util;
  const SerialPort = util.requireFunc("serialport");
  //const Readline = util.requireFunc("@serialport/parser-readline");
  import LineChart from "./LineChart";
  import {Compact, Chrome} from "vue-color";
  import Slider from "vue-color/src/components/Slider";

  export default {
    name: "SerialMonitor",
    components: {
      Slider,
      "line-chart": LineChart,
      "compact-picker": Compact,
      "chrome-picker": Chrome
    },
    data() {
      return {
        fab: false,
        currentPort: "",
        comports: [],
        port: null,
        isOpened: false,
        isPause: false,
        showMode: "text",
        baudrate: 115200,
        baudrates: [300, 1200, 2400, 4800, 9600, 19200, 38400, 57600, 74880, 115200, 230400, 250000, 500000, 921600],

        serial_data_bit: 0,
        serial_stop_bit: 0,
        serial_parity_bit: 0,
        serial_flow_ctrl: 0,
        serial_connect_info: {
          data_bit: [8, 7],
          stop_bit: [1, 2],
          parity_bit: ["none", "even", "odd"],
          flow_control: [false, true]
        },

        current_postfix: 3,
        send_time: 1,
        send_delay: 50,
        send_string: "",
        send_postfix: [
          { label: "RAW", value: "", content: "" },
          { label: "LF", value: "\n", content: "\\n" },
          { label: "CR", value: "\r", content: "\\r" },
          { label: "CRLF", value: "\r\n", content: "\\r\\n" }
        ],

        serial_data: [],
        received_count: 0,
        max_line: 1000,
        auto_scroll: true,
        display_raw: false,

        graph_data: {
          labels: [],
          datasets: []
        },
        graph_dataset_labels: "Var 1",
        graph_dataset_count: 0,
        max_graph_len: 100,
        test_color: "#02ff00",
        colors: [
          "#02ff00",
          "#fef000",
          "#fd7600",
          "#fd1200",
          "#fc004f",
          "#ef00b3",
          "#7200d7",
          "#1800b3",
          "#00a5ff"
        ],

        graph_options: {
          y_length: 100,
          responsive: true,
          fill: false,
          maintainAspectRatio: false,
          animation: { duration: 0 },
          hover: { animationDuration: 0 },
          responsiveAnimationDuration: 0,
          elements: {
            line: {
              tension: 0 // disables bezier curves
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true
                },
                scaleLabel: {
                  display: true,
                  labelString: "Tick(IDs)",
                  fontColor: "black"
                },
                ticks: {
                  autoskip: true,
                  autoSkipPadding: 30
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true
                },
                scaleLabel: {
                  display: true,
                  labelString: "Value",
                  fontColor: "black"
                }
              }
            ]
          }
        }
      };
    },
    mounted() {
      this.listPort();
      this.$global.$on("compile-begin", this.closePort);
      this.$global.$on("upload-success", this.connect);
    },
    updated() {

    },
    beforeDestroy() {
      if (this.port && this.port.isOpen) {
        this.port.close();
      }
      this.$global.$off("compile-begin");
      this.$global.$off("upload-success");
    },
    methods: {
      log(data) {
        console.log(data);
      },
      removeSelectedLabel: function(item) {
        this.selected_label = this.selected_label.filter(el => el.name !== item.name);
        console.log(item);
        console.log(this.selected_label);
      },
      listPort: function() {
        let self = this;
        SerialPort.list().then(ports => {
          self.comports = ports.map(obj => obj.comName);
          //this.comports = this.comports.filter(port => !excludePorts.includes(port));
          if (self.comports.length > 0) {
            self.currentPort = self.comports[0];
          }
        }).catch(err => {
          console.log(err);
        });
      },
      reconnect: function() {
        if (this.port && this.port.isOpen) {
          let self = this;
          this.port.close();
          setTimeout(_ => {
            self.connect();
          }, 300);
        }
      },
      closePort: function() {
        if (this.port && this.port.isOpen) {
          this.port.close();
        }
      },
      connect: function() {
        if (this.port && this.port.isOpen) {
          console.log("disconnect serial port");
          this.port.close();
        } else {
          console.log("connecting serial : " + this.currentPort);
          let comPort = this.currentPort;
          let baudRate = this.baudrate;
          let dataBit = this.serial_connect_info.data_bit[this.serial_data_bit];
          let stopBit = this.serial_connect_info.stop_bit[this.serial_stop_bit];
          let partityBit = this.serial_connect_info.parity_bit[this.serial_parity_bit];
          let flowCtrl = this.serial_connect_info.flow_control[this.serial_flow_ctrl];
          this.port = new SerialPort(comPort, {
            baudRate: baudRate,
            dataBits: dataBit,
            stopBits: stopBit,
            parity: partityBit,
            rtscts: flowCtrl,
            hupcl: false, //TODO : check this error https://github.com/serialport/node-serialport/issues/1854
          });
          const Readline = require("@serialport/parser-readline");
          this.parser = this.port.pipe(new Readline({ delimiter: "\r\n" }));
          this.port.on("open", this.onSerialOpen);
          this.parser.on("data", this.onSerialData);
          this.port.on("error", this.onSerialError);
          this.port.on("close", this.onSerialClose);
        }
      },
      onSerialClose: function() {
        console.log("port closed");
        this.isPause = false;
        this.isOpened = this.port.isOpen;
      },
      onSerialOpen: function() {
        this.isOpened = this.port.isOpen;
        this.serial_data = [];
      },
      onSerialData: function(data) {
        this.add_data(data);
      },
      onSerialError: function(err) {
        console.log(err);
        this.$dialog.notify.error(err);
        this.isOpened = this.port.isOpen;
      },
      pausePlaySerial: function() {
        if (!this.port) {
          console.log("no port found");
          return;
        }
        if (!this.isPause) {
          this.port.pause();
          this.isPause = true;
          console.log("paused");
        } else {
          this.port.resume();
          this.isPause = false;
          console.log("resumed");
        }
      },
      sendData: function(send_message, send_times, send_delay) {
        if (send_times === undefined) {
          send_times = this.send_time;
        }
        if (send_delay === undefined) {
          send_delay = this.send_delay;
        }
        if (send_message === undefined) {
          send_message = this.send_string + this.send_postfix[this.current_postfix].content;
        }
        if (this.port && this.port.isOpen) {
          console.log("send : " + send_message);
          this.port.write(send_message);
          this.send_time = send_times;
        }
        if (send_times > 1) {
          let self = this;
          send_times--;
          setTimeout(_ => { self.sendData(send_message, send_times, send_delay); }, send_delay);
        }
      },
      add_test: function(line) {
        setTimeout(_ => {
          this.add_data(line);
          this.add_test(line);
        }, 100);
      },
      add_data: function(line) {
        let lineStr = line.toString("utf8");
        //--- add to serial monitor ---//
        if (this.display_raw) {
          let hexStr = this.byteToHexString(line);
          this.serial_data.push(hexStr);
        } else {
          this.serial_data.push(lineStr);
        }
        if (this.serial_data.length > this.max_line) {
          this.serial_data.shift();
        }

        if (this.auto_scroll) {
          let m = this.$refs.monitor;
          if (m) {
            this.$nextTick(_ => {
              m.scrollIntoView(false);// = m.scrollHeight;
            });
          }
        }
        //--- process graph ---//
        let data_ids = lineStr.split(":");
        let data_id = (data_ids.length === 2)
          ? data_ids[0]
          : this.received_count;
        let numberArr = (data_ids.length === 2)
          ? data_ids[1]
          : lineStr;
        numberArr = numberArr.split(",");
        numberArr = numberArr.map(o => parseInt(o));
        numberArr = numberArr.filter(o => !Number.isNaN(o));
        if (numberArr.length <= 0) {
          return;
        }
        if (numberArr.length > this.graph_dataset_count) { //add new dataset if new data column
          let data_labels = this.graph_dataset_labels.split(",");
          let labels = numberArr.map((el, ind) => (ind < data_labels.length)
            ? data_labels[ind]
            : "Var " + (ind + 1));
          for (let j = this.graph_dataset_count; j < numberArr.length; j++) {
            this.graph_data.datasets.push(
              {
                label: labels[j],
                fill: false,
                borderColor: this.get_random_color(),
                borderWidth: 1,
                pointRadius: 2,
                pointHoverRadius: 3,
                data: [numberArr[j]]
              }
            );
          }
          this.graph_dataset_count = numberArr.length;
        }
        if (numberArr.length === this.graph_dataset_count) { //ensure number column eq to dataset
          for (let i = 0; i < numberArr.length; i++) {
            if (this.graph_data.datasets[i].data.length > this.max_graph_len) {
              //this.graph_data.datasets[i].data.shift();
              let count = this.graph_data.datasets[i].data.length - this.max_graph_len;
              this.graph_data.datasets[i].data.splice(0, count);
            }
            this.graph_data.datasets[i].data.push(numberArr[i]);
          }
          if (this.graph_data.labels.length > this.max_graph_len) {
            //this.graph_data.labels.shift();
            let count = this.graph_data.labels.length > this.max_graph_len;
            this.graph_data.labels.splice(0, count);
          }
          this.graph_data.labels.push(data_id);
        }
        this.received_count++;
      },
      saveGraphImage() {
        let filename = (new Date().getTime()).toString(36);
        let canvas = document.getElementById("line-chart");
        let dataurl = canvas.toDataURL("image/png");
        let a = document.createElement("a");
        a.href = dataurl;
        a.setAttribute("download", filename);
        let b = document.createEvent("MouseEvents");
        b.initEvent("click", false, true);
        a.dispatchEvent(b);
      },
      getRandomInt() {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
      },
      get_random_color: function() {
        return this.colors[Math.random() * this.colors.length | 0];
      },
      byteToHexString(uint8arr) {
        if (!uint8arr) {
          return "";
        }
        let hexStr = "";
        for (let i = 0; i < uint8arr.length; i++) {
          let hex = (uint8arr[i] & 0xff).toString(16);
          hex = (hex.length === 1)
            ? "0" + hex
            : hex;
          hexStr += hex + " ";
        }
        return hexStr.toUpperCase();
      },
      getColor(color) {
        if (color.hex) {
          return color.hex;
        } else if (typeof color === "string") {
          return color;
        }
      }
    }
  };

</script>
<style scoped>
    .serial-console {
        display: flex;
        width: 100%;
        height: 100%;
        position: absolute;
    }

    /*.label-dialog{
        width: 256px;
    }
    .label-dialog > .vc-compact {
        width: 225px;
    }*/
</style>
<style>
    .auto-scroll-switch {
        position: absolute;
        right: 75px;
        top: 16px;
    }

    ol.monitor-line {
        padding-left: 5px;
        counter-reset: li;
        list-style: none;
    }

    ol.monitor-line:before {
        background-color: #42aa2a;
    }

    ol.monitor-line > li {
        padding-left: 0.5em;
        border-left: 2px solid #aeabaf;
        /*counter-increment: line;
        content: counter(line);
        display: inline-block;
        color: #888;*/
    }

    ol.monitor-line > li:before {

    }

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
