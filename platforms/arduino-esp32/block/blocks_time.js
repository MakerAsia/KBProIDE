module.exports = function(Blockly){
    'use strict';

Blockly.Blocks['time_delay'] = {
  init: function() {
    this.appendValueInput("delay")
        .setCheck("Number")
        .appendField("delay");
    this.appendDummyInput()
        .appendField("millisecond");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("pause running program for awhile");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_wait_btn_press'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("wait button")
        .appendField(new Blockly.FieldDropdown([["button_A","14"], ["button_B","27"]]), "NAME")
        .appendField("press");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("waiting for button pressed");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_sync'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/icons8_wifi_26px.png", 20, 20, "*"))
        .appendField("sync internet time");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
 this.setTooltip("sync time from internet (wifi & internet needed)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_get_year'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get year");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("get now year (use sync time block first)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_get_month'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get month");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("get now month (1-12) (use sync time block first)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_get_day'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get day of month");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("get day of month (1-31) (use sync time block first)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_get_day_of_week'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get day of week");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("get day of week (Sunday = 0 , Monday = 1 , ... , Saturday = 6) (use sync time block first)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_get_hour'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get hour");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("get hour of day (0-23) (use sync time block first)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_get_minute'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get minute");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("get minute of now hour 0-59 (use sync time block first)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_get_second'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get second");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(0);
 this.setTooltip("get now second 0-59 (use sync time block first)");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_millis'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("timestamp millisecond");
    this.setInputsInline(true);
    this.setOutput(true, ["Number","uint32_t"]);
    this.setColour(0);
 this.setTooltip("get time since program start in millisecond");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['time_micros'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("timestamp microsecond");
    this.setInputsInline(true);
    this.setOutput(true,["Number","uint32_t"]);
    this.setColour(0);
 this.setTooltip("get time since program start in microsecond");
 this.setHelpUrl("");
  }
};

}