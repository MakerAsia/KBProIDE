module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      vue: "Vue",
      //vuetify: 'Vuetify'
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
  },
  pluginOptions: {
    electronBuilder: {
      outputDir: "dist_electron",
      builderOptions: {
        appId: "com.makerasia.ide",
        "mac": {
          "category": "public.app-category.productivity",
        },
        "dmg": {},
        "copyright": "Copyright © 2019 MakerAsia Co.,Ltd",
        extraResources: [
          {
            "from": "boards",
            "to": "../boards",
          },
          {
            "from": "platforms",
            "to": "../platforms",
          },
        ],
        // options placed here will be merged with default configuration and passed to electron-builder
      },
      chainWebpackMainProcess: config => {
        // Chain webpack config for electron main process only
        console.log("chaingWebpackMainProcess");
      },
      chainWebpackRendererProcess: config => {
        // Chain webpack config for electron renderer process only
        // The following example will set IS_ELECTRON to true in your app
        config.plugin("define").tap(args => {
          args[0]["IS_ELECTRON"] = true;
          return args;
        });
      },
    },
  },
};
