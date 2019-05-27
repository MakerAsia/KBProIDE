Blockly.Blocks['arduino_init'] = {
  init: function() {
    this.appendStatementInput("code")
        .setCheck(null)
        .appendField("Setup");
    this.setColour(230);
 this.setTooltip("doing once when program started");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['arduino_loop'] = {
  init: function() {
    this.appendStatementInput("code")
        .setCheck(null)
        .appendField("Loop");
    this.setColour(230);
 this.setTooltip("loop forever");
 this.setHelpUrl("");
  }
};