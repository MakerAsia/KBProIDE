<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap style="margin-bottom: 100px">
      <v-flex xs12 sm4 lg3 xl2>
        <!-- Categories -->
        <category-component></category-component>
        <!-- Carts -->
        <cart-component></cart-component>
        <!-- Profile -->
        <profile-component></profile-component>
        <!-- Login -->
        <login-component></login-component>
      </v-flex>

      <v-flex xs12 sm8 lg9 xl10>
        <!-- Dialog -->
        <dialog-component></dialog-component>

        <v-layout row wrap>
          <v-flex xs12 sm6 lg4 xl3 v-for="index in loadMoreProducts" :key="`pd-${index}`">
            <div v-if="index < products.length">
              <product-component :key="products[index].id" :data="products[index]"></product-component>
            </div>
          </v-flex>
          <v-flex xs12 style="margin-top: 30px">
            <v-btn outline color="green" @click="loadMoreProducts += 8">
              <span>
                แสดงสินค้าเพิ่ม
                <i class="fa fa-angle-down"></i>
              </span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>

      <!-- Books -->

      <!--            <v-flex xs12 style="margin-top: 60px">-->
      <!--                <h2 class="text-xs-left" style="font-weight: 700">-->
      <!--                    <i class="fa fa-book"></i>&ensp;-->
      <!--                    Books-->
      <!--                </h2>-->
      <!--            </v-flex>-->

      <!--            <v-flex xs12 sm3>-->
      <!--                <v-card>-->
      <!--                    <v-toolbar color="light-green darken-1" dark>-->
      <!--                        <v-toolbar-title>Categories</v-toolbar-title>-->
      <!--                    </v-toolbar>-->

      <!--                    <v-list>-->
      <!--                        <v-list-group-->
      <!--                                v-for="item in items"-->
      <!--                                :key="item.title"-->
      <!--                                v-model="item.active"-->
      <!--                                :prepend-icon="item.action"-->
      <!--                                no-action-->
      <!--                        >-->
      <!--                            <template v-slot:activator>-->
      <!--                                <v-list-tile>-->
      <!--                                    <v-list-tile-content>-->
      <!--                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
      <!--                                    </v-list-tile-content>-->
      <!--                                </v-list-tile>-->
      <!--                            </template>-->

      <!--                            <v-list-tile-->
      <!--                                    v-for="subItem in item.items"-->
      <!--                                    :key="subItem.title"-->
      <!--                                    @click=""-->
      <!--                            >-->
      <!--                                <v-list-tile-content>-->
      <!--                                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>-->
      <!--                                </v-list-tile-content>-->

      <!--                                <v-list-tile-action>-->
      <!--                                    <v-icon>{{ subItem.action }}</v-icon>-->
      <!--                                </v-list-tile-action>-->
      <!--                            </v-list-tile>-->
      <!--                        </v-list-group>-->
      <!--                    </v-list>-->
      <!--                </v-card>-->
      <!--            </v-flex>-->

      <!--            <v-flex xs12 sm9>-->
      <!--                <v-layout row wrap>-->
      <!--                    <v-flex v-for="i in 12" :key="`3${i}`" xs12 sm4>-->
      <!--                        <v-card>-->
      <!--                            <v-img-->
      <!--                                    src="https://images.unsplash.com/reserve/aOcWqRTfQ12uwr3wWevA_14401305508_804b300054_o.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"-->
      <!--                                    style="object-fit: contain; width: 100%; height: 250px;"-->
      <!--                            ></v-img>-->

      <!--                            <v-card-title primary-title>-->
      <!--                                <div>-->
      <!--                                    <h3 class="headline mb-0 text-xs-left" style="font-weight: 500">-->
      <!--                                        Kangaroo Valley Safari-->
      <!--                                    </h3>-->
      <!--                                    <div class="text-xs-left" style="padding-top: 10px"> {{ card_text }}</div>-->
      <!--                                    <div class="text-xs-left" style="padding-top: 15px">-->
      <!--                                        by <span class="blue&#45;&#45;text darken-2" style="font-weight: 500">Prawared.Bw</span>-->
      <!--                                        <p style="padding-bottom: 0; margin-bottom: 0">-->
      <!--                                            September 17, 2019-->
      <!--                                        </p>-->
      <!--                                    </div>-->
      <!--                                </div>-->
      <!--                            </v-card-title>-->

      <!--                            <v-card-actions>-->
      <!--                                <v-flex class="text-xs-right">-->
      <!--                                    <v-btn color="success">-->
      <!--                                        <i class="fa fa-shopping-bag"></i>&ensp;-->
      <!--                                        {{ price }}-->
      <!--                                    </v-btn>-->
      <!--                                </v-flex>-->
      <!--                            </v-card-actions>-->
      <!--                        </v-card>-->
      <!--                    </v-flex>-->
      <!--                </v-layout>-->
      <!--            </v-flex>-->
    </v-layout>
  </v-container>
</template>

<style>
.page-navigation-display {
  background-color: white !important;
  height: 100vh !important;
  overflow: auto !important;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: Prompt-Regular, sans-serif !important;
}

input,
a,
button,
p,
span {
  font-family: Prompt-Regular, sans-serif !important;
}

.item-profile-menu:hover {
  color: green;
}

.v-card__text {
  font-family: Prompt-Regular, sans-serif !important;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import axios from "axios";
import CategoryComponent from "./components/Category";
import ProductComponent from "./components/Product";
import CartComponent from "./components/Cart";
import ProfileComponent from "./components/Profile";
import LoginComponent from "./components/Login";
import DialogComponent from "./components/vue-components/other/Dialog";
import api from "./api";

export default {
  name: "Page",
  data() {
    return {
      products: [],
      loadMoreProducts: 12
    };
  },
  methods: {
    getProducts() {
      axios.get(api.products).then(res => {
        this.products = res.data;
        console.log(`this products `, this.products);
      });
    },
    methods: {},
    back() {
      this.$global.market.MarketDialog = !this.$global.market.MarketDialog;
      this.$router.push({ name: "Editor" });
    }
  },
  components: {
    "category-component": CategoryComponent,
    "product-component": ProductComponent,
    "cart-component": CartComponent,
    "profile-component": ProfileComponent,
    "login-component": LoginComponent,
    "dialog-component": DialogComponent
  },
  mounted() {
    console.log(`------> Market Page mounted`);
    this.getProducts();
  }
};
</script>
