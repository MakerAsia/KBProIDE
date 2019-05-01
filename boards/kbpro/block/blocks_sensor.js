module.exports = function(Blockly){
  'use strict';

Blockly.Blocks['button_1_status'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/sw12x12.png", 20, 20, "*"))
        .appendField("button A is pressed");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(90);
 this.setTooltip("get button A pressed or not");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['button_2_status'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/sw12x12.png", 20, 20, "*"))
        .appendField("button B is pressed");
    this.setOutput(true, "Boolean");
    this.setColour(90);
 this.setTooltip("get button B state");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bme280_read_temp'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/MFG_BME280.png", 20, 20, "*"))
        .appendField("read temperature");
    this.setInputsInline(true);
    this.setOutput(true, "double");
    this.setColour(90);
 this.setTooltip("read temperature");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bme280_read_humid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/MFG_BME280.png", 20, 20, "*"))
        .appendField("read humidity");
    this.setInputsInline(true);
    this.setOutput(true, "double");
    this.setColour(90);
 this.setTooltip("read humidity");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bme280_read_pressure'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/MFG_BME280.png", 20, 20, "*"))
        .appendField("read air pressure");
    this.setInputsInline(true);
    this.setOutput(true, "double");
    this.setColour(90);
 this.setTooltip("read air pressure");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bme280_read_altitude'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/MFG_BME280.png", 20, 20, "*"))
        .appendField("read altitude");
    this.setInputsInline(true);
    this.setOutput(true, "double");
    this.setColour(90);
 this.setTooltip("read altitude");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bh1680_read_light_1'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bh1680.png", 20, 20, "*"))
        .appendField("read light sensor 1");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read light intensity from sensor 1");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bh1680_read_light_2'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bh1680.png", 20, 20, "*"))
        .appendField("read light sensor 2");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read light intensity from sensor 2");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bh1745_read_red'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bh1745.png", 20, 20, "*"))
        .appendField("read \"red\" light color");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("read red light intensity from sensor");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bh1745_read_green'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bh1745.png", 20, 20, "*"))
        .appendField("read \"green\" light color");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(120);
 this.setTooltip("read green light color illuminance from RGB sensor");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bh1745_read_blue'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bh1745.png", 20, 20, "*"))
        .appendField("read \"blue\" light color");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("read blue light color illuminance from RGB sensor");
 this.setHelpUrl("");
  }
};

/*Blockly.Blocks['bh1745_read_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bh1745.png", 20, 20, "*"))
        .appendField("read \"clear\" light color");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("read blue light color illuminance from RGB sensor");
 this.setHelpUrl("");
  }
};*/

Blockly.Blocks['bmx055_read_acc_x'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
        .appendField("read \"x\" axis from accelerometer");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read \"x\" axis from accelerometer");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bmx055_read_acc_y'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
        .appendField("read \"y\" axis from accelerometer");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read \"y\" axis from accelerometer");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bmx055_read_acc_z'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
        .appendField("read \"z\" axis from accelerometer");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read \"z\" axis from accelerometer");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bmx055_read_gyro_x'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
        .appendField("read \"x\" axis from gyroscope");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read \"x\" axis from gyroscope");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bmx055_read_gyro_y'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
        .appendField("read \"y\" axis from gyroscope");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read \"y\" axis from gyroscope");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bmx055_read_gyro_z'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
        .appendField("read \"z\" axis from gyroscope");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read \"z\" axis from gyroscope");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bmx055_read_mag_x'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
        .appendField("read \"x\" axis from magnetometer");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read \"x\" axis from magnetometer");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bmx055_read_mag_y'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
        .appendField("read \"y\" axis from magnetometer");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read \"y\" axis from magnetometer");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bmx055_read_mag_z'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/bmx055.png", 20, 20, "*"))
        .appendField("read \"z\" axis from magnetometer");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(90);
 this.setTooltip("read \"z\" axis from magnetometer");
 this.setHelpUrl("");
  }
};

}