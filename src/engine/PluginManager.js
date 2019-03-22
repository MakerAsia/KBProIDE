import util from '@/engine/utils'
const fs = require('fs')
var localBoardName = '';
var localPlugins = {};
var listPlugin = function(dir){
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
                    name : plugin,
                    blocks : blocks,
                    generators : generators                    
                };
                console.log(`plugin "${plugin}" found ${blocks.length} block${blocks.length > 1 ? 's' : ''}`);
            }
        });
    }
    return plugins;
}

var listCategoryPlugins = function(pluginDir)
{
    var categories = [];
    var allPlugin = {};
    var cats = fs.readdirSync(pluginDir);
    cats.forEach(cat => {
        var dir = `${pluginDir}/${cat}`
        var infoFile = `${dir}/${cat}.json`

        if(!fs.lstatSync(dir).isDirectory()){ return; }
        if(!fs.existsSync(infoFile)) { return; }

        var catInfoFile = JSON.parse(fs.readFileSync(infoFile));
        var plugins = listPlugin(dir);
        categories.push({
            directory : cat,
            plugins : plugins,
            category : catInfoFile
        });
        Object.assign(allPlugin,plugins);
    });
    return {categories:categories,plugins:allPlugin};
};

//TODO : look for platform blocks

var loadPlugin = function(boardName,boardInfo){
    if((Object.entries(localPlugins).length === 0 && localPlugins.constructor === Object)||(boardName != localBoardName)){ // check empty object !!!
        localPlugins = listCategoryPlugins(`${util.boardDir}/${boardName}/plugin`);
        localBoardName = boardName;
    }
    return localPlugins;
};
var plugins = function(boardName)
{
    let lpg = loadPlugin(boardName);
    let cat = lpg.categories.map(data => { return data.category; });      
    return cat;
};

var listOnlinePlugin = function(name = '',start = 0){
    return new Promise((resolve,reject)=>{
        let onlinePlugins = [];
        if(name == ''){ //list all
            Vue.prototype.$db.collection('plugins')
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
        }else{
            var strSearch = name;
            var strlength = strSearch.length;
            var strFrontCode = strSearch.slice(0, strlength-1);
            var strEndCode = strSearch.slice(strlength-1, strSearch.length);

            var startcode = strSearch;
            var endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);

            Vue.prototype.$db.collection('plugins')   
            .where('name','>=',startcode) //search start with
            .where('name','<',endcode)
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
        }
    });
}
var installOnlinePlugin = function(info,cb)
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
        //check condition scope here 
        var targetDir = '';/////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<, มึงต้องดูว่าบอร์ดไหนสามารถใช้ซ้ำกันได้ด้วยนะ
        if(info.scope.includes('platform')){
            targetDir = util.platformDir+'/'+info.platform+'/plugin';
        }else if(info.scope.includes('board')){
            targetDir = util.boardDir+'/'+info.boardDir+'/board';
        }
        return util.unzip(zipFile,{dir: util.boardDir},p=>{ 
            cb & cb({process : 'board', status : 'UNZIP', state: p });
        });
    }).then(()=>{ //rename folder
        //rename ended with word '-master' in boards 
        var dirs = fs.readdirSync(util.boardDir);
        for(let i =0; i< dirs.length; i++){
            let dirname = path.join(util.boardDir, dirs[i]);
            if(fs.lstatSync(dirname).isDirectory() && dirname.endsWith('-master')){
                let sourceDir = dirname;
                let targetDir = dirname.replace(/\-master$/,"");
                fs.renameSync(sourceDir,targetDir);
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
export default{
    listPlugin,
    loadPlugin,
    plugins,
    listOnlinePlugin,
}