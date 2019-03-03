const codegen = require('./codegen');
const path = require('path')
const fs = require('fs')
const log = require('./log')
const util = require('util')
const SerialPort = require('serialport');
//const QRCode = require('qrcode');

var context = JSON.parse(fs.readFileSync('./context.json').toString())
var config = require('./config')
var platformDir = `../../platforms/${config.platform}`
var platformCompiler = require(platformDir+"/compiler");
var pluginDir = `./plugin`
var toolDir = `${platformDir}/tools`

function is_null(val) {
    return ((val == null) || (typeof (val) == 'undefined'));
}

function is_not_null(val) {
    return (!((val == null) || (typeof (val) == 'undefined')));
}

function esptool() {
    if (process.platform == 'win32') {
        return `${toolDir}/esptool.exe`;
    } else if (process.platform == 'darwin') {
        return `${toolDir}/esptool`;
    }
    return `${toolDir}/esptool.py`;
}

var listPlugin = function(dir){    
    var plugins = {};
    let catPlugins = fs.readdirSync(dir);
    if(catPlugins.length > 0){
        catPlugins.forEach(plugin => {
            let dir = `${pluginDir}/${dir}/${plugin}`;
            if(fs.lstatSync(dir).isDirectory()){                
                // extract block definitions
                var blocks = [];                
                var Blockly = {
                    Blocks : []
                }
                try{
                    eval(fs.readFileSync(`${dir}/blocks.js`,'utf8'));
                    for (var i in Blockly.Blocks) {
                        blocks.push(i);
                    }
                }catch(e){
                    log.e(`plugin "${plugin}" blocks.js error`);
                }//----------------------//

                // extrack block generators
                var generators = [];
                var Blockly = {
                    JavaScript: []
                };
                try {
                    eval(fs.readFileSync(`${dir}/generators.js`,'utf8'));
                    for (var i in Blockly.JavaScript) {
                        generators.push(i);
                    }
                } catch (e) {
                    log.e(`plugin "${plugin}" generator.js error`);
                }//----------------------//

                // read source and include file
                var srcs = [];
                var incs = [];
                var files = fs.readdirSync(dir);
                files.forEach(file => {
                    if(fs.lstatSync(`${dir}/${file}`).isFile()){
                        // source file (*.c, *.cpp)
                        if ((file.match(/\.c$/g) != null) || (file.match(/\.cpp$/g) != null)) {
                            srcs.push(file);
                        }
                        // header file (*.h, *.hpp)
                        if (file.match(/\.h$/g) != null || (file.match(/\.hpp$/g) != null)) {
                            incs.push(file);
                        }
                    }
                });
                // TODO : check block and generator must eq
                plugins[plugin] = {
                    dir : dir,
                    incs : incs,
                    srcs : srcs,
                    name : plugin,
                    blocks : blocks
                };
                Log.i(`plugin "${plugin}" found ${blocks.length} block${blocks.length > 1 ? 's' : ''}`);
            }
        });
    }
    return plugins;
}

var listCategoryPlugins = function()
{
    var categories = [];
    var allPlugin = {};
    var cats = fs.readdirSync(pluginDir);
    cats.forEach(cat => {
        var dir = `${pluginDir}/${cat}`
        var infoFile = `${pluginDir}/${cat}.json`

        if(!fs.lstatSync(dir).isDirectory()){ return; }        
        if(!fs.existsSync(infoFile)) { return; }

        var catInfoFile = JSON.parse(fs.readFileSync(infoFile));
        var plugins = listCategoryPlugins(cat);
        categories.push({
            directory : cat,
            plugins : plugins,
            category : catInfoFile
        });
        Object.assign(allPlugin,plugins);
    });
    return {categories:categories,plugins:allPlugin};
};

async function listPort()
{
    return new Promise(function(resolve,reject){
        try {
            require('serialport').list(function (err, ports) {
                if (err) reject(err);

                var port_list_str = 'none';
                var port_list = [];
                for (var i in ports) {
                    if (is_not_null(ports[i].comName) && is_not_null(ports[i].productId) && is_not_null(ports[i].vendorId)) {
                        var uid = ports[i].vendorId + ':' + ports[i].productId;
                        if (context.port_vid_pid.indexOf(uid.toLowerCase()) >= 0) {
                            port_list.push(ports[i].comName);
                            if (i == 0) {
                                port_list_str = ports[i].comName;
                            }
                            else {
                                port_list_str += ', ' + ports[i].comName;
                            }
                        }
                    }
                }
                log.i('serial port enumerated (' + port_list_str + ')');
                resolve(port_list);
            });
        } catch (err) {
            log.e('port read error : ' + err);            
        }
    });
}


async function compile(rawCode,boardName,config,cb)
{
    var res = {
        status : 'OK',  //OK,FAIL,PROGRESS,LOG
        msg : '',       //error or return message
        progress : 0,   //build progress percentage if status = PROGRESS
    };
    //--- init ---//
    var C = {};
    var app_dir = `./build/${boardName}`;
    //--- step 1 load template and create full code ---//
    var template = fs.readFileSync('template.c','utf8');
    var code = codegen.codeGenerate(rawCode,template,config);
    !fs.existsSync(app_dir) && fs.mkdirSync(app_dir,{recursive : true}); //create app_dir if not existing
    fs.writeFileSync(`./build/${boardName}/user_app.cpp`,code,'utf8');
    //--- step 2 list plugins dependency ---//
    var categoriesInfo = listCategoryPlugins();
    var categories = categoriesInfo.categories;
    var plugins = categories.plugins;

    //--- step 3 load variable and flags ---//
    C.cflags = context.cflags;
    C.ldflags = context.ldflags;

    //--- step 4 compile
    var contextBoard = {
        board_name : "123456",
        app_dir : `./build/${boardName}`,
        process_dir : "./",
    };
    platformCompiler.setConfig(contextBoard);
    //platformCompiler.compileFiles()
}


module.exports = {        
    //compileProgram: util.promisify(compileFiles),
    listPlugin,
    listPort,
    listCategoryPlugins,
    compile
}