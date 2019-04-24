module.exports = function(Blockly){
  'use strict';
Blockly.Blocks['bt_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("start bluetooth name")
        .appendField(new Blockly.FieldTextInput("KB-Pro"), "name");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
    this.setTooltip("start Bluetooth");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['bt_send_string'] = {
  init: function() {
    this.appendValueInput("text")
        .setCheck("String")
        .appendField("Bluetooth send text");
    this.appendDummyInput()
        .appendField("with new line")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "newline");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
 this.setTooltip("send string to client");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bt_on_receive'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("on Bluetooth received data");
    this.appendStatementInput("receiver_code")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bt_read_data'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("read Bluetooth received data");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(225);
 this.setTooltip("read Bluetooth received data");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['bt_read_line'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("read line from Bluetooth data");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(225);
 this.setTooltip("read string line from Bluetooth received data");
 this.setHelpUrl("");
  }
};

}