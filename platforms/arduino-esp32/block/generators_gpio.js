module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['io_setpin'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_mode = block.getFieldValue('mode');  
  var code = `pinMode(${value_pin},${dropdown_mode});\n`;
  return code;
};

Blockly.JavaScript['io_digital_read'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `digitalRead(${value_pin})`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['io_digital_write'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `digitalWrite(${value_pin},${value_value});\n`;
  return code;
};

Blockly.JavaScript['io_analog_read'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `analogRead(${value_pin})`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['io_analog_write'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['io_pwm_write'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `
    #SETUP  ledcSetup(0, 5000, 8);#END
    #SETUP  ledcAttachPin(${value_pin}, 0);#END
    ledcWrite(0, ${value_value});
  `;
  return code;
};

Blockly.JavaScript['io_pulse_in'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_state = block.getFieldValue('state');
  var number_timeout = block.getFieldValue('timeout');  
  var code = `pulseIn(${value_pin},${dropdown_state},${number_timeout})`;  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['io_shift_in'] = function(block) {
  var number_data_pin = block.getFieldValue('data_pin');
  var number_clock_pin = block.getFieldValue('clock_pin');
  var dropdown_bit_order = block.getFieldValue('bit_order');  
  var code = `shiftIn(${number_data_pin},${number_clock_pin},${dropdown_bit_order})`;  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['io_shift_out'] = function(block) {
  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  var number_data_pin = block.getFieldValue('data_pin');
  var number_clock_pin = block.getFieldValue('clock_pin');
  var dropdown_bit_order = block.getFieldValue('bit_order');  
  var code = `shiftOut(${number_data_pin},${number_clock_pin},${dropdown_bit_order},${value_data});\n`;
  return code;
};

}