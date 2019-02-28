Blockly.JavaScript['si7021.get_temperature'] = function(block) {
	return [
		'DEV_I2C1.SI7021(' + block.getFieldValue('CHANNEL') + ', 0x40).get_temperature()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['si7021.get_humidity'] = function(block) {
	return [
		'DEV_I2C1.SI7021(' + block.getFieldValue('CHANNEL') + ', 0x40).get_humidity()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
