/*Blockly.Blocks['esp32_servo_attach'] = {
  init: function() {
    this.appendDummyInput()
                                              //varname, opt_validator, opt_variableTypes,opt_defaultType,custom_Workspace
        //.appendField(new Blockly.PluginFieldVariable("Servo1",null,["Servo"],["Servo"],document.BlocklyPlugin[this.type]))
        //.appendField(new Blockly.FieldVariable("Servo1",null,["Servo"],["Servo"]))
        .appendField("attach servo pin")
        .appendField(new Blockly.FieldTextInput("1"), "pin");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
    this.setTooltip("Associate this instance with a servomotor whose input is connected to pin.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_detach'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("detach servo pin")
        .appendField(new Blockly.FieldTextInput("1"), "pin");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
 this.setTooltip("Stop driving the servo pulse train.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("write servo pin")
        .appendField(new Blockly.FieldTextInput("1"), "pin")
        .appendField(" to angle");
    this.appendValueInput("degree")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(" degree");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
 this.setTooltip("Set the servomotor target angle.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_write_micros'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("write servo pin")
        .appendField(new Blockly.FieldTextInput("1"), "pin")
        .appendField("with pulse");
    this.appendValueInput("degree")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("microseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
 this.setTooltip("Set the pulse width, in microseconds.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("read angle servo pin")
        .appendField(new Blockly.FieldTextInput("1"), "pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(75);
 this.setTooltip("Get the servomotor's target angle, in degrees.  This will lie inside the range specified at attach() time.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_read_micros'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("read pulse microsec servo pin")
        .appendField(new Blockly.FieldTextInput("1"), "pin");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(75);
 this.setTooltip("Get the current pulse width, in microseconds.  This will lie within the range specified at attach() time.");
 this.setHelpUrl("");
  }
};
*/

Blockly.Blocks['esp32_servo_attach'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("Servo1",null,["Plugin.Servo"],["Plugin.Servo"]),"instance")
        .appendField("attach pin")
        .appendField(new Blockly.FieldTextInput("1"), "pin");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
    this.setTooltip("Associate this instance with a servomotor whose input is connected to pin.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_detach'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("Servo1",null,["Plugin.Servo"],["Plugin.Servo"]),"instance")
        .appendField("detach");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
 this.setTooltip("Stop driving the servo pulse train.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_write'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("Servo1",null,["Plugin.Servo"],["Plugin.Servo"]),"instance")   
        .appendField("write angle");
    this.appendValueInput("degree")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(" degree");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
 this.setTooltip("Set the servomotor target angle.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_write_micros'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("Servo1",null,["Plugin.Servo"],["Plugin.Servo"]),"instance")
        .appendField("write pulse");
    this.appendValueInput("degree")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("microseconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
 this.setTooltip("Set the pulse width, in microseconds.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("Servo1",null,["Plugin.Servo"],["Plugin.Servo"]),"instance")
        .appendField("read angle");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(75);
 this.setTooltip("Get the servomotor's target angle, in degrees.  This will lie inside the range specified at attach() time.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['esp32_servo_read_micros'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("Servo1",null,["Plugin.Servo"],["Plugin.Servo"]),"instance")
        .appendField("read pulse microsec");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(75);
 this.setTooltip("Get the current pulse width, in microseconds.  This will lie within the range specified at attach() time.");
 this.setHelpUrl("");
  }
};
