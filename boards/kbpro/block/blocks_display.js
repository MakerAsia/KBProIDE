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

Blockly.Blocks['i2c128x64_display_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("clear display");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("clear display");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_display'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("display");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("display everything to screen");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_print'] = {
  init: function() {
    this.appendValueInput("text")
        .setCheck("String")
        .appendField("display text");
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("at (X");
    this.appendValueInput("y")
        .setCheck("Number")
        .appendField(", Y");
    this.appendDummyInput()
        .appendField(")  font")
        .appendField(new Blockly.FieldDropdown([["Arial_MT_10pt","ArialMT_Plain_10"], ["Arial_MT_16pt","ArialMT_Plain_16"], ["Arial_MT_24pt","ArialMT_Plain_24"]]), "font");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("display string at x,y");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_draw_line'] = {
  init: function() {
    this.appendValueInput("x0")
        .setCheck("Number")
        .appendField("draw line from (X");
    this.appendValueInput("y0")
        .setCheck("Number")
        .appendField(",Y");
    this.appendValueInput("x1")
        .setCheck("Number")
        .appendField(")  to  (X");
    this.appendValueInput("y1")
        .setCheck("Number")
        .appendField(",Y");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("draw line from (x0,y0) to (x1,y1)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_draw_rect'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("draw rectangle at (X");
    this.appendValueInput("y")
        .setCheck("Number")
        .appendField(", Y");
    this.appendValueInput("width")
        .setCheck("Number")
        .appendField(")  width");
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField(" height");
    this.appendDummyInput()
        .appendField(" fill ")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "fill");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("draw rectangle to display");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_draw_circle'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("draw circle at (X");
    this.appendValueInput("y")
        .setCheck("Number")
        .appendField(",Y");
    this.appendValueInput("r")
        .setCheck("Number")
        .appendField(")  radius");
    this.appendDummyInput()
        .appendField(" fill")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "fill");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("draw circle on screen");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_draw_progress_bar'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("draw progress bar at (X");
    this.appendValueInput("y")
        .setCheck("Number")
        .appendField(",Y");
    this.appendValueInput("width")
        .setCheck("Number")
        .appendField(")  width");
    this.appendValueInput("height")
        .setCheck("Number")
        .appendField("  height");
    this.appendValueInput("progress")
        .setCheck("Number")
        .appendField("  progress");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("draw progress bar on the screen");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_draw_pixel'] = {
  init: function() {
    this.appendValueInput("x")
        .setCheck("Number")
        .appendField("set pixel (X");
    this.appendValueInput("y")
        .setCheck("Number")
        .appendField(",Y");
    this.appendDummyInput()
        .appendField(")  white color")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "color");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("set pixel color");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_string_width'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck("String")
        .appendField("get pixel width of string");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("get pixel width from given string");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_width'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get screen width");
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("get screen size width in pixel");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['i2c128x64_display_height'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get screen height");
    this.setOutput(true, "Number");
    this.setColour(230);
 this.setTooltip("get display screen height in pixel");
 this.setHelpUrl("");
  }
};