Blockly.JavaScript['mcp23s17_16out.write'] = function(block) {
	return 'DEV_SPI.MCP23S17_16OUT(' + block.getFieldValue('CHANNEL') + ', ' + block.getFieldValue('ADDRESS') + ')' + '.write(' + block.getFieldValue('OUTPUT') + ', ' + block.getFieldValue('STATUS') + ');\n';
};
