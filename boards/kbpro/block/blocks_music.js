module.exports = function(Blockly){
  'use strict';

Blockly.Blocks['speaker_play_note'] = {
  init: function() {
    this.appendValueInput("note")
        .setCheck("XT_MusicScore_Class *")
        .appendField("play music note");    
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("play music");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['speaker_music_note'] = {  
  init: function() {
    let f = new Blockly.FieldTextInput("C4,D4,E4");
    f.onMouseDown_ = (e)=>{
      Blockly.music(f.getValue(),function(newNote){
        f.setValue(newNote);
        f.init();
      });
      return e;
    };
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("/static/icons/icons8_move_24px.png", 15, 15, "move"))
        .appendField(f, "notes");
    this.appendDummyInput()
        .appendField("tempo (bpm)")
        .appendField(new Blockly.FieldNumber(70, 30, 300), "tempo")
        .appendField("instrument")
        .appendField(new Blockly.FieldDropdown([["Piano","1"], ["Harpsichord","2"], ["Organ","3"], ["Saxophone","4"], ["None","0"]]), "instrument");
    this.setInputsInline(true);
    this.setOutput(true, "XT_MusicScore_Class *");
    this.setColour(315);
    this.setTooltip("create music notes from B0-DS8");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['speaker_set_volume'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set volume (0-10)")
        .appendField(new Blockly.FieldNumber(0, 0, 10), "volume");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("set speaker volume 0 = silence 10=max");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['speaker_get_volume'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("get volume");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(315);
 this.setTooltip("get speaker volume");
 this.setHelpUrl("");
  }
};

}