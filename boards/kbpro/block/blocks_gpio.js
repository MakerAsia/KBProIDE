module.exports = function(Blockly){
  'use strict';
  
Blockly.Blocks['io_board_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("read input pin ")
        .appendField(new Blockly.FieldDropdown([["PIN_0","25"], ["PIN_1","32"], ["PIN_2","33"]]), "pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(45);
 this.setTooltip("read input pin");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['io_board_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("write output to pin ")        
        .appendField(new Blockly.FieldDropdown([["PIN_0","25"], ["PIN_1","32"], ["PIN_2","33"]]), "pin")
        .appendField(" value ")
        .appendField(new Blockly.FieldDropdown([["HIGH","1"], ["LOW","0"]]), "value");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("write output");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['io_board_write_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("write output to pin ")        
        .appendField(new Blockly.FieldDropdown([["PIN_0","25"], ["PIN_1","32"], ["PIN_2","33"]]), "pin");
    this.appendValueInput("value")
        .setCheck("Number")
        .appendField(" value ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("write output to pin");
 this.setHelpUrl("");
  }
};

}