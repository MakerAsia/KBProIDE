<template>
  <v-card style="margin-top: 30px; margin-right: 15px">
    <v-list two-line subheader>
      <v-subheader inset>
        <h4 class="text-success-dark">
          <i class="fa fa-shopping-bag"></i>
          ตะกร้าสินค้า
        </h4>
      </v-subheader>

      <v-list-tile v-for="item in cart" :key="item.title" avatar @click>
        <v-list-tile-avatar>
          <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            <span>{{ item.subtitle }}</span>
          </v-list-tile-sub-title>
        </v-list-tile-content>

        <div>
          <input
            type="number"
            min="1"
            value="1"
            style="background-color: white; border: 1px solid #e0e0e0; text-align: center; width: 50px; margin-right: 10px; border-radius: 3px"
          />
          <i class="fa fa-remove text-danger" style="cursor: pointer"></i>
        </div>
      </v-list-tile>

      <div v-if="getCartNotEmpty">
        <p class="text-success-dark">
          ยอดทั้งหมด
          <span>{{ subTotal }}</span> บาท
        </p>

        <v-btn color="green darken-1" style="color: white; width: 85%">
          ชำระเงิน
          &nbsp;
          <i class="fa fa-angle-right"></i>
        </v-btn>
      </div>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Cart",
  data() {
    return {
      cart: [],
      subTotal: 0
    };
  },
  computed: {
    ...mapState(["market"]),
    getCartNotEmpty() {
      return this.cart.length > 0;
    }
  },
  mounted() {
    console.log(`-----> Cart mounted`);
  },
  watch: {
    "market.cart": function(newValue, oldValue) {
      let data = [];
      let cart = this.$store.state.market.cart;

      cart.forEach(item => {
        const price = this.$numeral(item.price).format("0,0");

        data.push({
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: item.title,
          subtitle: `${price} บาท`
        });
      });

      this.cart = data;
    },
    "market.subTotal": function(newValue, oldValue) {
      this.subTotal = this.$numeral(newValue).format("0,0");
    }
  }
};
</script>
