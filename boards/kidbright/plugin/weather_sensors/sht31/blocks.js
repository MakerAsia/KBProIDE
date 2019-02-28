Blockly.Blocks["sht31.get_temperature"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.SHT31_GET_TEMPERATURE_TITLE);

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
				["0x44", "68"],
				["0x45", "69"]
			]), 'ADDRESS');

		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(58);
		this.setTooltip(Blockly.Msg.SHT31_GET_TEMPERATURE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SHT31_GET_TEMPERATURE_HELPURL);
	}
};

Blockly.Blocks["sht31.get_humidity"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.SHT31_GET_HUMIDITY_TITLE);

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
				["0x44", "68"],
				["0x45", "69"]
			]), 'ADDRESS');

		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(58);
		this.setTooltip(Blockly.Msg.SHT31_GET_HUMIDITY_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SHT31_GET_HUMIDITY_HELPURL);
	}
};
