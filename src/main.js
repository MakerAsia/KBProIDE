import Vue from "vue";
import "./engine/plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "font-awesome/css/font-awesome.css";

import cm from "@/engine/ComponentManager";
import bm from "@/engine/BoardManager";
import ui from "@/engine/UIManager";
import pfm from "@/engine/PlatformManager";
import compiler from "@/engine/Compiler";
import util from "@/engine/utils";

import SmoothScrollbar from "vue-smooth-scrollbar";

Vue.use(SmoothScrollbar);
//---- firebase database ----//
//import firebase from 'firebase';
//require('firebase/firestore');
// Initialize Firebase
var config = {
  apiKey: "AIzaSyD8iU1-u0KFl7vFCJdwzJzAha7kOLtMKcQ",
  authDomain: "kbproide.firebaseapp.com",
  databaseURL: "https://kbproide.firebaseio.com",
  projectId: "kbproide",
  storageBucket: "kbproide.appspot.com",
  messagingSenderId: "1046722656270",
};
firebase.initializeApp(config);
Vue.prototype.$db = firebase.firestore();

Vue.config.productionTip = false;

//---- load data to global variable ----//
var componentAllData = {
  data: {},
  persistence: {},
};
var watcher = {};
var watcherHandler = {};
//--------------------------------------//

var addWatcher = function(name, ghandler, deep) {
  if (!(name in watcherHandler)) { // new handler
    watcherHandler[name] = [];
  }
  watcherHandler[name].push(ghandler);
  watcher[name] = {
    handler: function(val) {
      watcherHandler[name].forEach(h => {
        h(val);
      });
    },
    deep: deep,
  };
};

//========= component  manager =========//
var comps = cm.listComponent();
Object.keys(comps).forEach(function(key) {
  if ("config" in comps[key]) {
    let cmConfigData = util.loadCofigComponents(comps[key].config, key);
    componentAllData.data[key] = cmConfigData.data;
    componentAllData.persistence[key] = cmConfigData.persistence;
  }
});
//=====================================//

//=========== board manager ===========//
var boards = bm.listBoard();
var boardInfo = bm.loadBoardManagerConfig();
var boardInfoComponent = util.loadCofigComponents(boardInfo, "board");
// assign data to $global
componentAllData.data["board"] = boardInfoComponent.data;
componentAllData.persistence["board"] = boardInfoComponent.persistence;
// load packages
var boardPackage = bm.packages(boardInfoComponent.data.board);

// assign package to board
componentAllData.data["board"]["package"] = {};
Object.keys(boardPackage).forEach(packageName => {
  componentAllData.data.board.package[packageName] = {};
  let boardPackageData = util.loadCofigComponents(
      boardPackage[packageName].config, "board.package." + packageName);
  componentAllData.data.board.package[packageName] = boardPackageData.data;
  componentAllData.persistence["board.package." +
  packageName] = boardPackageData.persistence;
});

addWatcher("board.board", function(val) { //listen board name change we need to reload everything
  console.log("board changed to : " + val);
  localStorage["board.board"] = JSON.stringify(val);
}, false);

//console.log(process.platform);
//console.log(util.rootDir);

//TODO load platform block

//=====================================//

//============= ui manager ============//
var uiComponentData = util.loadCofigComponents(ui, "ui");
componentAllData.data["ui"] = uiComponentData.data;
componentAllData.persistence["ui"] = uiComponentData.persistence;
//=====================================//

//---- persistence data watcher ----//
Object.keys(componentAllData.persistence).forEach(function(key) {
  componentAllData.persistence[key].forEach(function(pkey) {
    addWatcher(key + "." + pkey, function(val) {
      localStorage[key + "." + pkey] = JSON.stringify(val);
    }, true);
  });
});
console.log("======> $global data <=====");
console.log(componentAllData);
console.log("===========================");

//---- setup $global ----//
Vue.prototype.$global = new Vue({
                                  data: componentAllData.data,
                                  watch: watcher,
                                });
//---- setup $engine ----//
var engineData = {
  util: util,
  compiler: compiler,
  componentManager: cm,
  boardManager: bm,
  platformManager: pfm,
  uiManager: ui,
};
Vue.prototype.$engine = new Vue({
                                  data: engineData,
                                });
//=======================================================//
new Vue({
          router,
          store,
          render: h => h(App),
        }).$mount("#app");
//=======================================================//
