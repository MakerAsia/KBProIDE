Blockly.JavaScript['mcp23s17_16in.read'] = function(block) {
	return [
		'DEV_SPI.MCP23S17_16IN(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ')' + '.read(' + block.getFieldValue('INPUT') + ')',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
