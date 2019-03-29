Blockly.Blocks['arduino_structure'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Arduino");
      this.appendStatementInput("setup")
          .setCheck(null)
          .appendField("setup");
      this.appendStatementInput("loop")
          .setCheck(null)
          .appendField("loop");
      this.setPreviousStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
};