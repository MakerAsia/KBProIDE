/*
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

                */