module.exports = function(Blockly){
    'use strict';

Blockly.JavaScript['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
      var id = block.id.replace(/\$/g, '$$$$');  // Issue 251.
      branch = Blockly.JavaScript.prefixLines(
          Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
          '\'' + id + '\''), Blockly.JavaScript.INDENT) + branch;
    }
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
      branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
          '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',Blockly.JavaScript.ORDER_NONE) || '';
    var args = [];
    var argsIncType = [];
    for (var i = 0; i < block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.variableDB_.getName(block.arguments_[i],Blockly.Variables.NAME_TYPE);
      let vType = (args[i] in Blockly.dbNameType) ? Blockly.dbNameType[args[i]].type : "int";
      argsIncType[i] = vType+' '+args[i];
    }
    //--- return type ---//
    if(block.childBlocks_.length >= 1){
        var child = block.getInputTargetBlock("RETURN");
        if(child){
            if(child.outputConnection.check_ && child.outputConnection.check_[0]){
                var childType = child.outputConnection.check_[0].toLowerCase();   
            }
        }
    }
    var returnType = 'void';
    if(childType){
        returnType = childType;
    }else{
        if(returnValue in Blockly.dbNameType){
            returnType = Blockly.dbNameType[returnValue].type;
        }
    }
    if (returnValue) {
        returnValue = Blockly.JavaScript.INDENT + 'return ' + returnValue + ';\n';
    }else{
        returnValue = Blockly.JavaScript.INDENT + 'return;\n';
    }

    var code = `#VARIABLE ${returnType} ${funcName}(${argsIncType.join(', ')});#END
#FUNCTION
${returnType} ${funcName}(${argsIncType.join(', ')}){
        ${branch}
        ${returnValue}
}
#END`;
    //var code = returnType + ' function ' + funcName + '(' + args.join(', ') + ') {\n' + branch + returnValue + '}';
    code = Blockly.JavaScript.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    if(!Blockly.JavaScript.definitions_){
        Blockly.JavaScript.definitions_ = {};
    }
    Blockly.JavaScript.definitions_['%' + funcName] = code;
    return null;
  };
  
  // Defining a procedure without a return value uses the same generator as
  // a procedure with a return value.
  Blockly.JavaScript['procedures_defnoreturn'] =
      Blockly.JavaScript['procedures_defreturn'];
  
  Blockly.JavaScript['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
          Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['procedures_callnoreturn'] = function(block) {
    // Call a procedure with no return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
      args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
          Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ');\n';
    return code;
  };
  
  Blockly.JavaScript['procedures_ifreturn'] = function(block) {
    // Conditionally return value from a procedure.
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION',
        Blockly.JavaScript.ORDER_NONE) || 'false';
    var code = 'if (' + condition + ') {\n';
    if (block.hasReturnValue_) {
      var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
          Blockly.JavaScript.ORDER_NONE) || 'null';
      code += Blockly.JavaScript.INDENT + 'return ' + value + ';\n';
    } else {
      code += Blockly.JavaScript.INDENT + 'return;\n';
    }
    code += '}\n';
    return code;
  };
  
}