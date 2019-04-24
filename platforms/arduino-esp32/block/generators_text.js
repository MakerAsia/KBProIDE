module.exports = function(Blockly){
    'use strict';

Blockly.JavaScript['text'] = function(block) {
    // Text value.
    var code = Blockly.JavaScript.quote_(block.getFieldValue('TEXT'));
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['basic_string'] = function(block) {
	return [
		'String("' + block.getFieldValue('VALUE') + '")',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
  
  Blockly.JavaScript['text_join'] = function(block) {
    // Create a string made up of any number of elements of any type.
    if(block.itemCount_ == 0){
      return ['String("")', Blockly.JavaScript.ORDER_ATOMIC];
    }else{
      var elements = new Array(block.itemCount_);
        for (var i = 0; i < block.itemCount_; i++) {
          let converted = Blockly.JavaScript.valueToCode(block, 'ADD' + i,Blockly.JavaScript.ORDER_COMMA);
          if(converted){
            if(converted.startsWith("String(")){
              elements[i] = converted;    
            }else{
              elements[i] = 'String('+converted+')';
            }
          }else{
            elements[i] = 'String("")';
          }          
        }
        var code = '(' + elements.join('+') + ')';
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
  };
  
  Blockly.JavaScript['text_append'] = function(block) {
    // Append to a variable in place.
    var varName = Blockly.JavaScript.variableDB_.getName(block.getField('VAR').getText(), Blockly.Variables.NAME_TYPE);
    Blockly.dbNameType[varName] = {
      name : varName, type : 'String'
    };
    var value = Blockly.JavaScript.valueToCode(block, 'TEXT',Blockly.JavaScript.ORDER_NONE) || '""';
    return varName + ' += String(' + value + ');\n';
  };
  
  Blockly.JavaScript['text_length'] = function(block) {
    // String or array length.
    var text = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_FUNCTION_CALL) || 'String("")';
    return [text + '.length', Blockly.JavaScript.ORDER_MEMBER];
  };
  
  Blockly.JavaScript['text_isEmpty'] = function(block) {
    // Is the string null or array empty?
    var text = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER) || 'String("")';
    return ['(' + text + '.length == 0)', Blockly.JavaScript.ORDER_LOGICAL_NOT];
  };
  
  Blockly.JavaScript['text_indexOf'] = function(block) {
    // Search the text for a substring.
    var operator = block.getFieldValue('END') == 'FIRST' ? 'indexOf' : 'lastIndexOf';
    var substring = Blockly.JavaScript.valueToCode(block, 'FIND',Blockly.JavaScript.ORDER_NONE) ||  'String("")';
    var text = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_MEMBER) || 'String("")';
    var code = text + '.' + operator + '(' + substring + ')';
    // Adjust index if using one-based indices.
    if (block.workspace.options.oneBasedIndex) {
      return [code + ' + 1', Blockly.JavaScript.ORDER_ADDITION];
    }
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['text_charAt'] = function(block) {
    // Get letter at index.
    // Note: Until January 2013 this block did not have the WHERE input.
    var where = block.getFieldValue('WHERE') || 'FROM_START';    
    var text = Blockly.JavaScript.valueToCode(block, 'VALUE',Blockly.JavaScript.ORDER_MEMBER) || 'String("")';
    switch (where) {
      case 'FIRST':
        var code = 'String('+text + '.charAt(0))';
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
      //case 'LAST':
      //  var code = text + '.slice(-1)';
      //  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
      case 'FROM_START':
        var at = Blockly.JavaScript.getAdjusted(block, 'AT');
        // Adjust index if using one-based indices.        
        var code ='String('+text + '.charAt('+at+'))';// text + '.charAt(' + at + ')';
        return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];      
    }
    throw 'Unhandled option (text_charAt).';
  };
  
  /**
   * Returns an expression calculating the index into a string.
   * @private
   * @param {string} stringName Name of the string, used to calculate length.
   * @param {string} where The method of indexing, selected by dropdown in Blockly
   * @param {string=} opt_at The optional offset when indexing from start/end.
   * @return {string} Index expression.
   */
  Blockly.JavaScript.text.getIndex_ = function(stringName, where, opt_at) {
    if (where == 'FIRST') {
      return '0';
    } else if (where == 'FROM_END') {
      return stringName + '.length - 1 - ' + opt_at;
    } else if (where == 'LAST') {
      return stringName + '.length - 1';
    } else {
      return opt_at;
    }
  };
  
  Blockly.JavaScript['text_getSubstring'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'STRING',Blockly.JavaScript.ORDER_FUNCTION_CALL) || 'String("")';
    var where1 = block.getFieldValue('WHERE1');
    var where2 = block.getFieldValue('WHERE2');
    if (where1 == 'FIRST' && where2 == 'LAST') {
      var code = text;
    }else{
      var at1 = (where1 == 'FIRST')? 0 : Blockly.JavaScript.getAdjusted(block, 'AT1');
      var at2 = (where2 == 'LAST')? undefined : Blockly.JavaScript.getAdjusted(block, 'AT2');
      code = `${text}.substring(${at1}${(at2)?(','+at2):''})`;      
    }
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['text_changeCase'] = function(block) {
    // Change capitalization.
    var OPERATORS = {
      'UPPERCASE': '.toUpperCase()',
      'LOWERCASE': '.toLowerCase()',
    };
    var operator = OPERATORS[block.getFieldValue('CASE')];
    var textOrder = operator ? Blockly.JavaScript.ORDER_MEMBER : Blockly.JavaScript.ORDER_NONE;
    var text = Blockly.JavaScript.valueToCode(block, 'TEXT', textOrder) || 'String("")';
    var code = text + operator;    
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['text_trim'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'TEXT',Blockly.JavaScript.ORDER_MEMBER) || 'String("")';
    var operator = '.trim()';
    return [text + operator, Blockly.JavaScript.ORDER_FUNCTION_CALL];
  };
  
  Blockly.JavaScript['text_replace'] = function(block) {
    var text = Blockly.JavaScript.valueToCode(block, 'TEXT',Blockly.JavaScript.ORDER_MEMBER) || 'String("")';
    var from = Blockly.JavaScript.valueToCode(block, 'FROM',Blockly.JavaScript.ORDER_NONE) || 'String("")';
    var to = Blockly.JavaScript.valueToCode(block, 'TO',Blockly.JavaScript.ORDER_NONE) || 'String("")';
    var code =  `${text}.replace(${from},${to})`;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  };

}