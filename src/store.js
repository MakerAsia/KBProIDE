import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const market = {
  cart: []
}

export default new Vuex.Store({
  state: {
    ...market
  },
  mutations: {
    addToCart(state, data) {
      let found = state.cart.find(product => product.id === data.id);

      if (found) {
        found.quantity++;
        found.totalPrice = (parseInt(found.price) * found.quantity);
        state.subTotal = state.subTotal + parseInt(found.price);
      } else {
        data.quantity = 1;
        data.totalPrice = parseInt(data.price);
        state.subTotal = state.subTotal + parseInt(data.price);
        state.cart.push(data);
        state.cartCount++;
      }
    },
    removeQuantityToCart(state, data) {
      let found = state.cart.find(product => product.id === data.id);

      if (found) {
        if (found.quantity === 1) {
          // remove product from cart
          let index = state.cart.indexOf(data);

          if (index > -1) {
            let product = state.cart[index];
            let quantity = parseInt(product.quantity);
            let price = parseInt(product.price) * quantity;

            state.cartCount -= product.quantity;
            state.cart.splice(index, 1);

            state.subTotal = state.subTotal - price;
          }
        } else {
          found.quantity--;
          found.totalPrice = (parseInt(found.price) * found.quantity);
          state.subTotal = state.subTotal - parseInt(found.price);
        }
      }
    },
    removeFromCart(state, data) {
      let index = state.cart.indexOf(data);

      if (index > -1) {
        let product = state.cart[index];
        let quantity = parseInt(product.quantity);
        let price = parseInt(product.price) * quantity;

        state.cartCount -= product.quantity;
        state.cart.splice(index, 1);

        state.subTotal = state.subTotal - price;
      }
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
  }
});