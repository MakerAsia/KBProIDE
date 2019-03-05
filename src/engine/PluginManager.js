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
    }
    return localPlugins;
};

export default{
    listPlugin,
    loadPlugin
}