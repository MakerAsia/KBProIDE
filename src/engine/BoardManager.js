import util from '@/engine/utils';
//import nativeRequire from '@/NativeRequire';
const {resolve, join} = require('path');
const {homedir} = require('os');

var listedBoards = [];
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
