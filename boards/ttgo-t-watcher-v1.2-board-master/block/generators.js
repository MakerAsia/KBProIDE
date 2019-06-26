module.exports = function(Blockly){
'use strict';

Blockly.JavaScript['taskNumber'] = 0;

Blockly.JavaScript.resetTaskNumber = function(block) {
	Blockly.JavaScript['taskNumber'] = 0;
};

// =============================================================================
// basic
// =============================================================================

Blockly.JavaScript['basic_led16x8'] = function(block) {
	var buf = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
	for (var x = 0; x < 16; x++) {
		var byte = 0;
		for (var y = 0; y < 8; y++) {
			var val = block.getFieldValue('POS_X' + x + '_Y' + y);
			if (val == 'TRUE') {
				byte |= (0x01 << y);
			};
		}
		buf[x] = byte;
	}

	var str = '';
	for (var i = 0; i < 16; i++) {
		str += '\\x' + buf[i].toString(16);
	}

	//return 'ht16k33.show((uint8_t *)"' + str + '");\n';
	return 'matrix.printText(0, 0, " ");\n';
};


Blockly.JavaScript['basic_led16x8_clr'] = function(block) {
	var code = 'matrix.printText(0, 0, " ");\n';
	return code;
};

Blockly.JavaScript['basic_led16x8_2chars'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    //var argument0 = Blockly.JavaScript.valueToCode(block);
	var code = 'matrix.printText(0, 0, String(' + argument0 + '));\n';
	return code;
};

Blockly.JavaScript['basic_led16x8_scroll'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	//return 'ht16k33.scroll(' + argument0 + ', true);\n';
	var code = 'matrix.scrollText(String(' + argument0 + '));\n';
	return code;
};

Blockly.JavaScript['basic_led16x8_scroll_when_ready'] = function(block) {
	//var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';

	//return 'if (ht16k33.idle()) { ht16k33.scroll(' + argument0 + ', true); }\n';
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var code = 'matrix.scrollText(String(' + argument0 + '));\n';
	return code;
};

Blockly.JavaScript['basic_delay'] = function(block) {
	return 'vTaskDelay(' + parseInt(1000 * parseFloat(block.getFieldValue('VALUE'))) + ' / portTICK_RATE_MS);\n';
};

Blockly.JavaScript['basic_forever'] = function(block) {
	return 'while(1) {\n' + Blockly.JavaScript.statementToCode(block, 'HANDLER') + '}\n';
};

Blockly.JavaScript['basic_string'] = function(block) {
	return [
		'(char *)"' + block.getFieldValue('VALUE') + '"',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['basic_TFT_setRotation'] = function(block) {
	var code = 'tft.setRotation('+block.getFieldValue('rotation')+');\n';
	return code;
};

Blockly.JavaScript['basic_TFT_fillScreen'] = function(block) {
	let color = block.getFieldValue('COLOR');
	color = color.replace("#", "0x");
	let sourceColor = parseInt(color, 16);
	let red = (sourceColor & 0x00FF0000) >> 16;
	let green = (sourceColor & 0x0000FF00) >> 8;
	let blue =  sourceColor & 0x000000FF;
	let out = (red >> 3 << 11) + (green >> 2 << 5) + (blue >> 3);
	out = out.toString(16);
	var code = 'tft.fillScreen(0x'+out+');\n';
	return code;
};

Blockly.JavaScript['basic_TFT_setTextSize'] = function(block) {
	var code = 'tft.setTextSize('+block.getFieldValue('textSize')+');\n';
	return code;
};

function rgbto16bit(colorIN) {
	let color = colorIN.replace("#", "0x");
	let sourceColor = parseInt(color, 16);
	let red = (sourceColor & 0x00FF0000) >> 16;
	let green = (sourceColor & 0x0000FF00) >> 8;
	let blue =  sourceColor & 0x000000FF;
	let out = (red >> 3 << 11) + (green >> 2 << 5) + (blue >> 3);
	out = out.toString(16)
	return out;   // The function returns the product of p1 and p2
  }

Blockly.JavaScript['basic_TFT_print'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
	var code = 'tft.setCursor('+block.getFieldValue('X')+', '+block.getFieldValue('Y')+');\n tft.setTextColor(0x'+rgbto16bit(block.getFieldValue('COLOR'))+');\n tft.println(String('+argument0+'));\n';
	return code;
};


const nativeImage = require('electron').nativeImage;
var createBuffer = function(pixels,width,height){
    var depth = 4,
        pixelsLen = pixels.length,
        unpackedBuffer = [],
        threshold = 120;

    var buffer = new Buffer((width *  (Math.ceil(height / 8) * 8)) / 8);
    buffer.fill(0x00);// filter pixels to create monochrome image data
    for (var i = 0; i < pixelsLen; i += depth) { // just take the red value
        var pixelVal = pixels[i + 1] = pixels[i + 2] = pixels[i];
        pixelVal = (pixelVal > threshold)? 1 : 0;
        unpackedBuffer[i/depth] = pixelVal; // push to unpacked buffer list
    }
    for(var x = 0;x < width; x++){
        for(var y = 0; y < height; y+=8){
            for(var cy = 0; cy < 8; cy++){
                var iy = y+cy;
                if(iy >= height){ break; }
                buffer[x*Math.ceil(height/8) + Math.floor(y/8)] |= unpackedBuffer[iy*width + x] << cy;
            }
        }
    }
    return buffer;
};

Blockly.JavaScript['i2c128x64_create_image'] = function(block) {
    var dataurl = block.inputList[1].fieldRow["0"].src_;
    var image = nativeImage.createFromDataURL(dataurl);
    var size = image.getSize();
    var buff = createBuffer(image.getBitmap(),size.width,size.height);
    var hexStringArr = '';
    for(let i=1;i<=buff.length;i++){
        hexStringArr += (buff[i-1] < 16)? `0x0${buff[i-1].toString(16)},` : `0x${buff[i-1].toString(16)},`;
        if(i % 20 == 0){ hexStringArr += '\n'; }
    }
    hexStringArr = hexStringArr.trim();
    if(hexStringArr.endsWith(',')){
        hexStringArr = hexStringArr.substring(0,hexStringArr.length - 1);
    }
    var code = `(std::vector<uint8_t>{${hexStringArr}})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['i2c128x64_display_image'] = function(block) {
    var value_img = Blockly.JavaScript.valueToCode(block, 'img', Blockly.JavaScript.ORDER_ATOMIC);
    var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
    var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
    var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
    var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
    // var code = `display.drawFastImage(${value_x}, ${value_y}, ${value_width},${value_height},${value_img}.data());\n`;
	var code = `tft.drawRGBBitmap(${value_x}, ${value_y}, ${value_img}, ${value_width},${value_height});\n`;
	return code;
};

    // tft.drawRGBBitmap(0, 0, dustboyImage, 320, 240);

// =============================================================================
// math
// =============================================================================
Blockly.JavaScript['math_number'] = function(block) {
	return [
		'(int16_t)' + block.getFieldValue('VALUE'),
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['math_arithmetic'] = function(block) {
	// Basic arithmetic operators, and power.
	var OPERATORS = {
		ADD: [' + ', Blockly.JavaScript.ORDER_ADDITION],
		MINUS: [' - ', Blockly.JavaScript.ORDER_SUBTRACTION],
		MULTIPLY: [' * ', Blockly.JavaScript.ORDER_MULTIPLICATION],
		DIVIDE: [' / ', Blockly.JavaScript.ORDER_DIVISION],
//		POWER: [' ^ ', Blockly.JavaScript.ORDER_EXPONENTIATION],
		MODULO: [' % ', Blockly.JavaScript.ORDER_DIVISION]
	};
	var tuple = OPERATORS[block.getFieldValue('OP')];
	var operator = tuple[0];
	var order = tuple[1];
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';
	var code;
	/*// Power in JavaScript requires a special case since it has no operator.
	if (!operator) {
		code = 'Math.pow(' + argument0 + ', ' + argument1 + ')';
		return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
	}*/
	// modulo allow only integer
	if (block.getFieldValue('OP') == 'MODULO') {
		argument0 = '(int)(' + argument0 + ')';
		argument1 = '(int)(' + argument1 + ')';
	}
	code = argument0 + operator + argument1;

	return [code, order];
};

Blockly.JavaScript['math_variables_set'] = function(block) {
	var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
	var varName = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

	return varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript['math_variables_get'] = function(block) {
	var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);

	return [
		code,
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

// =============================================================================
// logic
// =============================================================================
Blockly.JavaScript['controls_if'] = function(block) {
	var n = 0;
	var argument = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || '0';
	var branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
	var code = 'if (' + argument + ') {\n' + branch + '}';

	for (n = 1; n <= block.elseifCount_; n++) {
		argument = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || '0';
		branch = Blockly.JavaScript.statementToCode(block, 'DO' + n);
		code += ' else if (' + argument + ') {\n' + branch + '}';
	}

	if (block.elseCount_) {
		branch = Blockly.JavaScript.statementToCode(block, 'ELSE');
		code += ' else {\n' + branch + '}';
	}

	return code + '\n';
};

Blockly.JavaScript['logic_compare'] = function(block) {
	// Comparison operator.
	var OPERATORS = {
		'EQ': '==',
		'NEQ': '!=',
		'LT': '<',
		'LTE': '<=',
		'GT': '>',
		'GTE': '>='
	};

	var operator = OPERATORS[block.getFieldValue('OP')];
	var order = (operator == '==' || operator == '!=') ?
		Blockly.JavaScript.ORDER_EQUALITY : Blockly.JavaScript.ORDER_RELATIONAL;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order) || '0';
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order) || '0';

	var code = '';
	// check string compare
	if (block.childBlocks_[0].outputConnection.check_[0] == 'String') {
		code = 'strcmp(' + argument0 + ', ' + argument1 + ') ' + OPERATORS[block.getFieldValue('OP')] + ' 0';
	}
	else {
		// default is numeric
		code = argument0 + ' ' + operator + ' ' + argument1;
	}

	return [code, order];
};

Blockly.JavaScript['logic_operation'] = function(block) {
	// Operations 'and', 'or'.
	var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
	var order = (operator == '&&') ? Blockly.JavaScript.ORDER_LOGICAL_AND :	Blockly.JavaScript.ORDER_LOGICAL_OR;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'A', order);
	var argument1 = Blockly.JavaScript.valueToCode(block, 'B', order);

	if (!argument0 && !argument1) {
		// If there are no arguments, then the return value is false.
		argument0 = 'false';
		argument1 = 'false';
	} else {
		// Single missing arguments have no effect on the return value.
		var defaultArgument = (operator == '&&') ? 'true' : 'false';
		if (!argument0) {
			argument0 = defaultArgument;
		}
		if (!argument1) {
			argument1 = defaultArgument;
		}
	}
	var code = '(' + argument0 + ') ' + operator + ' (' + argument1 + ')';

	return [code, order];
};

Blockly.JavaScript['logic_negate'] = function(block) {
	// Negation.
	var order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
	var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', order) || 'true';
	var code = '!' + argument0;

	return [code, order];
};

Blockly.JavaScript['logic_boolean'] = function(block) {
	// Boolean values true and false.
	var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
	return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['logic_led16x8_scroll_ready'] = function(block) {
	return ['ht16k33.idle()', Blockly.JavaScript.ORDER_ATOMIC];
}

Blockly.JavaScript['logic_sw1_pressed'] = function(block) {
	var code = ['digitalRead(T4_BUTTON1) == 0', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
}

Blockly.JavaScript['logic_sw1_released'] = function(block) {
	var code = ['digitalRead(T4_BUTTON1) == 1', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
}

Blockly.JavaScript['logic_sw2_pressed'] = function(block) {
	var code = ['digitalRead(T4_BUTTON2) == 0', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
}

Blockly.JavaScript['logic_sw2_released'] = function(block) {
	var code = ['digitalRead(T4_BUTTON2) == 1', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
}

Blockly.JavaScript['logic_sw3_pressed'] = function(block) {
	var code = ['digitalRead(T4_BUTTON3) == 0', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
}

Blockly.JavaScript['logic_sw3_released'] = function(block) {
	var code = ['digitalRead(T4_BUTTON3) == 1', Blockly.JavaScript.ORDER_ATOMIC];
	return code;
}

// =============================================================================
// loop
// =============================================================================
Blockly.JavaScript['controls_whileUntil'] = function(block) {
	// Do while/until loop.
	var until = block.getFieldValue('MODE') == 'UNTIL';
	var argument0 = Blockly.JavaScript.valueToCode(block, 'BOOL', until ? Blockly.JavaScript.ORDER_LOGICAL_NOT : Blockly.JavaScript.ORDER_NONE) || 'false';
	var branch = Blockly.JavaScript.statementToCode(block, 'DO');

//testbug
//console.log('controls_whileUntil');

	branch = Blockly.JavaScript.addLoopTrap(branch, block.id);

//testbug
//console.log('addLoopTrap');

	if (until) {
		argument0 = '!' + argument0;
	}

	return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.JavaScript['loop_break'] = function(block) {
	return 'break;\n';
};

Blockly.JavaScript['loop_continue'] = function(block) {
	return 'continue;\n';
};

// =============================================================================
// wait
// =============================================================================
Blockly.JavaScript['wait_led_matrix_ready'] = function(block) {
	return 'ht16k33.wait_idle();\n';
};

Blockly.JavaScript['wait_sw1_pressed'] = function(block) {
	var code = 'while(digitalRead(T4_BUTTON1) == 1) { delay(1); }\n';
	return code;
};

Blockly.JavaScript['wait_sw1_released'] = function(block) {
	var code = 'while(digitalRead(T4_BUTTON1) == 0) { delay(1); }\n';
	return code;
};

Blockly.JavaScript['wait_sw2_pressed'] = function(block) {
	var code = 'while(digitalRead(T4_BUTTON2) == 1) { delay(1); }\n';
	return code;
};

Blockly.JavaScript['wait_sw2_released'] = function(block) {
	var code = 'while(digitalRead(T4_BUTTON2) == 0) { delay(1); }\n';
	return code;
};

Blockly.JavaScript['wait_sw3_pressed'] = function(block) {
	var code = 'while(digitalRead(T4_BUTTON3) == 1) { delay(1); }\n';
	return code;
};

Blockly.JavaScript['wait_sw3_released'] = function(block) {
	var code = 'while(digitalRead(T4_BUTTON3) == 0) { delay(1); }\n';
	return code;
};

// =============================================================================
// music
// =============================================================================
Blockly.JavaScript['music_note'] = function(block) {
	var code = 'music.note('+ block.getFieldValue('NOTE') + ',' + block.getFieldValue('DURATION') + ');\n';
	return code;
	// var ret =
	// 	'sound.note(' + block.getFieldValue('NOTE') + ');\n' +
	// 	'sound.rest(' + block.getFieldValue('DURATION') + ');\n' +
	// 	'sound.off();\n';
	//
	// return ret;
};

Blockly.JavaScript['music_rest'] = function(block) {
	return 'sound.rest(' + block.getFieldValue('DURATION') + ');\n';
};

Blockly.JavaScript['music_scale'] = function(block) {
	var ret =
		'sound.note(' + block.getFieldValue('NOTE') + ');\n' +
		'sound.rest(' + block.getFieldValue('DURATION') + ');\n' +
		'sound.off();\n';

	return ret;
};

Blockly.JavaScript['music_set_volume'] = function(block) {
	return 'sound.set_volume(' + block.getFieldValue('VALUE') + ');\n';
};

Blockly.JavaScript['music_get_volume'] = function(block) {
	return [
		'sound.get_volume()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['music_set_tempo'] = function(block) {
	return 'sound.set_bpm(' + block.getFieldValue('VALUE') + ');\n';
};

// =============================================================================
// sensor
// =============================================================================
Blockly.JavaScript['sensor_lm73'] = function(block) {
	//var code = 'lm73.readTemp()\n';
	//return code;
	return [
		'lm73.readTemp()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_ldr'] = function(block) {
	return [
		'ldr.mapLDR()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_switch1'] = function(block) {
	return [ '((int)digitalRead(T4_BUTTON1))',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_switch2'] = function(block) {
	return [ '((int)digitalRead(T4_BUTTON2))',
        Blockly.JavaScript.ORDER_ATOMIC
	];
};

Blockly.JavaScript['sensor_switch3'] = function(block) {
    return [ '((int)digitalRead(T4_BUTTON3))',
        Blockly.JavaScript.ORDER_ATOMIC
    ];
};

// =============================================================================
// rtc
// =============================================================================
Blockly.JavaScript['rtc_get'] = function(block) {
	return [
		'mcp7940n.get_datetime()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_date'] = function(block) {
	return [
		'mcp7940n.get_date()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_time'] = function(block) {
	return [
		'mcp7940n.get_time()',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_day'] = function(block) {
	return [
		'mcp7940n.get(0)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_month'] = function(block) {
	return [
		'mcp7940n.get(1)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_year'] = function(block) {
	return [
		'mcp7940n.get(2)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_hour'] = function(block) {
	return [
		'mcp7940n.get(3)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_minute'] = function(block) {
	return [
		'mcp7940n.get(4)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_get_second'] = function(block) {
	return [
		'mcp7940n.get(5)',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['rtc_cal'] = function(block) {
	return 'mcp7940n.cal(' + block.getFieldValue('VALUE') + ');\n';
};
Blockly.JavaScript['rtc_cal_coarse'] = function(block) {
	return 'mcp7940n.cal_coarse(' + block.getFieldValue('VALUE') + ');\n';
};

// =============================================================================
// I/O
// =============================================================================
Blockly.JavaScript['output_write'] = function(block) {
    var code = 'digitalWrite('+ block.getFieldValue('OUTPUT') + ',' + block.getFieldValue('STATUS') + ');\n';
    return code;

	//return 'ports.output' + block.getFieldValue('OUTPUT') + '_write(' + block.getFieldValue('STATUS') + ');\n';
};
Blockly.JavaScript['output_toggle'] = function(block) {
	var code = 'digitalWrite('+ block.getFieldValue('OUTPUT') + ', !digitalRead(' + block.getFieldValue('OUTPUT') + '));\n';
	return code;
};
Blockly.JavaScript['output_read'] = function(block) {
	return [
		'digitalRead('+ block.getFieldValue('OUTPUT') + ')',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['usbsw_write'] = function(block) {
	var code = 'digitalWrite(KB_USB,' + block.getFieldValue('STATUS') + ');\n';
	return code;
};
Blockly.JavaScript['usbsw_toggle'] = function(block) {
	var code = 'digitalWrite(KB_USB, !digitalRead(KB_USB));\n';
    return code;
};
Blockly.JavaScript['usbsw_read'] = function(block) {
	return [ 
		'((int)digitalRead(KB_USB))',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};
Blockly.JavaScript['input_read'] = function(block) {
	return [
		'digitalRead(' + block.getFieldValue('INPUT') + ')',
		Blockly.JavaScript.ORDER_ATOMIC
	];
};

// =============================================================================
// advance
// =============================================================================
Blockly.JavaScript['advance_task'] = function(block) {
	// generate unique function name
	Blockly.JavaScript.taskNumber++;
	var funcName = 'vTask' + Blockly.JavaScript.taskNumber;

	var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
	if (Blockly.JavaScript.STATEMENT_PREFIX) {
		branch = Blockly.JavaScript.prefixLines(
			Blockly.JavaScript.STATEMENT_PREFIX.replace(/%1/g,
				'\'' + block.id + '\''), Blockly.JavaScript.INDENT) + branch;
	}
	if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
		branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
			'\'' + block.id + '\'') + branch;
	}

	var code = 'void ' + funcName + '(void *pvParameters) {\n' +
		branch +
		'  // kill itself\n' +
		'  vTaskDelete(NULL);\n' +
		'}';
	code = Blockly.JavaScript.scrub_(block, code);
	// Add % so as not to collide with helper functions in definitions list.
	Blockly.JavaScript.definitions_['%' + funcName] = code;

	return null;
};

}