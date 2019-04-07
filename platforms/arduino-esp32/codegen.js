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

module.exports = {
    createCodeContext : function(rawCode,config,plugins)
    {
        //---- find setup code ----//
        let setup_code = [];
        let setupRegex = /.*?SETUP\.(.*?\(?.*?\)?;)/gm;
        let replaceRegex1 = /SETUP\..*?\(?.*?\)?;/gm;        
        let m;
        while ((m = setupRegex.exec(rawCode)) !== null) {
            if (m.index === setupRegex.lastIndex) {
                setupRegex.lastIndex++;
            }
            if(m.length == 2){
                let code = m[1];
                if(!setup_code.includes(code)){
                    setup_code.push(code);
                }
            }
        }        
        var source_code = rawCode.replace(replaceRegex1,"");
        //---- variable -----//
        let variables = [];
        let varRegex = /.*?VARIABLE\.(.*?;)/gm;
        let varReplaceRegex = /VARIABLE\..*?;/gm;
        let vr;
        while ((vr = varRegex.exec(source_code)) !== null) {
            if (vr.index === varRegex.lastIndex) {
                varRegex.lastIndex++;
            }
            if(vr.length == 2){
                let code = vr[1];
                if(!variables.includes(code)){
                    variables.push(code);
                }
            }
        }
        source_code = source_code.replace(varReplaceRegex,"");
        //---- clean empty line ----//
        let replaceRegex2 = /^\s*[\r\n]/gm;        
        source_code = source_code.replace(replaceRegex2,"");
        //----- list include cpp file------//        
        //console.log(inc_src);
        return {
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