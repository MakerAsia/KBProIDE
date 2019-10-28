<template>
  <v-card style="margin-top: 30px; margin-right: 15px">
    <v-list two-line subheader>
      <v-subheader inset>
        <h4 class="text-primary">
          <i class="fa fa-user-circle-o"></i>
          KB-Member
        </h4>
      </v-subheader>

      <v-text-field type="email" placeholder="Email" style="padding: 0 20px 0 20px" v-model="email"></v-text-field>

      <v-text-field placeholder="Password" style="padding: 0 20px 0 20px" v-model="password"></v-text-field>

      <v-btn
        color="green darken-1"
        flat
        style="color: green; width: 85%; background-color: #E8F5E9 !important;"
        @click="login"
      >
        <i class="fa fa-sign-in fa-lg"></i>&ensp;
        เข้าสู่ระบบ
      </v-btn>
    </v-list>
  </v-card>
</template>

<script>
import axios from "axios";
import api from "../api";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      axios
        .post(api.login, {
          email: this.email,
          password: this.password
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
