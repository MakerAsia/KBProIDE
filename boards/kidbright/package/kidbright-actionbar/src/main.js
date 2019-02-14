/* eslint-disable */

//import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import './theme/default.styl'
import 'vuetify/dist/vuetify.css'
//import 'font-awesome/css/font-awesome.css' // Ensure you are using css-loader

import * as ComponentMap from './actionbar'

/*Vue.use(Vuetify,{
  customProperties: true,
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  iconfont: 'fa',
});*/

export default {
  install(Vue, options)
  {
    Vue.use(Vuetify,{
      customProperties: true,
      theme: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
      iconfont: 'fa',
    });
    // register all components globally
    for (var componentName in ComponentMap)
    {
      Vue.component( componentName, ComponentMap[ componentName ] );
    }
  }
};