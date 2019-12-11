module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    optimization: {

    },
    externals: {
      vue: "Vue",
    },
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
          {
            "from": "packages",
            "to": "../packages",
          },
          {
            "from": "plugins",
            "to": "../plugins",
          },
        ],
        "win": {
          "target": [
            {
              "target": "nsis",
            }
          ]
        },
        "nsis" : {
          "oneClick" : false,
          "perMachine" : false,
          "allowElevation" : false,
        }
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
