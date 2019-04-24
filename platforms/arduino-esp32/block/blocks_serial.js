module.exports = function(Blockly){
  'use strict';

Blockly.Blocks['serial_usb_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initial USB Serial baud rate")
        .appendField(new Blockly.FieldDropdown([["115200","115200"], ["300","300"], ["600","600"], ["1200","1200"], ["2400","2400"], ["4800","4800"], ["9600","9600"], ["14400","14400"], ["19200","19200"], ["28800","28800"], ["38400","38400"], ["57600","57600"]]), "baudrate");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("use USB serial port");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['serial_hardware_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initial Serial baud rate")
        .appendField(new Blockly.FieldDropdown([["115200","115200"], ["300","300"], ["600","600"], ["1200","1200"], ["2400","2400"], ["4800","4800"], ["9600","9600"], ["14400","14400"], ["19200","19200"], ["28800","28800"], ["38400","38400"], ["57600","57600"]]), "baudrate")
        .appendField("RX pin")
        .appendField(new Blockly.FieldNumber(9, 0, 50), "rx")
        .appendField("TX pin")
        .appendField(new Blockly.FieldNumber(10, 0, 50), "tx")
        .appendField(new Blockly.FieldDropdown([["Serial1","Serial1"], ["Serial2","Serial2"]]), "type");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("begin using Hardware Serial1 or Serial2");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['serial_available'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Serial available  type")
        .appendField(new Blockly.FieldDropdown([["UsbSerial","Serial"], ["Serial1","Serial1"], ["Serial2","Serial2"]]), "type");
    this.setInputsInline(true);
    this.setOutput(true, "Boolean");
    this.setColour(180);
 this.setTooltip("check if Serial data available");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['serial_write_data'] = {
  init: function() {
    this.appendValueInput("text")
        .setCheck(["String", "Boolean", "Number"])
        .appendField("Serial write");
    this.appendDummyInput()
        .appendField("port")
        .appendField(new Blockly.FieldDropdown([["UsbSerial","Serial"], ["Serial1","Serial1"], ["Serial2","Serial2"]]), "type")
        .appendField("with new line")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "newline");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("write data to Serial");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['serial_write_newline'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Serial write new line,")
        .appendField("port")
        .appendField(new Blockly.FieldDropdown([["UsbSerial","Serial"], ["Serial1","Serial1"], ["Serial2","Serial2"]]), "type");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(180);
 this.setTooltip("write newline (\\n) to serial");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['serial_read_line'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Serial read line, port")
        .appendField(new Blockly.FieldDropdown([["UsbSerial","Serial"], ["Serial1","Serial1"], ["Serial2","Serial2"]]), "type");
    this.setOutput(true, "String");
    this.setColour(180);
 this.setTooltip("serial wait until got new line");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['serial_read_until'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Serial read until get")
        .appendField(new Blockly.FieldTextInput("\\n"), "endstring")
        .appendField(", port")
        .appendField(new Blockly.FieldDropdown([["UsbSerial","Serial"], ["Serial1","Serial1"], ["Serial2","Serial2"]]), "type");
    this.setOutput(true, "String");
    this.setColour(180);
 this.setTooltip("read string from serial until get terminator char");
 this.setHelpUrl("");
  }
};

}