<template>

    <v-card style="margin-top: 30px; margin-right: 15px">
        <v-list two-line subheader>
            <v-subheader inset>
                <h4 class="text-primary">
                    <i class="fa fa-user-circle-o"></i>
                    KB-Member
                </h4>
            </v-subheader>

            <v-text-field
                    placeholder="Email"
                    style="padding: 0 20px 0 20px"
            ></v-text-field>

            <v-text-field
                    placeholder="Password"
                    style="padding: 0 20px 0 20px"
            ></v-text-field>

            <v-btn color="green darken-1" flat style="color: green; width: 85%; background-color: #E8F5E9 !important;" @click="socialGoogleLogin">
                <i class="fa fa-sign-in fa-lg"></i>&ensp;
                เข้าสู่ระบบ
            </v-btn>

        </v-list>
    </v-card>

</template>

<script>
  export default {
    name: "Login",
    methods: {}
  };
</script>
