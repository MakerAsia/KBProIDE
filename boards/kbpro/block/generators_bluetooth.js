module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['bt_start'] = function(block) {
  var text_name = block.getFieldValue('name');
  var code = `SerialBT.begin("${text_name}");\n`;
  return code;
};

Blockly.JavaScript['bt_send_string'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_newline = (block.getFieldValue('newline') == 'TRUE')? 'ln' : '';
  var code = `SerialBT.print${checkbox_newline}(${value_text});\n`;
  return code;
};

Blockly.JavaScript['bt_on_receive'] = function(block) {
  var statements_receiver_code = Blockly.JavaScript.statementToCode(block, 'receiver_code');
  var code = `while(SerialBT.available()){
    ${statements_receiver_code}
  }\n`;
  return code;
};

Blockly.JavaScript['bt_read_data'] = function(block) {
  var code = `SerialBT.read()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['bt_read_line'] = function(block) {
  var code = `SerialBT.readStringUntil('\\n')`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

}