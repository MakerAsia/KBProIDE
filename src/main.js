import Vue from "vue";
import './engine/plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'font-awesome/css/font-awesome.css'

import cm from '@/engine/ComponentManager';
import bm from '@/engine/BoardManager';
import ui from '@/engine/UIManager';
import pfm from '@/engine/PlatformManager';
import util from '@/engine/utils';

Vue.config.productionTip = false;

var loadCofigComponents = function(obj,compName){
  var componentData = {};
  var presistanceData = [];
  var methods = {};
  
  if('presistance' in obj){//load presistance
    Object.keys(obj.presistance).forEach(function(pkey){
      if(!presistanceData.includes(pkey)){
        presistanceData.push(pkey);
      }
      // load data from localStorage if exist
      if(localStorage[compName+'.'+pkey]){
        componentData[pkey] = JSON.parse(localStorage[compName+'.'+pkey]);
      }else{
        componentData[pkey] = obj.presistance[pkey];
      }
    });
  }
  if('data' in obj){//load reactive data
    Object.keys(obj.data).forEach(function(dkey){
      componentData[dkey] = obj.data[dkey];
    });
  }
  if('method' in obj){//load method
    Object.keys(obj.method).forEach(function(mkey){
      methods[mkey] = obj.method[mkey];
    });
  }
  return {data : componentData, presistance : presistanceData, method: methods};
}

//---- load data to global variable ----//
var componentAllData = { data : {}, presistance : {}};
//--------------------------------------//


//========= component  manager =========//
var comps = cm.listComponent();
Object.keys(comps).forEach(function(key){
  if('config' in comps[key]){
    let cmConfigData = loadCofigComponents(comps[key].config,key);
    componentAllData.data[key] = cmConfigData.data;
    componentAllData.presistance[key] = cmConfigData.presistance;
  }
});
//=====================================//


//=========== board manager ===========//
var boards = bm.listBoard();
/*
//var v = require.context('./', false, /.*?/).keys();
//console.log(v);

console.log('vvvvvv');
var cc = "E:/Bloccoly/Research/KBProIDE/boards/kidbright/package/actionbar/ActionbarNewfile.vue";
var vl = util.vueLoader(cc);
var compp = eval(vl.js);
console.log(vl);
console.log('cccccc');
console.log(compp);
console.log('cc2cccc');
*/
//var v = require.context('./', false, /.*?/).keys();
//console.log(v);

console.log('vvvvvv');
var cc = "E:/Bloccoly/Research/KBProIDE/boards/kidbright/package/actionbar/ActionbarNewfile.vue";
var vl = util.vueLoader(cc);
var compp = eval(vl.js);
console.log(vl);
console.log('cccccc');
console.log(compp);
console.log('cc2cccc');

//=====================================//

//============= ui manager ============//
var uiComponentData = loadCofigComponents(ui);
componentAllData.data['ui'] = uiComponentData.data;
componentAllData.presistance['ui'] = uiComponentData.presistance;
//=====================================//




//---- presistance data watcher ----//
var watcher = {};
Object.keys(componentAllData.presistance).forEach(function(key){
  componentAllData.presistance[key].forEach(function(pkey){
    watcher[key+'.'+pkey] = {
      handler : function(val){        
        localStorage[key+'.'+pkey] = JSON.stringify(val);        
      },
      deep : true
    }
  });
});

//---- setup $global ----//
Vue.prototype.$global = new Vue({
  data: componentAllData.data,
  watch: watcher
});

//=======================================================//
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
//=======================================================//