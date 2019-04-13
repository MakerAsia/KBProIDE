const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const log = require('./log');


//---- setup dir ----//
var engine = Vue.prototype.$engine;
var G = Vue.prototype.$global;
var boardDirectory = `${engine.util.boardDir}/${G.board.board}`;
var platformDir = `${engine.util.platformDir}/${G.board.board_info.platform}`;

//-------------------//
var findString = function(regexS,rawCode,index = 1)
{
    let res = [];
    let m;
    while ((m = regexS.exec(rawCode)) !== null) {
        if (m.index === regexS.lastIndex) {
            regexS.lastIndex++;
        }
        if(m){
            let code = m[index];
            if(!res.includes(code)){
                res.push(code);
            }
        }
    }
    return res;
};
module.exports = {
    createCodeContext : function(rawCode,config,plugins)
    {
        var source_code = rawCode;
        //---- variable -----//        
        let varRegex = /#VARIABLE(.*?)#END/gms;
        let varReplaceRegex = /#VARIABLE.*?#END/gms;
        let variables = findString(varRegex,source_code);        
        source_code = source_code.replace(varReplaceRegex,"");
        //---- function -----//        
        let functionsRegex = /#FUNCTION(.*?)#END/gms;
        let functionReplaceRegex = /#FUNCTION.*?#END/gms;
        let functions = findString(functionsRegex,source_code);        
        source_code = source_code.replace(functionReplaceRegex,"");
        //---- find setup code ----//
        let setupRegex = /#SETUP(.*?)#END/gms;
        let replaceRegex1 = /#SETUP.*?#END/gms;        
        let setup_code = findString(setupRegex,source_code);        
        source_code = source_code.replace(replaceRegex1,"");        
        //---- clean empty line ----//        
        let replaceRegex2 = /^\s*[\r\n]/gm;        
        source_code = source_code.replace(replaceRegex2,"");
        //----- list include cpp file------//        
        //console.log(inc_src);
        return {            
            FUNCTION : functions.join('\n'),
            VARIABLE : variables.join('\n'),
            SETUP_CODE : setup_code.join('\n'),
            LOOP_CODE : source_code
        }
    },
	generate : function(rawCode){
        if(fs.existsSync(`${boardDirectory}/template.c`)){
            var template = fs.readFileSync(`${boardDirectory}/template.c`,'utf8');
        }else{
            var template = fs.readFileSync(`${platformDir}/template.c`,'utf8');
        }        
        var codeContext = this.createCodeContext(rawCode,null,null);
        const entries = Object.entries(codeContext)
        const result = entries.reduce( (output, entry) => {
            const [key, value] = entry;
            const regex = new RegExp( `\\$\{${key}\}`, 'g');
            return output.replace( regex, value );
        }, template );
        //let result = template;
        //let codeContext = {};
        return {sourceCode : result, codeContext : codeContext};
    }
}