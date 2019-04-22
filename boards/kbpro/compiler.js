const fs = require('fs');
const path = require('path');
var engine = Vue.prototype.$engine;
var G = Vue.prototype.$global;
//---- setup dir and config ----//
var boardDirectory = `${engine.util.boardDir}/${G.board.board}`;
var pluginDir = `${boardDirectory}/plugin`;
var boardIncludeDir = `${boardDirectory}/include`;
var platfromIncludeDir = `${boardDirectory}/include`;

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
        let inc_src = engine.util.walk(boardIncludeDir).filter(file => path.extname(file) == ".cpp" || path.extname(file) == ".c");
        inc_src = inc_src.concat(engine.util.walk(platfromIncludeDir).filter(file => path.extname(file) == ".cpp" || path.extname(file) == ".c"));
        let inc_switch = [];
        //--- step 1 load template and create full code ---//
        if(config.isSourceCode){
            var sourceCode = rawCode;
        }else{
            var {sourceCode,codeContext} = codegen.generate(rawCode);
        }
        //------ clear build folder and create new one --------//
        if(fs.existsSync(app_dir)){
            engine.util.rmdirf(app_dir);
        }
        fs.mkdirSync(app_dir,{recursive : true});
        //-----------------------------------------------------//
        fs.writeFileSync(`${app_dir}/user_app.cpp`,sourceCode,'utf8');        
        //--- step 3 load variable and flags ---//
        var cflags = [];
        var ldflags = [];
        var libflags = [];
        if(context.cflags){
            cflags = context.cflags.map(f => f.replace(/\{board\}/g,boardDirectory));
        }
        if(context.ldflags){
            ldflags = context.ldflags.map(f => f.replace(/\{board\}/g,boardDirectory));
        }
        if(context.libflags){
            libflags = context.libflags.map(f => f.replace(/\{board\}/g,boardDirectory));
        }
        //--- step 4 compile
        var contextBoard = {
            board_name : boardName,
            app_dir : app_dir,
            process_dir : boardDirectory,
        };
        var sourceFiles = inc_src;
        var includeSwitch = inc_switch;
        sourceFiles.push(`${app_dir}/user_app.cpp`);        
        platformCompiler.setConfig(contextBoard);        
        //(sources, boardCppOptions, boardcflags, plugins_includes_switch -Ixxx/xxx)
        engine.util.promiseTimeout(1000).then(()=>{
            return platformCompiler.compileFiles(sourceFiles,[], cflags, includeSwitch); 
        }).then(()=>{
            return engine.util.promiseTimeout(1000);
        }).then(()=>{
            return platformCompiler.archiveProgram(sourceFiles);
        }).then(()=>{
            return engine.util.promiseTimeout(1000);
        }).then(()=>{
            return platformCompiler.linkObject(ldflags,libflags);
        }).then(()=>{
            return engine.util.promiseTimeout(1000);
        }).then(()=>{
            return platformCompiler.createBin(); 
        }).then(()=>{
            return engine.util.promiseTimeout(1000);
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
