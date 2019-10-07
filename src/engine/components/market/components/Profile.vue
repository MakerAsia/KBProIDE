<template>

    <v-card style="margin-top: 30px; margin-right: 15px">
        <v-list two-line subheader>
            <v-subheader inset>
                <h4 class="text-primary">
                    <i class="fa fa-user-circle-o"></i>
                    ข้อมูลสมาชิก
                </h4>
            </v-subheader>

            <div class="text-xs-left" style="padding-left: 20px; margin-bottom: 20px">
                <a href="#" class="item-profile-menu">- ข้อมูลส่วนตัว</a>
                <br>
                <a href="#" class="item-profile-menu">- ประวัติการซื้อสินค้า</a>
            </div>

            <v-btn color="red darken-1" style="color: white; width: 85%">
                ออกจากระบบ
                &nbsp;
                <i class="fa fa-sign-out"></i>
            </v-btn>

        </v-list>
    </v-card>

</template>

<style>
    a {
        text-decoration: none;
        color: #2e2e2e;
    }
</style>

<script>
  export default {
    name: "Profile",
    data() {
      return {
        items: [
          { icon: "folder", iconClass: "grey lighten-1 white--text", title: "Product A", subtitle: "X,XXX บาท" },
          { icon: "folder", iconClass: "grey lighten-1 white--text", title: "Product B", subtitle: "X,XXX บาท" },
          { icon: "folder", iconClass: "grey lighten-1 white--text", title: "Product C", subtitle: "X,XXX บาท" }
        ],
        items2: [
          { icon: "assignment", iconClass: "blue white--text", title: "Vacation itinerary", subtitle: "Jan 20, 2014" },
          { icon: "call_to_action", iconClass: "amber white--text", title: "Kitchen remodel", subtitle: "Jan 10, 2014" }
        ]
      };
    }
  };
</script>
