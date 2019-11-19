<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon>
                <v-icon dark>fa-check</v-icon>
            </v-btn>
            <span>Python</span>
        </v-tooltip>
    </div>
</template>

<script>
  const engine = Vue.prototype.$engine;
  const G = Vue.prototype.$global;
 
  export default {
    data() {
      return {
        compileStep: 1,
      };
    },

    mounted() {

    },

    beforeDestroy() {

    },
    methods: {
      
    },
    watch: {
      
    },
  };
</script>
