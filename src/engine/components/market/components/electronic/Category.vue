<template>

    <v-flex xs12 sm2>
        <h2 class="text-xs-left" style="font-weight: 700">
            <i class="fa fa-microchip"></i>&ensp;
            Electronics
        </h2>
        <v-card style="margin-top: 30px; margin-right: 15px">
<!--            <v-toolbar color="light-green darken-1" dark>-->
<!--                <v-toolbar-title>Categories</v-toolbar-title>-->
<!--            </v-toolbar>-->
            <v-list style="//border: 1px solid #9e9e9e; padding-right: 5px">
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

</template>

<script>
  export default {
    name: "Category",
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
    }
  };
</script>
