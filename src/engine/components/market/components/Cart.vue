<template>
  <v-card style="margin-top: 30px; margin-right: 15px">
    <v-list two-line subheader>
      <v-subheader inset>
        <h4 class="text-success-dark">
          <i class="fa fa-shopping-bag"></i>
          ตะกร้าสินค้า
        </h4>
      </v-subheader>

      <v-list-tile v-for="item in cart" :key="item.title" avatar>
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
            :value="item.quantity"
            @keyup="onChangeQuantity"
            @change="onChangeQuantity"
            :data-product-id="item.id"
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
      subTotal: 0,
      renderComponent: true
    };
  },
  computed: {
    ...mapState(["market"]),
    getCartNotEmpty() {
      return this.cart.length > 0;
    }
  },
  methods: {
    updateCart(items) {
      let data = [];
      items.forEach(item => {
        const quantity = item.quantity;
        const price = this.$numeral(item.price * quantity).format("0,0");
        console.log(item);
        data.push({
          id: item.id,
          icon: "folder",
          iconClass: "grey lighten-1 white--text",
          title: item.title,
          subtitle: `${price} บาท`,
          quantity: item.quantity
        });
      });

      return data;
    },
    onChangeQuantity(e) {
      console.log(`-----> onChangeQuantity`);
      const quantity = e.target.value;
      const productId = e.target.getAttribute("data-product-id");

      let data = {
        id: parseInt(productId),
        quantity: parseInt(quantity)
      };

      if (quantity <= 0) {
        data.quantity = 1;
      } else {
        data.quantity = parseInt(quantity);
      }

      this.$store.dispatch("changeProductQuantity", data);

      if (quantity <= 0) {
        return (e.target.value = 1);
      }
    }
  },
  mounted() {
    console.log(`-----> Cart mounted`);
  },
  watch: {
    "market.cart": function(newValue, oldValue) {
      console.log(`-----> watch detected market.cart`);
      /* re-render cart */
      const data = this.updateCart(newValue);
      this.cart = data;
    },
    "market.subTotal": function(newValue, oldValue) {
      console.log(`-----> watch detected market.subTotal`);
      this.subTotal = this.$numeral(newValue).format("0,0");

      /* re-render cart */
      const data = this.updateCart(this.$store.state.market.cart);
      this.cart = data;
    }
  }
};
</script>
