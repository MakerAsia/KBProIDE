Blockly.Blocks["lcd_i2c_20x4.clear"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown([
				["0x20", "32"],
				["0x21", "33"],
				["0x22", "34"],
				["0x23", "35"],
				["0x24", "36"],
				["0x25", "37"],
				["0x26", "38"],
				["0x27", "39"]
			]), 'ADDRESS');

		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_CLR_TITLE);

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_I2C_20X4_CLR_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_I2C_20X4_CLR_HELPURL);
	}
};

Blockly.Blocks["lcd_i2c_20x4.backlight"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown([
				["0x20", "32"],
				["0x21", "33"],
				["0x22", "34"],
				["0x23", "35"],
				["0x24", "36"],
				["0x25", "37"],
				["0x26", "38"],
				["0x27", "39"]
			]), 'ADDRESS');

		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_BACKLIGHT_TITLE)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.STATUS_OFF, "0"],
				[Blockly.Msg.STATUS_ON, "1"]
			]), 'STATUS');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_I2C_20X4_BACKLIGHT_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_I2C_20X4_BACKLIGHT_HELPURL);
	}
};

Blockly.Blocks["lcd_i2c_20x4.print"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown([
				["0x20", "32"],
				["0x21", "33"],
				["0x22", "34"],
				["0x23", "35"],
				["0x24", "36"],
				["0x25", "37"],
				["0x26", "38"],
				["0x27", "39"]
			]), 'ADDRESS');

		this.appendValueInput('VALUE')
			.appendField(Blockly.Msg.LCD_I2C_20X4_PRINT_TITLE)
			.appendField('(')
			.appendField(new Blockly.FieldNumber(1, 1, 20, 1), 'COLUMN')
			.appendField(',')
			.appendField(new Blockly.FieldNumber(1, 1, 4, 1), 'ROW')
			.appendField(')');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_I2C_20X4_PRINT_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_I2C_20X4_PRINT_HELPURL);
	}
};

Blockly.Blocks["lcd_i2c_20x4.print_prec"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_I2C_20X4_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		// device addess
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown([
				["0x20", "32"],
				["0x21", "33"],
				["0x22", "34"],
				["0x23", "35"],
				["0x24", "36"],
				["0x25", "37"],
				["0x26", "38"],
				["0x27", "39"]
			]), 'ADDRESS');

		this.appendValueInput('VALUE')
			.setCheck('Number')
			.appendField(Blockly.Msg.LCD_I2C_20X4_PRINT_PREC_TITLE)
			.appendField('(')
			.appendField(new Blockly.FieldNumber(1, 1, 20, 1), 'COLUMN')
			.appendField(',')
			.appendField(new Blockly.FieldNumber(1, 1, 4, 1), 'ROW')
			.appendField(')')
			.appendField(Blockly.Msg.PRECISION_TITLE)
			.appendField(new Blockly.FieldNumber(2, 0, 4, 1), 'PREC');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_I2C_20X4_PRINT_PREC_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_I2C_20X4_PRINT_PREC_HELPURL);
	}
};
