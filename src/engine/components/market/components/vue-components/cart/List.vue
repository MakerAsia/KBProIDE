<template>
  <div class="shop-widget cart-widget mb-sm-50">
    <h5 class="header-widget">ตะกร้าสินค้า</h5>

    <div v-for="item in items" :key="item.id">
      <div class="form-group">
        <div class="cart-item" style="padding-bottom: 0">
          <router-link :to="{name: 'product-detail'}">
            <img src="http://placehold.it/56x56" alt="Product Name" class="p-thumb" />
          </router-link>

          <a
            href="javascript:void(0)"
            class="cart-remove-btn"
            :key="item.id"
            @click.prevent="removeFromCart(item)"
          >
            <span class="linea-arrows-square-remove"></span>
          </a>

          <router-link class="cp-name" :to="{name: 'product-detail'}">{{ item.title }}</router-link>
        </div>
        <div class="text-right">
          <span
            class="cp-price"
            v-text="`${item.quantity} x ${formatTotalPrice(item.totalPrice)} บาท`"
          ></span>
          <i class="fal fa-plus btn-cart" style="font-size: 10px !important" @click="add(item)"></i>
          <i class="fal fa-minus btn-cart" style="font-size: 10px !important" @click="remove(item)"></i>
        </div>
      </div>
    </div>

    <div class="cw-subtotal">
      <h6 class="h-alt">ราคารวม : {{ this.$formatNumber(this.$store.state.subTotal) }} บาท</h6>

      <router-link :to="{name: 'checkout'}">
        <button type="button" class="btn-ghost btn-small" style="width: 100%">ตะกร้าสินค้า</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.btn-cart {
  /*margin-left: 5 px;*/
  padding: 3px 5px 3px 5px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 3px;
}
</style>

<script>
export default {
  name: "List",
  data() {
    return {
      items: "",
      totalPrice: 0
    };
  },
  methods: {
    removeFromCart(item) {
      this.$store.commit("removeFromCart", item);
    },
    formatTotalPrice(price) {
      return this.$formatNumber(price);
    },
    add(item) {
      this.$store.commit("addToCart", item);
    },
    remove(item) {
      this.$store.commit("removeQuantityToCart", item);
    }
  },
  mounted() {
    this.items = this.$store.state.cart;
  }
};
</script>
