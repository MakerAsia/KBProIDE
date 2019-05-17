Blockly.Blocks['sps30_is_ready'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.SPS30_IS_READY_MESSAGE,
			"output": "Boolean",
			"colour": 135,
			"tooltip": Blockly.Msg.SPS30_IS_READY_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/plugin/12/%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9D%E0%B8%B8%E0%B9%88%E0%B8%99+SPS30"
		});
	}
};

Blockly.Blocks['sps30_wait_ready'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.SPS30_WAIT_READY_MESSAGE,
			"previousStatement": null,
			"nextStatement": null,
			"colour": 135,
			"tooltip": Blockly.Msg.SPS30_WAIT_READY_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/plugin/12/%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9D%E0%B8%B8%E0%B9%88%E0%B8%99+SPS30"
		});
	}
};

Blockly.Blocks['sps30_read_mass_concentration'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.SPS30_READ_MASS_CONCENTRATION_MESSAGE,
			"args0": [{
				"type": "field_dropdown",
				"name": "size",
				"options": [
					[ "PM1.0", "10" ],
					[ "PM2.5", "25" ],
					[ "PM4.0", "40" ],
					[ "PM10", "100" ]
				]
			}],
			"output": "Number",
			"colour": 135,
			"tooltip": Blockly.Msg.SPS30_READ_MASS_CONCENTRATION_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/plugin/12/%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9D%E0%B8%B8%E0%B9%88%E0%B8%99+SPS30"
		});
	}
};

Blockly.Blocks['sps30_read_number_concentration'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.SPS30_READ_NUMBER_CONCENTRATION_MESSAGE,
			"args0": [{
				"type": "field_dropdown",
				"name": "size",
				"options": [
					[ "PM0.5", "5" ],
					[ "PM1.0", "10" ],
					[ "PM2.5", "25" ],
					[ "PM4.0", "40" ],
					[ "PM10", "100" ]
				]
			}],
			"output": "Number",
			"colour": 135,
			"tooltip": Blockly.Msg.SPS30_READ_NUMBER_CONCENTRATION_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/plugin/12/%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9D%E0%B8%B8%E0%B9%88%E0%B8%99+SPS30"
		});
	}
};

Blockly.Blocks['sps30_read_typical_particle_sizes'] = {
	init: function() {
		this.jsonInit({
			"message0": Blockly.Msg.SPS30_TYPICAL_PARTICAL_SIZES_MESSAGE,
			"output": "Number",
			"colour": 135,
			"tooltip": Blockly.Msg.SPS30_TYPICAL_PARTICAL_SIZES_TOOLTIP,
			"helpUrl": "https://store.kidbright.info/plugin/12/%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%8B%E0%B8%AD%E0%B8%A3%E0%B9%8C%E0%B8%9D%E0%B8%B8%E0%B9%88%E0%B8%99+SPS30"
		});
	}
};

