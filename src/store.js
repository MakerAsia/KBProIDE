import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const marketState = {
  market: {
    cart: [],
    subTotal: 0,
    vatPercent: 7,
    cartCount: 0,
    dialog: {
      status: false,
      title: '',
      detail: '',
      type: '',
    }
  }
}

export default new Vuex.Store({
  state: {
    ...marketState
  },
  mutations: {
    addToCart(state, data) {
      let found = state.market.cart.find(product => product.id === data.id);

      if (found) {
        found.quantity++;
        found.totalPrice = (parseInt(found.price) * found.quantity);
        state.market.subTotal = state.market.subTotal + parseInt(found.price);
      } else {
        data.quantity = 1;
        data.totalPrice = parseInt(data.price);
        state.market.subTotal = state.market.subTotal + parseInt(data.price);
        state.market.cart.push(data);
        state.market.cartCount++;
      }
    },
    removeQuantityToCart(state, data) {
      let found = state.market.cart.find(product => product.id === data.id);

      if (found) {
        if (found.quantity === 1) {
          // remove product from cart
          let index = state.market.cart.indexOf(data);

          if (index > -1) {
            let product = state.market.cart[index];
            let quantity = parseInt(product.quantity);
            let price = parseInt(product.price) * quantity;

            state.market.cartCount -= product.quantity;
            state.market.cart.splice(index, 1);

            state.market.subTotal = state.market.subTotal - price;
          }
        } else {
          found.quantity--;
          found.totalPrice = (parseInt(found.price) * found.quantity);
          state.market.subTotal = state.market.subTotal - parseInt(found.price);
        }
      }
    },
    removeFromCart(state, data) {
      let index = state.market.cart.indexOf(data);

      if (index > -1) {
        let product = state.market.cart[index];
        let quantity = parseInt(product.quantity);
        let price = parseInt(product.price) * quantity;

        state.market.cartCount -= product.quantity;
        state.market.cart.splice(index, 1);

        state.market.subTotal = state.market.subTotal - price;
      }
    },
    openDialog(state, data) {
      state.market.dialog = data;
    },
  },
  actions: {
    addToCart(context, data) {
      context.commit('addToCart', data);
    },
    removeQuantityToCart(context, data) {
      context.commit('removeQuantityToCart', data);
    },
    removeFromCart(context, data) {
      context.commit('removeFromCart', data);
    },
    openDialog(context, data) {
      context.commit('openDialog', data);
    },
  }
});