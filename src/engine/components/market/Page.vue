<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap style="margin-bottom: 100px">

            <!-- Modules -->

            <v-flex xs12>
                <h2 class="text-xs-left" style="font-weight: 700">
                    <i class="fa fa-microchip"></i>&ensp;
                    Electronics
                </h2>
            </v-flex>

            <v-flex xs12 sm3>
                <v-card>
                    <v-toolbar color="light-green darken-1" dark>
                        <v-toolbar-title>Categories</v-toolbar-title>
                    </v-toolbar>

                    <v-list>
                        <v-list-group
                                v-for="item in items"
                                :key="item.title"
                                v-model="item.active"
                                :prepend-icon="item.action"
                                no-action
                        >
                            <template v-slot:activator>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>

                            <v-list-tile
                                    v-for="subItem in item.items"
                                    :key="subItem.title"
                                    @click=""
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon>{{ subItem.action }}</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-flex>

            <v-flex xs12 sm9>
                <v-layout row wrap>
                    <v-flex v-for="i in 6" :key="`3${i}`" xs12 sm4>
                        <v-card>
                            <v-img
                                    src="https://images.unsplash.com/reserve/aOcWqRTfQ12uwr3wWevA_14401305508_804b300054_o.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
                                    style="object-fit: contain; width: 100%; height: 250px;"
                            ></v-img>

                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0 text-xs-left" style="font-weight: 500">
                                        Kangaroo Valley Safari
                                    </h3>
                                    <div class="text-xs-left" style="padding-top: 10px"> {{ card_text }}</div>
                                    <div class="text-xs-left" style="padding-top: 15px">
                                        by <span class="blue--text darken-2" style="font-weight: 500">Prawared.Bw</span>
                                        <p style="padding-bottom: 0; margin-bottom: 0">
                                            September 17, 2019
                                        </p>
                                    </div>
                                </div>
                            </v-card-title>

                            <v-card-actions>
                                <v-flex class="text-xs-right">
                                    <v-btn color="success">
                                        <i class="fa fa-shopping-bag"></i>&ensp;
                                        {{ price }}
                                    </v-btn>
                                </v-flex>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>

            <!-- Books -->

            <v-flex xs12 style="margin-top: 60px">
                <h2 class="text-xs-left" style="font-weight: 700">
                    <i class="fa fa-book"></i>&ensp;
                    Books
                </h2>
            </v-flex>

            <v-flex xs12 sm3>
                <v-card>
                    <v-toolbar color="light-green darken-1" dark>
                        <v-toolbar-title>Categories</v-toolbar-title>
                    </v-toolbar>

                    <v-list>
                        <v-list-group
                                v-for="item in items"
                                :key="item.title"
                                v-model="item.active"
                                :prepend-icon="item.action"
                                no-action
                        >
                            <template v-slot:activator>
                                <v-list-tile>
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>

                            <v-list-tile
                                    v-for="subItem in item.items"
                                    :key="subItem.title"
                                    @click=""
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-icon>{{ subItem.action }}</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list-group>
                    </v-list>
                </v-card>
            </v-flex>

            <v-flex xs12 sm9>
                <v-layout row wrap>
                    <v-flex v-for="i in 12" :key="`3${i}`" xs12 sm4>
                        <v-card>
                            <v-img
                                    src="https://images.unsplash.com/reserve/aOcWqRTfQ12uwr3wWevA_14401305508_804b300054_o.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1355&q=80"
                                    style="object-fit: contain; width: 100%; height: 250px;"
                            ></v-img>

                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0 text-xs-left" style="font-weight: 500">
                                        Kangaroo Valley Safari
                                    </h3>
                                    <div class="text-xs-left" style="padding-top: 10px"> {{ card_text }}</div>
                                    <div class="text-xs-left" style="padding-top: 15px">
                                        by <span class="blue--text darken-2" style="font-weight: 500">Prawared.Bw</span>
                                        <p style="padding-bottom: 0; margin-bottom: 0">
                                            September 17, 2019
                                        </p>
                                    </div>
                                </div>
                            </v-card-title>

                            <v-card-actions>
                                <v-flex class="text-xs-right">
                                    <v-btn color="success">
                                        <i class="fa fa-shopping-bag"></i>&ensp;
                                        {{ price }}
                                    </v-btn>
                                </v-flex>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<style>
    .page-navigation-display {
        background-color: white !important;
        height: 100vh !important;
        overflow: auto !important;
    }
</style>

<script>
  export default {
    name: "Page",
    data() {
      return {
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
            //active: true,
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
      back() {
        this.$global.market.MarketDialog = !this.$global.market.MarketDialog;
        this.$router.push({ name: "Editor" });
      }
    }
  };
</script>
