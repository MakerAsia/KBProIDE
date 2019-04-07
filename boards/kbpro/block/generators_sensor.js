module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['button_1_status'] = function(block) {  
  var code = 'digitalRead(14)';  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['button_2_status'] = function(block) {  
  var code = 'digitalRead(15)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bme280_read_temp'] = function(block) {
  var code = 'bme280.readTempC()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bme280_read_humid'] = function(block) {  
  var code = 'bme280.readFloatHumidity()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bme280_read_pressure'] = function(block) {
  var code = 'bme280.readFloatPressure()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bme280_read_altitude'] = function(block) {
  var code = 'bme280.readFloatAltitudeMeters()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bh1680_read_light_1'] = function(block) {  
  var code = 'analogRead(36)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bh1680_read_light_2'] = function(block) {  
  var code = 'analogRead(39)';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bh1745_read_red'] = function(block) {
  var code = 'bh1745.getRedColor()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bh1745_read_green'] = function(block) {
  var code = 'bh1745.getGreenColor()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bh1745_read_blue'] = function(block) {
  var code = 'bh1745.getBlueColor()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bmx055_read_acc_x'] = function(block) {  
  var code = 'bmx055.getAccX()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bmx055_read_acc_y'] = function(block) {
  var code = 'bmx055.getAccY()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bmx055_read_acc_z'] = function(block) {
  var code = 'bmx055.getAccZ()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bmx055_read_gyro_x'] = function(block) {
  var code = 'bmx055.getGyroX()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bmx055_read_gyro_y'] = function(block) {
  var code = 'bmx055.getGyroY()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bmx055_read_gyro_z'] = function(block) {
  var code = 'bmx055.getGyroZ()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bmx055_read_mag_x'] = function(block) {
  var code = 'bmx055.getMagneticX()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bmx055_read_mag_y'] = function(block) {
  var code = 'bmx055.getMagneticY()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['bmx055_read_mag_z'] = function(block) {
  var code = 'bmx055.getMagneticZ()';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

}