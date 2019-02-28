Blockly.Blocks["adsws1_ws.get_wind_speed_km_h"] = {
	init: function() {
		this.appendDummyInput()
			.appendField(Blockly.Msg.ADSWS1_WS_GET_WIND_SPEED_KM_H_TITLE)
			.appendField(new Blockly.FieldDropdown([
				["IN1", "32"],
				["IN2", "33"],
				["IN3", "34"],
				["IN4", "35"]
			]), 'INPUT');
		this.setOutput(true, 'Number');
		this.setPreviousStatement(false);
		this.setNextStatement(false);
		this.setColour(58);
		this.setTooltip(Blockly.Msg.ADSWS1_WS_GET_WIND_SPEED_KM_H_TOOLTIP);
		this.setHelpUrl(Blockly.Msg.ADSWS1_WS_GET_WIND_SPEED_KM_H_HELPURL);
	}
};
