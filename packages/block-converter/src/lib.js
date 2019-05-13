/* eslint-disable */

//import Vue from 'vue'
//import Vuetify from 'vuetify/lib'
//import 'vuetify/src/stylus/app.styl'
//import './theme/default.styl'
//import 'vuetify/dist/vuetify.css'
//import 'font-awesome/css/font-awesome.css' // Ensure you are using css-loader

import ConvertPage from './ConvertPage'


export default {
  install(Vue, options)
  {
    Vue.component( 'ConvertPage', ConvertPage);
  }
};
