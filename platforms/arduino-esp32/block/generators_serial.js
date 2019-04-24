module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['serial_usb_init'] = function(block) {
  var dropdown_baudrate = block.getFieldValue('baudrate');
  var code = `Serial.begin(${dropdown_baudrate});\n`;
  return code;
};

Blockly.JavaScript['serial_hardware_init'] = function(block) {
  var dropdown_baudrate = block.getFieldValue('baudrate');
  var number_rx = block.getFieldValue('rx');
  var number_tx = block.getFieldValue('tx');
  var dropdown_type = block.getFieldValue('type');
  var code = `${dropdown_type}.begin(${dropdown_baudrate},SERIAL_8N1,${number_rx},${number_tx});\n`;
  return code;
};

Blockly.JavaScript['serial_available'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var code = `${dropdown_type}.available()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};


Blockly.JavaScript['serial_write_newline'] = function(block) {
  var dropdown_type = block.getFieldValue('type');
  var code = `${dropdown_type}.println();\n`;
  return code;
};

Blockly.JavaScript['serial_write_data'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_type = block.getFieldValue('type');
  var checkbox_newline = (block.getFieldValue('newline') == 'TRUE')? 'ln' : '';
  var code = `${dropdown_type}.print${checkbox_newline}(${value_text});\n`;
  return code;
};

Blockly.JavaScript['serial_read_line'] = function(block) {
  var dropdown_type = block.getFieldValue('type');  
  var code = `${dropdown_type}.readStringUntil('\\n')`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['serial_read_until'] = function(block) {
  var text_endstring = block.getFieldValue('endstring');
  var dropdown_type = block.getFieldValue('type');
  var code = `${dropdown_type}.readStringUntil('${text_endstring}')`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

}