Blockly.Blocks["mcp23s17_16out.write"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.MCP23S17_16OUT_WRITE_TITLE);

		// spi channel 0 to 64
		var channel_array = [];
		for (var i = 0;i <= 64; i++) {
			channel_array.push([String(i), String(i)]);
		}
		this.appendDummyInput()
			.appendField(Blockly.Msg.CHANNEL)
			.appendField(
				new Blockly.FieldDropdown(channel_array, function(selectedIndex) {
					// if address item index > 3 for selected index 0, set address item index to 0
					if (selectedIndex == 0) {
						if (Blockly.mcp23s17_get_address_item_index(selectedIndex, this.sourceBlock_.inputList[2].fieldRow[1].value_) > 3) {
							this.sourceBlock_.inputList[2].fieldRow[1].setValue(Blockly.mcp23s17_address_dropdown_menu(0)[0][1]);
						}
					}
					return selectedIndex;
				}),
				'CHANNEL'
			);

		// device addess 0 to 3 for channel 0, addess 0 to 7 for channel 1 to 64
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADDRESS)
			.appendField(new Blockly.FieldDropdown(function() {
				try {
					if ((typeof(this.sourceBlock_) != "undefined") && (typeof(this.sourceBlock_.inputList) != "undefined")) {
						var selected_channel = parseInt(this.sourceBlock_.inputList[1].fieldRow[1].value_);
						return Blockly.mcp23s17_address_dropdown_menu(selected_channel);
					}
				} catch (e) {

				}
				// default
				return Blockly.mcp23s17_address_dropdown_menu(0);
			}), 'ADDRESS');

		// mcp23s17 gpio
		this.appendDummyInput()
			.appendField(Blockly.Msg.OUTPUT)
			.appendField(new Blockly.FieldDropdown([
				["0", "0"],
				["1", "1"],
				["2", "2"],
				["3", "3"],
				["4", "4"],
				["5", "5"],
				["6", "6"],
				["7", "7"],
				["8", "8"],
				["9", "9"],
				["10", "10"],
				["11", "11"],
				["12", "12"],
				["13", "13"],
				["14", "14"],
				["15", "15"]
			]), 'OUTPUT')
			.appendField(Blockly.Msg.STATUS)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.STATUS_OFF, "0"],
				[Blockly.Msg.STATUS_ON, "1"]
			]), 'STATUS');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.MCP23S17_16OUT_WRITE_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.MCP23S17_16OUT_WRITE_HELPURL);
	}
};
