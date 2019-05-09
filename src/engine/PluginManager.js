import util from '@/engine/utils'
import RealBlockly from 'vue-blockly';
const fs = require('fs')
const os = require('os');
const path = require('path');
const request = require('request');
const progress = require('request-progress');

var localBoardName = '';
var localPlugins = {};

var listPlugin = function(dir){
    var plugins = {};
    let blockFiles = fs.readdirSync(dir);
    if(blockFiles.length > 0){
        blockFiles.forEach(blockFile => {
            let fblock = `${dir}/${blockFile}`;
            if(blockFile.endsWith(".js") && blockFile.startsWith("block") && fs.lstatSync(fblock).isFile()){
                // extract block definitions
                var blocks = [];
                var Blockly = {
                    Blocks : []
                }
                try{
                    if(!document.BlockyPlugin){
                        document.BlocklyPlugin = {};
                    }
                    let pluginWorkspace = new RealBlockly.Workspace();
                    eval(fs.readFileSync(fblock,'utf8'));
                    for (var i in Blockly.Blocks){
                        document.BlocklyPlugin[i] = pluginWorkspace;
                        blocks.push(i);
                    }
                }catch(e){
                    console.log(`plugin "${blockFile}" blocks.js error`);
                }//----------------------//

                // extrack block generators
                let fgen = `${dir}/${blockFile.replace("block","generator")}`;
                var generators = [];
                var Blockly = {
                    JavaScript: []
                };
                try {
                    eval(fs.readFileSync(fgen,'utf8'));
                    for (var i in Blockly.JavaScript) {
                        generators.push(i);
                    }
                } catch (e) {
                    console.log(`plugin "${plugin}" generator.js error`);
                }//----------------------//
                // TODO : check block and generator must eq
                plugins[blockFile] = {
                    dir : dir,
                    file : blockFile,
                    blocks : blocks,
                    generators : generators                    
                };
                console.log(`plugin "${blockFile}" found ${blocks.length} block${blocks.length > 1 ? 's' : ''}`);
            }
        });
    }
    return plugins;
}
var listKidBrightPlugin = function(dir)
{
    console.log('-----------');
    var plugins = {};
    let catPlugins = fs.readdirSync(dir);
    if(catPlugins.length > 0){
        catPlugins.forEach(plugin => {
            let fdir = `${dir}/${plugin}`;
            if(fs.lstatSync(fdir).isDirectory()){                
                // extract block definitions
                var blocks = [];
                var Blockly = {
                    Blocks : []
                }
                try{
                    eval(fs.readFileSync(`${fdir}/blocks.js`,'utf8'));
                    for (var i in Blockly.Blocks) {
                        blocks.push(i);
                    }
                }catch(e){
                    console.log(`plugin "${plugin}" blocks.js error`);
                }//----------------------//

                // extrack block generators
                var generators = [];
                var Blockly = {
                    JavaScript: []
                };
                try {
                    eval(fs.readFileSync(`${fdir}/generators.js`,'utf8'));
                    for (var i in Blockly.JavaScript) {
                        generators.push(i);
                    }
                } catch (e) {
                    console.log(`plugin "${plugin}" generator.js error`);
                }//----------------------//
                // TODO : check block and generator must eq
                plugins[plugin] = {
                    dir : fdir,
                    file : 'blocks.js',
                    name : plugin,
                    blocks : blocks,
                    generators : generators                    
                };
                console.log(`plugin "${plugin}" found ${blocks.length} block${blocks.length > 1 ? 's' : ''}`);
            }
        });
    }
    return plugins;
};

