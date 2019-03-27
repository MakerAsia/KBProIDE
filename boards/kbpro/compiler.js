const fs = require('fs')
var engine = Vue.prototype.$engine;
var G = Vue.prototype.$global;
//---- setup dir and config ----//
var boardDirectory = `${engine.util.boardDir}/${G.board.board}`;

var context = JSON.parse(fs.readFileSync(boardDirectory+"/context.json","utf8"))
var config = require('./config');
var platformDir = `${engine.util.platformDir}/${config.platform}`;
var platformCompiler = engine.util.requireFunc(`${platformDir}/compiler`);

function is_not_null(val) {
    return (!((val == null) || (typeof (val) == 'undefined')));
}

function listPort()
{
    return new Promise(function(resolve,reject){
        try {
            require('serialport').list(function (err, ports) {
                if (err) reject(err);
                if(ports.length == 0) reject("No COM PORT found");

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
                console.log('serial port enumerated (' + port_list_str + ')');
                if(port_list.length == 0){
                    reject('no COM port found');
                }else{
                    resolve(port_list);
                }
            });
        } catch (err) {
            console.log('port read error : ' + err);
            reject(err);
        }
    });
}


function compile(rawCode,boardName,config,cb)
{
    return new Promise((resolve,reject) => {
        //--- init ---//
        if(fs.existsSync(`${boardDirectory}/codegen.js`)){
            var codegen = require('./codegen');
        }else{
            var codegen = engine.util.requireFunc(`${platformDir}/codegen`);
        }
        var app_dir = `${boardDirectory}/build/${boardName}`;
        //--- step 1 load template and create full code ---//
        var template = fs.readFileSync(`${boardDirectory}/template.c`,'utf8');
        var {sourceCode,codeContext} = codegen.codeGenerate(rawCode,template,config);
        !fs.existsSync(app_dir) && fs.mkdirSync(app_dir,{recursive : true}); //create app_dir if not existing
        fs.writeFileSync(`${app_dir}/user_app.cpp`,sourceCode,'utf8');
        //--- step 3 load variable and flags ---//
        var cflags = context.cflags.map(f => f.replace('-Ilib',`-I"${boardDirectory}/lib`)+'"');
        var ldflags = context.ldflags.map(f => f.startsWith('-Llib') ? (f.replace('-Llib',`-L"${boardDirectory}/lib`)+'"') : f);
        ldflags = ldflags.map(f => f.startsWith("lib/") ? ('"'+f.replace("lib/",`${boardDirectory}/lib/`)+'"') : f);
        //--- step 4 compile
        var contextBoard = {
            board_name : boardName,
            app_dir : app_dir,
            process_dir : boardDirectory,
        };
        var sourceFiles = codeContext.plugins_sources;
        sourceFiles.push(`${app_dir}/user_app.cpp`);
        var includeSwitch = codeContext.plugins_includes_switch;
        platformCompiler.setConfig(contextBoard);
        //(sources, boardCppOptions, boardcflags, plugins_includes_switch)    
        platformCompiler.compileFiles(sourceFiles,[], cflags, includeSwitch)
        .then(()=>{
            return platformCompiler.archiveProgram(sourceFiles);
        }).then(()=>{
            return platformCompiler.linkObject(ldflags);
        }).then(()=>{
            return platformCompiler.createBin();            
        }).then(()=>{
            resolve();
        }).catch(msg=>{
            console.log('error msg : ' + msg);
            reject(msg);
        });
        
    });
}
var exp = {};
Object.assign(exp,platformCompiler);
Object.assign(exp,
    {
        listPort,
        compile
    }
);
//console.log(exp);
module.exports = exp;
