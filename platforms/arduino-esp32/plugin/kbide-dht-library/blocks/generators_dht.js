Blockly.JavaScript['dhtesp_setup'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var dropdown_dht_type = block.getFieldValue('dht_type');
  var number_pin = block.getFieldValue('pin');
  var code = `
#EXTINC#include "DHTesp.h"#END
#VARIABLE DHTesp ${variable_instance};#END
${variable_instance}.setup(${number_pin},${dropdown_dht_type});
`;
  return code;
};

Blockly.JavaScript['dhtesp_read_temp'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_instance}.getTemperature()`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['dhtesp_read_humid'] = function(block) {
  var variable_instance = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('instance'), Blockly.Variables.NAME_TYPE);
  var code = `${variable_instance}.getHumidity()`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};