module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['time_delay'] = function(block) {
  var value_delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `delay(${value_delay});\n`;
  return code;
};

Blockly.JavaScript['time_wait_btn_press'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');  
  var code = `while(!digitalRead(${dropdown_name}));\n`;
  return code;
};

Blockly.JavaScript['time_sync'] = function(block) {  
  var code = `kbprotime.sync();\n`;
  return code;
};

Blockly.JavaScript['time_get_year'] = function(block) {
  var code = 'kbprotime.getYear()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['time_get_month'] = function(block) {
  var code = 'kbprotime.getMonth()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['time_get_day'] = function(block) {
  var code = 'kbprotime.getDayOfMonth()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['time_get_day_of_week'] = function(block) {  
  var code = 'kbprotime.getDayOfWeek()';  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['time_get_hour'] = function(block) {
  var code = 'kbprotime.getHour()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['time_get_minute'] = function(block) {
  var code = 'kbprotime.getMinute()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['time_get_second'] = function(block) {
  var code = 'kbprotime.getSecond()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['time_millis'] = function(block) {
  var code = 'millis()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['time_micros'] = function(block) {
  var code = 'micros()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

}