Blockly.Blocks['i2c128x64_display_image'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("display image")
          .appendField(new Blockly.FieldImage("https://www.gstatic.com/codesite/ph/images/star_on.gif", 128, 64, "click to upload"));
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("display image to display");
   this.setHelpUrl("");
    }
  };