var listCategoryPlugins = function(pluginDir){
    var categories = [];
    var allPlugin = {};
    if(fs.existsSync(pluginDir)){
        var cats = fs.readdirSync(pluginDir);
        cats.forEach(cat => {
            var dir = `${pluginDir}/${cat}`
            var infoFile = `${dir}/library.json`;
            var kbPluginInfoFile = `${dir}/${cat}.json`;
            var srcDir = `${dir}/src`;
            var blockDir = `${dir}/blocks`;
            if(fs.existsSync(infoFile) && fs.existsSync(srcDir) && fs.existsSync(blockDir)){
                var pluginInfo = JSON.parse(fs.readFileSync(infoFile,'utf8'));
                var plugins = listPlugin(blockDir);
                var srcFile = fs.readdirSync(srcDir);
                categories.push({
                    directory : dir,
                    dirName : cat,
                    sourceFile : srcFile,
                    plugins : plugins,
                    category : pluginInfo
                });
                Object.assign(allPlugin,plugins);
            }else if(fs.existsSync(dir) && fs.existsSync(kbPluginInfoFile)){
                var catInfoFile = JSON.parse(fs.readFileSync(kbPluginInfoFile));
                var plugins = listKidBrightPlugin(dir);
                categories.push({
                    directory : dir,
                    dirName : cat,
                    plugins : plugins,
                    category : catInfoFile
                });
                Object.assign(allPlugin,plugins);
            }
        });
    }
    return {categories:categories,plugins:allPlugin};
}
//TODO : look for platform blocks

var loadPlugin = function(boardInfo){
    if((Object.entries(localPlugins).length === 0 && localPlugins.constructor === Object)||(boardInfo.name != localBoardName)){ // check empty object !!!
        //load mother platform
        //TODO : implement look up in mother of platform again
        //load from platform
        let platformPlugins = listCategoryPlugins(`${util.platformDir}/${boardInfo.platform}/plugin`)
        //load from board
        let boardPlugins = listCategoryPlugins(`${util.boardDir}/${boardInfo.name}/plugin`)
        //join all together
        let allPlugins = {};
        Object.assign(allPlugins,platformPlugins.plugins);
        Object.assign(allPlugins,boardPlugins.plugins);
        localPlugins = { 
            categories: platformPlugins.categories.concat(boardPlugins.categories),
            plugins: allPlugins
        };
    }
    return localPlugins;
};

var clearListedPlugin = function(){
    localPlugins = {};
};

var plugins = function(boardInfo)
{
    let lpg = loadPlugin(boardInfo);
    return lpg.categories;
};
var performPluginSearch = function(name,value,start = 0)
{
    return new Promise((resolve,reject)=>{
        let onlinePlugins = [];
        Vue.prototype.$db.collection('plugins')
            .where(name,"==",value)
            .orderBy("name")
            .startAfter(start)
            .limit(50)
            .get().then(data =>{
                var lastVisible = data.docs[data.docs.length-1];
                data.forEach(element => {
                    onlinePlugins.push(element.data());
                });
                resolve({end : lastVisible, plugins : onlinePlugins});
            }).catch(err=>{
                reject(err);
            });
    });
}
var performPluginNameSearch = function(name,column,value,start= 0){
    return new Promise((resolve,reject)=>{
        let onlinePlugins = [];
        var strSearch = name;
        var strlength = strSearch.length;
        var strFrontCode = strSearch.slice(0, strlength-1);
        var strEndCode = strSearch.slice(strlength-1, strSearch.length);

        var startcode = strSearch;
        var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        Vue.prototype.$db.collection('plugins')   
            .where('name','>=',startcode) //search start with
            .where('name','<',endcode)
            .where(column,"==",value)
            .orderBy("name")
            //.startAfter(start)
            .limit(50)
            .get().then(data =>{
                var lastVisible = data.docs[data.docs.length-1];
                data.forEach(element => {
                    onlinePlugins.push(element.data());
                });
                resolve({end : lastVisible, plugins : onlinePlugins});
            }).catch(err=>{
                reject(err);
            });
    });    
}
var listOnlinePlugin = function(boardInfo,name = '',start = 0){
    return new Promise((resolve,reject)=>{
        let onlinePlugins = [];
        if(name == ''){ //list all
            performPluginSearch("board",boardInfo.name)
                .then(res=>{
                    onlinePlugins = onlinePlugins.concat(res.plugins);
                    return performPluginSearch("platform",boardInfo.platform);
                })
                .then(res=>{
                    onlinePlugins = onlinePlugins.concat(res.plugins);
                    resolve({plugins : onlinePlugins});
                })
                .catch(err=>{
                    reject(err);
                });
        }else{
            performPluginNameSearch(name,"board",boardInfo.name)
                .then(res=>{
                    onlinePlugins = onlinePlugins.concat(res.plugins);
                    return performPluginNameSearch(name,"platform",boardInfo.platform);
                })
                .then(res=>{
                    onlinePlugins = onlinePlugins.concat(res.plugins);
                    resolve({plugins : onlinePlugins});
                })
                .catch(err=>{
                    reject(err);
                });
            
        }
    });
}

