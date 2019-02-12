import util from '@/engine/utils';
//import nativeRequire from '@/NativeRequire';
const {resolve, join} = require('path');
const {homedir} = require('os');

var listedBoards = [];
var listedPackages = {};
var listPackage = function(boardName)
{
    if(!util.fs.existsSync(`${util.boardDir}/${boardName}/package`)){ //util.boardDir+'/'+boardName+'/package')){ //no package folder
        return null;
    }
    var pacakgeName = util.fs.readdirSync(`${util.boardDir}/${boardName}/package`); //<<< "./component" must fix value, cannot use dynamic variable in webpack naja!!!!
    var context = {};
    pacakgeName.forEach(element => { //folder
        let fullPathPackage = `${util.boardDir}/${boardName}/package/${element}`;
        if(util.fs.lstatSync(fullPathPackage).isFile()){// skip file
            return;
        }
        let vcomponents = util.fs.readdirSync(fullPathPackage);
        vcomponents.forEach(componentFile =>{
            let fullPathComponent = `${util.boardDir}/${boardName}/package/${element}/${componentFile}`;
            let tmp = (/([A-Za-z0-9]+)\.(vue|js)$/g).exec(componentFile);
            if(tmp == null || tmp.length != 3){
                return;
            }
            let name = tmp[1];
            let fileType = tmp[2];
            if(!(element in context)){
                context[element] = {};
            }
            if(fileType == 'vue'){
                context[element][name] = fullPathComponent;
            }
            if(fileType == 'js' && name == 'config'){
                try {
                    context[element]['config'] = util.requireFunc(fullPathComponent);    
                } catch (error) {
                    console.log('connot import config : '+fullPathComponent);
                }
            }
        });
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
var packages = function(){
    if(Object.entries(listedPackages).length === 0 && listedPackages.constructor === Object){ // check empty object !!!
        listedPackages = listedPackages();
    }    
    return listedPackages;
};
export default {
    boards,
    packages,
    listBoard,
    listPackage,
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
