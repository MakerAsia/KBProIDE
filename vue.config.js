module.exports = {
    runtimeCompiler: true,
    configureWebpack: {
        externals: {
            vue: 'Vue',
            vuetify: 'Vuetify'
        },
        /*entry: './resources/js/app.js',
        output: {
            filename: './public/javascripts/bundle.js',
        },*/
        /*resolve: {
            alias: {
              'vue$' : 'vue/dist/vue.esm.js',
              'vuetify$' : 'vuetify/dist/vuetify.js'
            }
        },*/
        /*resolve: {
            alias: {
                vue$ : 'vue/dist/vue.esm.js',
                vuetify$: 'vuetify/dist/vuetify.js'
            },
            extensions: ['*', '.js', '.vue', '.json']
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        }*/
    }
}