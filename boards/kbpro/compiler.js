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
        if(config.isSourceCode){
            var sourceCode = rawCode;
            var codeContext = config.codeContext;
        }else{
            if(fs.existsSync(`${boardDirectory}/template.c`)){
                var template = fs.readFileSync(`${boardDirectory}/template.c`,'utf8');
            }else{
                var template = fs.readFileSync(`${platformDir}/template.c`,'utf8');
            }            
            var {sourceCode,codeContext} = codegen.codeGenerate(rawCode,template,config);
        }
        
        !fs.existsSync(app_dir) && fs.mkdirSync(app_dir,{recursive : true}); //create app_dir if not existing
        fs.writeFileSync(`${app_dir}/user_app.cpp`,sourceCode,'utf8');
        //--- step 3 load variable and flags ---//
        var cflags = [];
        var ldflags = [];
        if(context.cflags){
            var cflags = context.cflags.map(f => f.replace(/\{board\}/g,boardDirectory));
        }
        if(context.ldflags){
            var ldflags = context.ldflags.map(f => f.startsWith('-Llib') ? (f.replace('-Llib',`-L"${boardDirectory}/lib`)+'"') : f);
            ldflags = ldflags.map(f => f.startsWith("lib/") ? ('"'+f.replace("lib/",`${boardDirectory}/lib/`)+'"') : f);
        }        
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
        compile
    }
);
//console.log(exp);
module.exports = exp;
