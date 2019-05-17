Blockly.JavaScript['lcd_i2c_20x4.clear'] = function(block) {
	return 'DEV_I2C1.LCD_I2C(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).clear();\n';
};

Blockly.JavaScript['lcd_i2c_20x4.backlight'] = function(block) {
	return 'DEV_I2C1.LCD_I2C(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).backlight(' + block.getFieldValue('STATUS') + ');\n';
}

Blockly.JavaScript['lcd_i2c_20x4.print'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

	var column = parseInt(block.getFieldValue('COLUMN')) - 1;
	var row = parseInt(block.getFieldValue('ROW')) - 1;

	return 'DEV_I2C1.LCD_I2C(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).print(' + column + ', ' + row + ', ' + argument0 + ');\n';
};

Blockly.JavaScript['lcd_i2c_20x4.print_prec'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

	var column = parseInt(block.getFieldValue('COLUMN')) - 1;
	var row = parseInt(block.getFieldValue('ROW')) - 1;
	var prec = parseInt(block.getFieldValue('PREC'));
	if (prec < 0) {
		prec = 0;
	}
	if (prec > 4) {
		prec = 4;
	}

	return 'DEV_I2C1.LCD_I2C(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ', 20, 4).print(' + column + ', ' + row + ', ' + argument0 + ', ' + prec + ');\n';
};
