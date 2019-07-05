module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['neopixel_rgb_begin'] = function(block) {
  var value_pin = Blockly.JavaScript.valueToCode(block, 'PIN', Blockly.JavaScript.ORDER_ATOMIC);
  var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);

	var code = 
  `
  #EXTINC##include "Adafruit_NeoPixel.h" #END
  #VARIABLE#define PIN            ${value_pin} #END
  #VARIABLE#define NUMPIXELS      ${value_num} #END

  #VARIABLEAdafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800); #END
  #SETUPpixels.begin(); #END
  `;
  return code;
};

Blockly.JavaScript['neopixel_rgb_clear'] = function(block) {
  var code = 
  `
  for(int clearPixel = 0; clearPixel < pixels.numPixels(); clearPixel++) {
    pixels.setPixelColor(clearPixel, pixels.Color(0,0,0));
  	pixels.show();
  }
  `;
	return code;
};

Blockly.JavaScript['neopixel_rgb_setPixelColor'] = function(block) {
  var value_num = Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC);
  var value_r = Blockly.JavaScript.valueToCode(block, 'R', Blockly.JavaScript.ORDER_ATOMIC);
  var value_g = Blockly.JavaScript.valueToCode(block, 'G', Blockly.JavaScript.ORDER_ATOMIC);
  var value_b = Blockly.JavaScript.valueToCode(block, 'B', Blockly.JavaScript.ORDER_ATOMIC);

  var code = 
  `
  pixels.setPixelColor(${value_num}, pixels.Color(${value_r}, ${value_g}, ${value_b}));
  pixels.show();
  `;
  return code;
};

lockly.JavaScript['basic_TFT_fillScreen'] = function(block) {
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

Blockly.JavaScript['oled128x64_display_print'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x = Blockly.JavaScript.valueToCode(block, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_textSize = block.getFieldValue('textSize'); 
  var checkbox_color = (block.getFieldValue('color') == 'TRUE')?'WHITE':'INVERSE'; 

  var code = 
  `
  display.setTextSize(${value_textSize});
  display.setTextColor(${checkbox_color});
  display.setCursor(${value_x}, ${value_y});
  display.println(String(${value_text}));
  display.display();
  `;
  return code;
};

Blockly.JavaScript['oled128x64_display_println'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var value_textSize = block.getFieldValue('textSize'); 
  var checkbox_color = (block.getFieldValue('color') == 'TRUE')?'WHITE':'INVERSE'; 

  var code = 
  `
  display.setTextSize(${value_textSize});
  display.setTextColor(${checkbox_color});
  display.println(String(${value_text}));
  display.display();
  `;
  return code;
};
// ######################################################################

Blockly.JavaScript['i2c128x64_display_print'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_font = block.getFieldValue('font');  
  var code = 
  `
  display.setFont(${dropdown_font});
  display.drawString(${value_x},${value_y},String(${value_text}));
  `;
  return code;
};

Blockly.JavaScript['tft_display_draw_line'] = function(block) {
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x1 = Blockly.JavaScript.valueToCode(block, 'x1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y1 = Blockly.JavaScript.valueToCode(block, 'y1', Blockly.JavaScript.ORDER_ATOMIC); 
  var checkbox_color = (block.getFieldValue('color') == 'TRUE')?'WHITE':'INVERSE'; 

  var code = 
  `
  display.drawLine(${value_x0}, ${value_y0}, ${value_x1}, ${value_y1}, ${checkbox_color});
  display.display();
  `;
  return code;
};

Blockly.JavaScript['tft_display_draw_rect'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_fill = block.getFieldValue('fill') == 'TRUE';  

  if(checkbox_fill){
    var code = 
    `
    display.fillRect(${value_x}, ${value_y}, ${value_width}, ${value_height}, INVERSE);
    display.display();
    `;
  }else{
    var code = 
    `
    display.drawRect(${value_x}, ${value_y}, ${value_width}, ${value_height}, WHITE);
    display.display();
    `;
  }
  return code;
};

Blockly.JavaScript['tft_display_draw_circle'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_fill = block.getFieldValue('fill') == 'TRUE';

  if(checkbox_fill){
    var code = 
    `
    display.fillCircle(${value_x}, ${value_y}, ${value_r}, INVERSE);
    display.display();
    `;
  }else{
    var code = 
    `
    display.fillCircle(${value_x}, ${value_y}, ${value_r}, WHITE);
    display.display();
    `;
  }  
  return code;
};

Blockly.JavaScript['i2c128x64_display_draw_progress_bar'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var value_progress = Blockly.JavaScript.valueToCode(block, 'progress', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `display.drawProgressBar(${value_x}, ${value_y}, ${value_width}, ${value_height}, ${value_progress});\n`;
  return code;
};

Blockly.JavaScript['oled128x64_display_draw_pixel'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_color = (block.getFieldValue('color') == 'TRUE')?'WHITE':'INVERSE';  
  var code = `
  display.drawPixel(${value_x}, ${value_y}, ${checkbox_color});
  display.display();
  `;
  return code;
};

Blockly.JavaScript['i2c128x64_display_string_width'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `display.getStringWidth(${value_text},${value_text.length})`;  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['i2c128x64_display_width'] = function(block) {  
  var code = 'display.getWidth()';  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['i2c128x64_display_height'] = function(block) {  
  var code = 'display.getHeight()';  
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

}