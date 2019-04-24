module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['io_board_read'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var code = `digitalRead(${dropdown_pin})\n`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['io_board_write'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var dropdown_value = block.getFieldValue('value');
  var code = `digitalWrite(${dropdown_pin},${dropdown_value});\n`;
  return code;
};

Blockly.JavaScript['io_board_write_value'] = function(block) {
  var dropdown_pin = block.getFieldValue('pin');
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `digitalWrite(${dropdown_pin},${value_value});\n`;
  return code;
};

}