import util from '@/engine/utils';
import pfm from '@/engine/PlatformManager';
//import axios from 'axios';
import fs from 'fs';
const os = require('os');
const request = require('request');
const progress = require('request-progress');
//const db = Vue.prototype.$db;

var listedBoards = [];
var listedPackages = {};
var listedPackagesBoard = '';

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
            let tmp = (/^([A-Za-z0-9]+)\.(vue|js)$/g).exec(componentFile);
            if(tmp == null || tmp.length != 3){
                return;
            }
            let name = tmp[1];
            let fileType = tmp[2];
            if(!(element in context)){
                context[element] = {};
            }
            /*if(fileType == 'vue'){ //TODO : check if have a way to load vue at runtime at the future. but now we disabled.
                context[element][name] = fullPathComponent;
            }*/
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
var listOnlineBoard = function(name = '',start = 0){
    return new Promise((resolve,reject)=>{
        let onlineBoards = [];
        if(name == ''){ //list all
            Vue.prototype.$db.collection('boards')
            .orderBy("name")
            .startAfter(start)
            .limit(50)
            .get().then(boardData =>{
                var lastVisible = boardData.docs[boardData.docs.length-1];
                boardData.forEach(element => {
                    onlineBoards.push(element.data());
                });
                resolve({end : lastVisible, boards : onlineBoards});
            }).catch(err=>{                
                reject(err);
            });
        }else{
            var strSearch = name;
            var strlength = strSearch.length;
            var strFrontCode = strSearch.slice(0, strlength-1);
            var strEndCode = strSearch.slice(strlength-1, strSearch.length);

            var startcode = strSearch;
            var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

            Vue.prototype.$db.collection('boards')            
            .where('name','>=',startcode) //search start with
            .where('name','<',endcode)
            .orderBy("name")
            //.startAfter(start)
            .limit(50)
            .get().then(boardData =>{
                var lastVisible = boardData.docs[boardData.docs.length-1];
                boardData.forEach(element => {
                    onlineBoards.push(element.data());
                });
                resolve({end : lastVisible, boards : onlineBoards});
            }).catch(err=>{                
                reject(err);
            });
        }
    });    
}

var loadBoardManagerConfig = function(){
    let configFile = util.boardDir+'/config.js';
    if(!util.fs.existsSync(configFile)){
        return null;
    }
    return util.requireFunc(configFile);
};
var installBoardByName = function(name,cb)
{
    return new Promise((resolve,reject) => {
        Vue.prototype.$db.collection('boards')
            .where("name", "==", name)
            .get()
            .then(platfromData =>{    
                platfromData.forEach(element => {
                    return resolve(element.data());                    
                });
            }).catch(err=>{
                reject(err);
            });
    }).then((info)=>{
        return installOnlineBoard(info,cb);
    });
};
var installOnlineBoard = function(info,cb)
{
    return new Promise((resolve, reject) => { //download zip
        if(!info.git){ reject('no git found'); }
        var zipUrl = info.git + "/archive/master.zip";
        var zipFile = os.tmpdir()+'/'+util.randomString(10)+'.zip';
        var file = fs.createWriteStream(zipFile);
        progress(
            request(zipUrl),
            {
                throttle: 2000, // Throttle the progress event to 2000ms, defaults to 1000ms 
                delay: 1000,    // Only start to emit after 1000ms delay, defaults to 0ms 
                followAllRedirects: true,
                follow : true,
            }
        ).on('progress', function (state) {
            cb & cb({process : 'board', status : 'DOWNLOAD', state:state }); 
        }).on('error', function (err) {
            reject(err);
        }).on('end', function () {
            file.end();
            return resolve(zipFile);
        })
        .pipe(file);
    }).then((zipFile)=>{ //unzip file
        return util.unzip(zipFile,{dir: util.boardDir},p=>{ 
            cb & cb({process : 'board', status : 'UNZIP', state: p });
        });
    }).then(()=>{ //rename folder
        //rename ended with word '-master' in boards 
        var dirs = fs.readdirSync(util.boardDir);
        for(let i =0; i< dirs.length; i++){
            let dirname = dirs[i];
            if(fs.statSync(dirname).isDirectory() && dirname.endsWith('-master')){
                fs.renameSync(path.join(util.boardDir,dirname),path.join(util.boardDir,dirname.replace("-master","")));
            }
        }
        return true;
    }).then(()=>{ //install platform
        if(!fs.readdirSync(util.platformDir).includes(info.platform)){
            return pfm.installPlatfromByName(info.platform);
        }
        return Promise.resolve();
    });
};

var boards = function(){
    if(listedBoards.length === 0){ // check empty object !!!
        listedBoards = listBoard();
    }
    return listedBoards;
};

var packages = function(selectedBoard){
    if((Object.entries(listedPackages).length === 0 && listedPackages.constructor === Object) || (listedPackagesBoard != selectedBoard)){ // check empty object !!!
        listedPackages = listPackage(selectedBoard);
        listedPackagesBoard = selectedBoard;
    }
    return listedPackages;
};
var filerBoardPackageComponent = function(localPackage,name){
    var components = {};
    Object.keys(localPackage).forEach(packageName => {
        if('config' in localPackage[packageName]){
            let conf = localPackage[packageName].config;
            components[packageName] = [];
            if('component' in conf){
                conf.component.forEach(componentName => {                    
                    if(componentName.toLowerCase().startsWith(name.toLowerCase())){
                        if(!components[packageName].includes(componentName)){
                            components[packageName].push(componentName);
                        }
                    }
                });
            }
        }
    });
    return components;
};
export default {
    boards,
    packages,
    listBoard,
    listOnlineBoard,
    listPackage,
    listToolbar : selectedBoard => filerBoardPackageComponent(packages(selectedBoard),'Toolbar'),
    listActionbar : selectedBoard => filerBoardPackageComponent(packages(selectedBoard),'Actionbar'),
    listPage : selectedBoard => filerBoardPackageComponent(packages(selectedBoard),'Page'),
    listLeftDrawer : selectedBoard => filerBoardPackageComponent(packages(selectedBoard),'LeftDrawer'),
    listRightDrawer : selectedBoard => filerBoardPackageComponent(packages(selectedBoard),'RightDrawer'),
    listBottomPanel : selectedBoard => filerBoardPackageComponent(packages(selectedBoard),'BottomPanel'),
    listRightTab : selectedBoard => filerBoardPackageComponent(packages(selectedBoard),'RightTab'),
    listBottomTab : selectedBoard => filerBoardPackageComponent(packages(selectedBoard),'BottomTab'),
    loadBoardManagerConfig,
    installOnlineBoard,
    installBoardByName,
    load : ()=>{

    },
    install : (namespace)=>{

    },
    remove : (namespace)=>{

    },
    update : (namespace)=>{

    }
}
