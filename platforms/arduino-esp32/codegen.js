const fs = require('fs');
const path = require('path');
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
        //---- find loop extension code ----//
        let loopExtRegex = /#LOOP_EXT_CODE(.*?)#END/gms;
        let loopExtRegex1 = /#LOOP_EXT_CODE.*?#END/gms;
        let loop_ext_code = findString(loopExtRegex,source_code);
        source_code = source_code.replace(loopExtRegex1,"");
        //---- find setup code ----//
        let setupRegex = /#SETUP(.*?)#END/gms;
        let replaceRegex1 = /#SETUP.*?#END/gms;        
        let setup_code = findString(setupRegex,source_code);
        source_code = source_code.replace(replaceRegex1,"");
        //---- find user block setup code ----//
        let blocksetupRegex = /#BLOCKSETUP(.*?)#END/gms;
        let blockreplaceRegex1 = /#BLOCKSETUP.*?#END/gms;
        let blocksetup_code = findString(blocksetupRegex,source_code);
        source_code = source_code.replace(blockreplaceRegex1,"");
        //---- clean empty line ----//
        let replaceRegex2 = /^\s*[\r\n]/gm;        
        source_code = source_code.replace(replaceRegex2,"");
        //----- list include cpp file------//        
        return {            
            FUNCTION : functions.join('\n'),
            VARIABLE : variables.join('\n'),
            SETUP_CODE : setup_code.join('\n'),
            BLOCKSETUP : blocksetup_code,
            LOOP_CODE : source_code,
            LOOP_EXT_CODE : loop_ext_code
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