var installPluginByName = function(name,cb)
{
    return new Promise((resolve,reject) => {
        Vue.prototype.$db.collection('plugins')
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
        return installOnlinePlugin(info,cb);
    });
};
var installOnlinePlugin = function(info,cb)
{
    if(info.board){
        var targetDir = util.boardDir + "/" + info.board + "/plugin";
    }else if(info.platform){
        var targetDir = util.platformDir + "/" + info.platform + "/plugin";
    }else{
        throw "no target defined";
    }
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
        return util.unzip(zipFile,{dir: targetDir},p=>{ 
            cb & cb({process : 'board', status : 'UNZIP', state: p });
        });
    }).then(()=>{ //rename folder
        //rename ended with word '-master' in boards 
        var dirs = fs.readdirSync(targetDir);
        for(let i =0; i< dirs.length; i++){
            let dirname = path.join(targetDir, dirs[i]);
            if(fs.lstatSync(dirname).isDirectory() && dirname.endsWith('-master')){
                let source = dirname;
                let target = path.join(targetDir,info.name);
                fs.renameSync(source,target);
            }
        }
        return true;
    });
};

var removePlugin = function(pluginInfo,isBackupRemove = false)
{
    if(pluginInfo.board){
        var targetDir = util.boardDir + "/" + pluginInfo.board + "/plugin";
    }else if(pluginInfo.platform){
        var targetDir = util.platformDir + "/" + pluginInfo.platform + "/plugin";
    }else{
        throw "no target defined";
    }
    return new Promise((resolve,reject)=>{
        let target = `${targetDir}/${pluginInfo.name}`;
        if(isBackupRemove){
            target += "-backup-plugin";
        }
        if(fs.existsSync(target)){
            util.rmdirf(target);
            resolve();
        }else{
            reject('no directory')
        }
    });
}

var backupPlugin = function(pluginInfo)
{
    if(pluginInfo.board){
        var targetDir = util.boardDir + "/" + pluginInfo.board + "/plugin";
    }else if(pluginInfo.platform){
        var targetDir = util.platformDir + "/" + pluginInfo.platform + "/plugin";
    }else{
        throw "no target defined";
    }
    return new Promise((resolve,reject)=>{
        let target = `${targetDir}/${pluginInfo.name}`;
        let newer = `${targetDir}/${pluginInfo.name}-backup-plugin`;
        fs.renameSync(target,newer);
        resolve();
    }) ;
}

var restorePlugin = function(pluginInfo)
{
    if(pluginInfo.board){
        var targetDir = util.boardDir + "/" + pluginInfo.board + "/plugin";
    }else if(pluginInfo.platform){
        var targetDir = util.platformDir + "/" + pluginInfo.platform + "/plugin";
    }else{
        throw "no target defined";
    }
    return new Promise((resolve,reject)=>{
        let target = `${targetDir}/${pluginInfo.name}`;
        let newer = `${targetDir}/${pluginInfo.name}-backup-plugin`;
        fs.renameSync(newer,target);
        resolve();
    }) ;
}

export default{
    listPlugin,
    loadPlugin,
    plugins,
    listOnlinePlugin,
    installOnlinePlugin,
    clearListedPlugin,
    removePlugin,
    backupPlugin,
    restorePlugin,
}