/*Blockly.JavaScript['esp32_servo_attach'] = function(block) {
  var text_pin = block.getFieldValue('pin');
  var code = `Plugin.Servo(${text_pin}).attach(${text_pin});\n`;
  return code;
};

Blockly.JavaScript['esp32_servo_detach'] = function(block) {
  var text_pin = block.getFieldValue('pin');
  var code = `Plugin.Servo(${text_pin}).detach();\n`;
  return code;
};

Blockly.JavaScript['esp32_servo_write'] = function(block) {
  var text_pin = block.getFieldValue('pin');
  var value_degree = Blockly.JavaScript.valueToCode(block, 'degree', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `Plugin.Servo(${text_pin}).write(${value_degree});\n`;
  return code;
};

Blockly.JavaScript['esp32_servo_write_micros'] = function(block) {
  var text_pin = block.getFieldValue('pin');
  var value_degree = Blockly.JavaScript.valueToCode(block, 'degree', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `Plugin.Servo(${text_pin}).writeMicroseconds(${value_degree});\n`;
  return code;
};

Blockly.JavaScript['esp32_servo_read'] = function(block) {
  var text_pin = block.getFieldValue('pin');
  var code = `Plugin.Servo(${text_pin}).read()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['esp32_servo_read_micros'] = function(block) {
  var text_pin = block.getFieldValue('pin');
  var code = `Plugin.Servo(${text_pin}).readMicroseconds()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
*/

Blockly.JavaScript['esp32_servo_attach'] = function(block) {
  var text_pin = block.getFieldValue('pin');
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var code = `#EXTINC#include "Servo.h"#END
#VARIABLE Servo ${variable_instance};#END
${variable_instance}.attach(${text_pin});
`;
  return code;
};

Blockly.JavaScript['esp32_servo_detach'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_instance}.detach;\n`;
  return code;
};

Blockly.JavaScript['esp32_servo_write'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var value_degree = Blockly.JavaScript.valueToCode(block, 'degree', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${variable_instance}.write(${value_degree});\n`;
  return code;
};

Blockly.JavaScript['esp32_servo_write_micros'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var value_degree = Blockly.JavaScript.valueToCode(block, 'degree', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `${variable_instance}.writeMicroseconds(${value_degree});\n`;
  return code;
};

Blockly.JavaScript['esp32_servo_read'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_instance}.read()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['esp32_servo_read_micros'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_instance}.readMicroseconds()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};