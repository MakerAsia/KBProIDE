<template>
    <v-flex xs12 class="pa-0 dark" style="display: flex; width: 100%; flex-direction: column">
        <v-flex style="display: flex; flex: 1 1 auto; flex-basis: 100%">
            <v-card dark style="font-size:13px;overflow-y: scroll; width: 100%;">
                <ol ref="monitor" class="monitor-line">
                    <li v-for="(line,inx) in logs" :key="inx" class="serial-line">
                        {{line}}
                    </li>
                </ol>
            </v-card>
        </v-flex>
    </v-flex>
</template>

<script>
  const electron = require("electron");
  let myself;
  export default {
    name: "CompileLogs",
    data() {
      return {
        logs : [],
        auto_scroll: true
      }
    },
    created() {
      myself = this;
    },
    mounted() {
      this.$global.$on("compile-log",msg => this.add_data(msg));
      this.$global.$on("compile-begin", this.clear_data());
    },
    methods:{
      clear_data : function(){
        this.logs = [];
      },
      add_data: function(line) {
        this.logs.push(line);
        if (this.auto_scroll) {
          let m = this.$refs.monitor;
          if (m) {
            this.$nextTick(_ => {
              m.scrollIntoView(false);// = m.scrollHeight;
            });
          }
        }
      },
    }
  };
</script>

<style scoped>
    .console {
        height: 20% !important;
        background-color: black;
        color: white;
        font-family: Manjari, sans-serif;
        padding: 10px;
        overflow: scroll;
    }

    .console > .console-close-icon {
        float: right;
        cursor: pointer;
    }
</style>