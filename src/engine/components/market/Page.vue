<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap style="margin-bottom: 100px">
            <!--            <v-flex xs12>-->
            <!--                <v-card dark color="primary">-->
            <!--                    <v-card-text class="px-0">12</v-card-text>-->
            <!--                </v-card>-->
            <!--            </v-flex>-->
            <!--            <v-flex v-for="i in 2" :key="`6${i}`" xs6>-->
            <!--                <v-card dark color="secondary">-->
            <!--                    <v-card-text class="px-0">6</v-card-text>-->
            <!--                </v-card>-->
            <!--            </v-flex>-->
            <!--            <v-flex v-for="i in 3" :key="`4${i}`" xs4>-->
            <!--                <v-card dark color="primary">-->
            <!--                    <v-card-text class="px-0">4</v-card-text>-->
            <!--                </v-card>-->
            <!--            </v-flex>-->
            <v-flex xs12>
                <h2 class="text-xs-left" style="font-weight: 700">
                    <i class="fa fa-book"></i>&ensp;
                    Books
                </h2>
            </v-flex>

            <v-flex v-for="i in 12" :key="`3${i}`" xs12 sm4 md3>
                <!--                <v-card dark color="secondary">-->
                <!--                    <v-card-text class="px-0">3</v-card-text>-->
                <!--                </v-card>-->
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
            <!--            <v-flex v-for="i in 6" :key="`2${i}`" xs2>-->
            <!--                <v-card dark color="primary">-->
            <!--                    <v-card-text class="px-0">2</v-card-text>-->
            <!--                </v-card>-->
            <!--            </v-flex>-->
            <!--            <v-flex v-for="i in 12" :key="`1${i}`" xs1>-->
            <!--                <v-card dark color="secondary">-->
            <!--                    <v-card-text class="px-0">1</v-card-text>-->
            <!--                </v-card>-->
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
</style>

<script>
  export default {
    name: "Page",
    data() {
      return {
        card_text: "Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.",
        price: "1,999 THB"
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
