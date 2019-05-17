module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['speaker_play_note'] = function(block) {
  var number_tempo = block.getFieldValue('tempo');
  var dropdown_instrument = block.getFieldValue('instrument');
  var value_note = Blockly.JavaScript.valueToCode(block, 'note', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `
#FUNCTIONvoid dac_music_task(void *p){ 
   while(1) { DacAudio.FillBuffer(); } }
#END
#SETUP  xTaskCreate(dac_music_task, "dac_music_task", 2048, NULL, 10, NULL);#END
DacAudio.PlayAndWait(${value_note},${number_tempo},${dropdown_instrument});\n`;
  return code;
};

Blockly.JavaScript['speaker_music_note'] = function(block) {
  var text_notes = block.getFieldValue('notes').split(",");
  text_notes = text_notes.map(note => "NOTE_"+note.trim().replace("#","S"));  
  var code = `(vector<int8_t>{${text_notes.join(",")}})`;  
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['speaker_set_volume'] = function(block) {
  var number_volume = block.getFieldValue('volume');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.JavaScript['speaker_get_volume'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

}