const fs = require('fs');
const md5 = require('md5');
const log = require('./log');


//---- setup dir ----//
var engine = Vue.prototype.$engine;
var G = Vue.prototype.$global;
var boardDirectory = `${engine.util.boardDir}/${G.board.board}`;
var platformDir = `${engine.util.platformDir}/${G.board.board_info.platform}`;
var pluginDir = `${boardDirectory}/plugin`;
//-------------------//

module.exports = {
	generate : function(rawCode){
        var template = fs.readFileSync(`${platformDir}/template.c`,'utf8');        
        let result = template;
        let codeContext = {};
        return {sourceCode : result, codeContext : codeContext};
    }
}