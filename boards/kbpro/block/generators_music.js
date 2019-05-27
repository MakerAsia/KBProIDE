module.exports = function(Blockly) {
  "use strict";

  Blockly.JavaScript["speaker_play_note"] = function(block) {
    var number_tempo = block.getFieldValue("tempo");
    var dropdown_instrument = block.getFieldValue("instrument");
    var value_note = Blockly.JavaScript.valueToCode(block, "note",
                                                    Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
#FUNCTIONvoid dac_music_task(void *p){ 
   while(1) { DacAudio.FillBuffer(); } }
#END
#SETUP  xTaskCreate(dac_music_task, "dac_music_task", 2048, NULL, 10, NULL);#END
DacAudio.PlayAndWait(${value_note},${number_tempo},${dropdown_instrument});\n`;
    return code;
  };

  Blockly.JavaScript["speaker_music_note"] = function(block) {
    var text_notes = block.getFieldValue("notes").split(",");
    text_notes = text_notes.map(
        note => "NOTE_" + note.trim().replace("#", "S"));
    var code = `(vector<int8_t>{${text_notes.join(",")}})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript["speaker_tts_word"] = function(block) {
    let text_words = block.getFieldValue("words").split(" ");
    text_words = text_words.map(w => "sp" + w.toUpperCase().trim());
    let code = `(std::vector<const uint8_t *>{${text_words.join(",")}})`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

  Blockly.JavaScript["speaker_tts_speak"] = function(block) {
    let value_words = Blockly.JavaScript.valueToCode(block, "words", Blockly.JavaScript.ORDER_NONE);
    //language=CPP
    var code = `
#EXTINC#include <tts.h>#END
#EXTINC#include <KBSound.h>#END
#VARIABLEKBSound kbsound;#END
kbsound.speak(${value_words});
`;
    return code;
  };
  Blockly.JavaScript["speaker_tts_speak_number"] = function(block) {
    let value_words = Blockly.JavaScript.valueToCode(block, "number", Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
#EXTINC#include <tts.h>#END
#EXTINC#include <KBSound.h>#END
#VARIABLEKBSound kbsound;#END
kbsound.speak(${value_words});
`;
    return code;
  };
  Blockly.JavaScript["speaker_set_volume"] = function(block) {
    var number_volume = block.getFieldValue("volume");
    // TODO: Assemble JavaScript into code variable.
    var code = "...;\n";
    return code;
  };

  Blockly.JavaScript["speaker_get_volume"] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "...";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  };

};