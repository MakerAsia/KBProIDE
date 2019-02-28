Blockly.Blocks["lcd_spi_20x4.clear"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_TITLE);

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

		// device addess 0x20 to 0x23 for channel 0, addess 0x20 to 0x27 for channel 1 to 64
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

		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_CLR_TITLE);

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_SPI_20X4_CLR_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_SPI_20X4_CLR_HELPURL);
	}
};

Blockly.Blocks["lcd_spi_20x4.backlight"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_TITLE);

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

		// device addess 0x20 to 0x23 for channel 0, addess 0x20 to 0x27 for channel 1 to 64
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

		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_BACKLIGHT_TITLE)
			.appendField(new Blockly.FieldDropdown([
				[Blockly.Msg.STATUS_OFF, "0"],
				[Blockly.Msg.STATUS_ON, "1"]
			]), 'STATUS');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_SPI_20X4_BACKLIGHT_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_SPI_20X4_BACKLIGHT_HELPURL);
	}
};

Blockly.Blocks["lcd_spi_20x4.print"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_TITLE);

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

		// device addess 0x20 to 0x23 for channel 0, addess 0x20 to 0x27 for channel 1 to 64
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

		this.appendValueInput('VALUE')
			.appendField(Blockly.Msg.LCD_SPI_20X4_PRINT_TITLE)
			.appendField('(')
			.appendField(new Blockly.FieldNumber(1, 1, 20, 1), 'COLUMN')
			.appendField(',')
			.appendField(new Blockly.FieldNumber(1, 1, 4, 1), 'ROW')
			.appendField(')');

		this.setInputsInline(true);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setColour(160);
		this.setTooltip(Blockly.Msg.LCD_SPI_20X4_PRINT_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_SPI_20X4_PRINT_HELPURL);
	}
};

Blockly.Blocks["lcd_spi_20x4.print_prec"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.LCD_SPI_20X4_TITLE);

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

		// device addess 0x20 to 0x23 for channel 0, addess 0x20 to 0x27 for channel 1 to 64
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

		this.appendValueInput('VALUE')
			.setCheck('Number')
			.appendField(Blockly.Msg.LCD_SPI_20X4_PRINT_PREC_TITLE)
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
		this.setTooltip(Blockly.Msg.LCD_SPI_20X4_PRINT_PREC_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.LCD_SPI_20X4_PRINT_PREC_HELPURL);
	}
};
