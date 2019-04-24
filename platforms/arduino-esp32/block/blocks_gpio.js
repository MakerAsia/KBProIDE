module.exports = function(Blockly){
  'use strict';

Blockly.Blocks['io_setpin'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("set pin");
    this.appendDummyInput()
        .appendField("as")
        .appendField(new Blockly.FieldDropdown([["OUTPUT","OUTPUT"], ["INPUT","INPUT"], ["INPUT_PULLUP","INPUT_PULLUP"]]), "mode");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("set pin mode");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['io_digital_read'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("digital read pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("digital read in");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['io_digital_write'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("digital write pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("digital write pin");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['io_analog_read'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("read analog input pin ");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("read analog value from pin");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['io_analog_write'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("analog write pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("analog write to pin , value from 0-1023");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['io_pwm_write'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("PWM write pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField("value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("write PWM to pin (value 0-255) at 5KHz");
 this.setHelpUrl("https://en.wikipedia.org/wiki/Pulse-width_modulation");
  }
};

Blockly.Blocks['io_pulse_in'] = {
  init: function() {
    this.appendValueInput("pin")
        .setCheck("Number")
        .appendField("read pulse in from pin");
    this.appendDummyInput()
        .appendField("state")
        .appendField(new Blockly.FieldDropdown([["HIGH","1"], ["LOW","0"]]), "state")
        .appendField("timeout (ms)")
        .appendField(new Blockly.FieldNumber(1000, 1), "timeout");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("read pulse in from pin");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['io_shift_in'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("read shift in data from pin (data")
        .appendField(new Blockly.FieldNumber(0, 0, 50), "data_pin")
        .appendField("clock pin")
        .appendField(new Blockly.FieldNumber(0, 0, 50), "clock_pin")
        .appendField(") bit order")
        .appendField(new Blockly.FieldDropdown([["MSB_first","MSBFIRST"], ["LSB_first","LSBFIRST"]]), "bit_order");
    this.setOutput(true, null);
    this.setColour(45);
 this.setTooltip("read shift in");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['io_shift_out'] = {
  init: function() {
    this.appendValueInput("data")
        .setCheck("Number")
        .appendField("shift out data");
    this.appendDummyInput()
        .appendField("  from pin (data")
        .appendField(new Blockly.FieldNumber(0, 0, 50), "data_pin")
        .appendField("clock pin")
        .appendField(new Blockly.FieldNumber(0, 0, 50), "clock_pin")
        .appendField(") bit order")
        .appendField(new Blockly.FieldDropdown([["MSB_first","MSBFIRST"], ["LSB_first","LSBFIRST"]]), "bit_order");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("shift out data");
 this.setHelpUrl("");
  }
};

}