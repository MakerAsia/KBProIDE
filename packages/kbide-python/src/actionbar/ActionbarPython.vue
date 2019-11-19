<template>
    <div>
        <v-tooltip bottom>
            <v-btn color="primary darken-2" slot="activator" icon @click="gotoPython">
                <v-img max-width="20" :src="`file:///${$engine.util.packageDir}/kbide-python/static/python-24.png`"></v-img>
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
      gotoPython : function(){
        this.$router.addRoutes([{
          path: '/python',
          meta: {
            public: true,
          },
          name: 'Python',
          component: () => import("../pages/PythonPage")
        }]);
        this.$router.push("/python");
      }
    },
    watch: {

    },
  };
</script>
