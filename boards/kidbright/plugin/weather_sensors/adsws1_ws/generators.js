Blockly.JavaScript['adsws1_ws.get_wind_speed_km_h'] = function(block) {
	return [
		// input = IN1(gpio 32), IN2(gpio 33), IN3(gpio 34), IN4(gpio 35)
		'DEV_IO.ADSWS1_WS(' + block.getFieldValue('INPUT')  + ')' + '.get_wind_speed_km_h()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
