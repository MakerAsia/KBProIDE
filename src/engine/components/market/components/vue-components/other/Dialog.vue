<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog.status" persistent max-width="300">
      <v-card>
        <v-card-title class="headline">{{ dialog.title }}</v-card-title>
        <v-card-text class="text-xs-center">
          <div v-if="dialog.type === 'success'">
            <i class="fa fa-check-circle fa-2x green--text"></i>&ensp;
          </div>
          <div>{{ dialog.detail }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn> -->
          <v-btn color="green darken-1" flat @click="closeDialog">ตกลง</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialog: this.$store.state.market.dialog
    };
  },
  computed: {
    ...mapState(["market"])
  },
  methods: {
    closeDialog() {
      const dialog = {
        status: false,
        title: "",
        detail: "",
        type: ""
      };
      this.$store.dispatch("openDialog", dialog);
    }
  },
  watch: {
    "market.dialog": function(newValue, oldValue) {
      console.log(`-----> watch detected market.dialog : ${newValue}`);
      this.dialog = newValue;
    }
  }
};
</script>