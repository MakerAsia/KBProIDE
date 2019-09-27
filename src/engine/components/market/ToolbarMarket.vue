<template>
    <v-tooltip bottom>
        <v-btn color="primary darken-2" slot="activator" icon @click.native="marketDialog">
            <i class="fa fa-shopping-bag"></i>
        </v-btn>
        <span>Market</span>
    </v-tooltip>
</template>

<script>
  export default {
    name: "ActionbarMarket",
    methods: {
      marketDialog() {
        this.$global.market.MarketDialog = !this.$global.market.MarketDialog;
        this.$router.push({ name: "Market" });
      }
    }
  };
</script>
