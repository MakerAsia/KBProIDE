<template>

    <div>
        <h2 class="text-xs-left" style="font-weight: 700">
            <!--            <i class="fa fa-microchip"></i>&ensp;-->
            หมวดหมู่สินค้า
        </h2>
        <v-card style="margin-top: 30px; margin-right: 15px">
            <!--            <v-toolbar color="light-green darken-1" dark>-->
            <!--                <v-toolbar-title>Categories</v-toolbar-title>-->
            <!--            </v-toolbar>-->
            <v-list style="//border: 1px solid #9e9e9e; //padding-right: 5px">
                <v-list-group
                        v-for="item in categories"
                        :key="item.title"
                        v-model="item.active"
                >
                    <template>
                        <v-list-tile style="padding-right: 0; background-color: #424242; color: white">
                            <v-list-tile-content>
                                <v-list-tile-title style="height: 32px; display: flex">
                                    <img :src="item.category_icon" alt="" style="width: 32px; height: 32px">
                                    <span style="padding: 5px 0 0 10px; font-weight: bold;">{{ item.category_name }}</span>
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>

                    <v-list-tile
                            v-for="subItem in item.sub_categories"
                            :key="subItem.title"
                            @click=""
                            style="background-color: white"
                    >
                        <v-list-tile-content>
                            <v-list-tile-title>{{ subItem.sub_category_name }}</v-list-tile-title>
                        </v-list-tile-content>

                        <v-list-tile-action>
                            <v-icon>{{ subItem.action }}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list-group>
            </v-list>
        </v-card>
    </div>

</template>

<style>
    .v-list__group__items {
        display: block !important;
        padding: 0 !important;
    }

    .v-list__group__header__append-icon {
        display: none !important;
    }
</style>

<script>
  import axios from "axios";

  export default {
    name: "Category",
    data() {
      return {
        categories: [],
        card_text: "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
        price: "1,999 THB",
        items: [
          {
            action: "local_activity",
            title: "Attractions",
            items: [
              { title: "List Item" }
            ]
          },
          {
            action: "restaurant",
            title: "Dining",
            active: true,
            items: [
              { title: "Breakfast & brunch" },
              { title: "New American" },
              { title: "Sushi" }
            ]
          },
          {
            action: "school",
            title: "Education",
            items: [
              { title: "List Item" }
            ]
          },
          {
            action: "directions_run",
            title: "Family",
            items: [
              { title: "List Item" }
            ]
          },
          {
            action: "healing",
            title: "Health",
            items: [
              { title: "List Item" }
            ]
          },
          {
            action: "content_cut",
            title: "Office",
            items: [
              { title: "List Item" }
            ]
          },
          {
            action: "local_offer",
            title: "Promotions",
            items: [
              { title: "List Item" }
            ]
          }
        ]
      };
    },
    methods: {
      getCategories() {
        axios.get("http://kb-market:8888/api/categories").then(res => {
          this.categories = res.data;
          console.log(`this categories `, this.categories);
        });
      }
    },
    mounted() {
      this.getCategories();
    }
  };
</script>
