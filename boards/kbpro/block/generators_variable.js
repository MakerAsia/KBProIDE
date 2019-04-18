module.exports = function(Blockly){
    'use strict';
if(!Blockly.dbNameType){
    Blockly.dbNameType = {};
}
Blockly.JavaScript['variables_get'] = function(block) {
// Variable getter.
var code = Blockly.JavaScript.variableDB_.getName(block.getField('VAR').getText(),Blockly.Variables.NAME_TYPE);
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['variables_set'] = function(block) {
    // Variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

    var varName = Blockly.JavaScript.variableDB_.getName(block.getField('VAR').getText(), Blockly.Variables.NAME_TYPE);
    if(block.childBlocks_.length >= 1){
        var child = block.getInputTargetBlock("VALUE");
        if(child){
            if(child.outputConnection.check_ && child.outputConnection.check_[0]){
                var childType = child.outputConnection.check_[0];
            }
        }
        Blockly.dbNameType[varName] = {
            name : varName, type : childType
        };
    }
    return varName + ' = ' + argument0 + ';\n';
};

}  