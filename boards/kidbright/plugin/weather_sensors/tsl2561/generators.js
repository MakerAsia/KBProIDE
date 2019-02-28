Blockly.JavaScript['tsl2561.get_illuminance'] = function(block) {
	return [
		'DEV_I2C1.TSL2561(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ').get_illuminance()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
