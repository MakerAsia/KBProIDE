Blockly.Blocks["si7021.get_temperature"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.SI7021_GET_TEMPERATURE_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(58);
		this.setTooltip(Blockly.Msg.SI7021_GET_TEMPERATURE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SI7021_GET_TEMPERATURE_HELPURL);
	}
};

Blockly.Blocks["si7021.get_humidity"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.SI7021_GET_HUMIDITY_TITLE);

		// i2c channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(new Blockly.FieldDropdown(channel_array), 'CHANNEL');

		this.setOutput(true, 'Number');
		this.setInputsInline(true);
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(58);
		this.setTooltip(Blockly.Msg.SI7021_GET_HUMIDITY_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.SI7021_GET_HUMIDITY_HELPURL);
	}
};
