var SPS30_CLASS_NAME = 'DEV_I2C1.SPS30(0, 0x69)';

Blockly.JavaScript['sps30_is_ready'] = function(block) {
	var code = SPS30_CLASS_NAME + '.isReady()';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sps30_wait_ready'] = function(block) {
	var code = 'while(!' + SPS30_CLASS_NAME + '.isReady()) vTaskDelay(100 / portTICK_RATE_MS);\n';
	return code;
};

Blockly.JavaScript['sps30_read_mass_concentration'] = function(block) {
	var dropdown_size = block.getFieldValue('size');
	var code = SPS30_CLASS_NAME + '.read(SPS30_MASS, ' + dropdown_size + ')';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sps30_read_number_concentration'] = function(block) {
	var dropdown_size = block.getFieldValue('size');
	var code = SPS30_CLASS_NAME + '.read(SPS30_NUMBER, ' + dropdown_size + ')';
	return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sps30_read_typical_particle_sizes'] = function(block) {
  var code = SPS30_CLASS_NAME + '.read(SPS30_TYPICAL)';
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/*
Blockly.JavaScript['sps30_control_fan'] = function(block) {
	var dropdown_control = block.getFieldValue('control');
	var code = SPS30_CLASS_NAME + '.fan(' + dropdown_control + ');\n';
	return code;
};
*/
