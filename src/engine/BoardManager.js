import util from '@/engine/utils';
//import nativeRequire from '@/NativeRequire';
const {resolve, join} = require('path');
const {homedir} = require('os');

var listedBoards = [];
var listedPackages = {};
var loadPackage = function()
{
    if(!util.fs.existsSync(util.boardDir+'/package')){ //no package folder
        return null; 
    }
    var pacakgeName = util.fs.readdirSync(util.boardDir+'/package'); //<<< "./component" must fix value, cannot use dynamic variable in webpack naja!!!!
    var context = {};
    pacakgeName.keys().forEach(element => { //folder
        let fullPathPackage = util.boardDir+'/package/'+element;
        if(util.fs.lstatSync(fullPathPackage).isFile()){// skip file
            return;
        }
        let vcomponents = util.fs.readdirSync(fullPathPackage);
        vcomponents.forEach(componentFile =>{
            let tmp = (/\.\/([A-Za-z0-9]+)\/([A-Za-z0-9]+)\.(vue|js)$/g).exec(element);
        });
        
        if(tmp != null && tmp.length == 4){                
            let fullPath = tmp[0];
            let name = tmp[1];
            let componentName = tmp[2];
            let type = tmp[3];
            if (!(name in context)){//existing key
                context[name] = {};
            }
            if(type == 'vue'){
                context[name][componentName] = './components/'+name+'/'+componentName;                    
            }
            if(type == 'js' && componentName == 'config'){                    
                context[name]['config'] = require('./components/'+name+'/'+componentName).default;
            }
        }
    });
    //sort menu by config index
    var orderedContext = {};
    Object.keys(context).sort(function(a,b) {
        if(context[a].config && context[b].config){
            if('index' in context[a].config && 'index' in context[b].config)
            return context[a].config.index - context[b].config.index;
        }
        return 0;
    }).forEach(function(key) {
        orderedContext[key] = context[key];
    });        
    if(components)
    return orderedContext;
};

var listBoard = function(){
    var context = [];
    var dirs = util.fs.readdirSync(util.boardDir);    
    dirs.forEach(element => {
        if(util.fs.lstatSync(util.boardDir+"/"+element).isFile()){
            return;
        }
        var dirBoards = util.fs.readdirSync(util.boardDir+"/"+element);
        if(!dirBoards.includes("config.js")){
            return; // only folder that contain config.js
        }
        var config = util.requireFunc(util.boardDir+"/"+element+"/config");
        context.push(config);
    });
    return context;
};

var loadBoardManagerConfig = function(){
    let configFile = util.boardDir+'/config.js';
    if(!util.fs.existsSync(configFile)){
        return null;
    }
    return util.requireFunc(configFile);
};

var boards = function(){
    if(Object.entries(listedBoards).length === 0 && listedBoards.constructor === Object){ // check empty object !!!
        listedBoards = listBoard();
    }    
    return listedBoards;
};

export default {
    boards,
    listBoard,
    loadBoardManagerConfig,
    listPublicBoard : function(){

    },
    load : ()=>{

    },
    install : (namespace)=>{

    },
    remove : (namespace)=>{

    },
    update : (namespace)=>{

    }
}
