const NODE_ENV = process.env.NODE_ENV || 'development'
const isDev = NODE_ENV === 'development'
const externals = {
  moment: 'moment',
  underscore: 'underscore',
  vue: 'Vue',
  vuetify: 'Vuetify'
};
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  css: {
    extract: !isDev
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    /*resolve: {
      alias: {
          vue$ : 'vue/dist/vue.esm.js',
          vuetify$: 'vuetify/dist/vuetify.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    externals: isDev? {} : externals,*/
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
}
