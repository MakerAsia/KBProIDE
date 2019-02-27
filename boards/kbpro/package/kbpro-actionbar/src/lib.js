/* eslint-disable */

//import Vue from 'vue'
//import Vuetify from 'vuetify/lib'
//import 'vuetify/src/stylus/app.styl'
//import './theme/default.styl'
//import 'vuetify/dist/vuetify.css'
//import 'font-awesome/css/font-awesome.css' // Ensure you are using css-loader

import * as ComponentMap from './actionbar'


export default {
  install(Vue, options)
  {    
    // register all components globally
    for (var componentName in ComponentMap)
    {
      Vue.component( componentName, ComponentMap[ componentName ] );
    }
  }
};
