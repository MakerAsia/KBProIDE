/**
 * Created by  Aaron Smith on 2017/8/20.
 */
import {Line, mixins} from "vue-chartjs";
//import util from "@/engine/utils";
//const {Line,mixins} = util.requireFunc('vue-chartjs');
const {reactiveProp} = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ["chartData", "options"],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    "chartData.labels": {
      deep: false, handler: function() {
        this.$data._chart.update();
      },
    },
    "options": {
      deep: true, handler: function() {
        this.renderChart(this.data, this.options);
      },
    },
  },
};