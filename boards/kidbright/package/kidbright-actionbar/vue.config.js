const NODE_ENV = process.env.NODE_ENV || 'development'
const isDev = NODE_ENV === 'development'
const externals = {
  moment: 'moment',
  underscore: 'underscore'
};
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  css: {
    extract: !isDev
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },
    externals: isDev ? {} : externals,
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
}
