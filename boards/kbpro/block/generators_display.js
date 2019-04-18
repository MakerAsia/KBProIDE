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
module.exports = function(Blockly){
  'use strict';

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
    var code = `(vector<uint8_t>{${hexStringArr}})`;
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['i2c128x64_display_image'] = function(block) {
  var value_img = Blockly.JavaScript.valueToCode(block, 'img', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `display.drawFastImage(${value_x}, ${value_y}, ${value_width},${value_height},${value_img}.data());\n`;
  return code;
};

Blockly.JavaScript['i2c128x64_display_clear'] = function(block) {  
  var code = 'display.clear();\n';
  return code;
};

Blockly.JavaScript['i2c128x64_display_display'] = function(block) {  
  var code = 'display.display();\n';
  return code;
};

Blockly.JavaScript['i2c128x64_display_print'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_font = block.getFieldValue('font');  
  var code = 
`
display.setFont(${dropdown_font});
display.drawString(${value_x},${value_y},${value_text});
`;
  return code;
};

Blockly.JavaScript['i2c128x64_display_draw_line'] = function(block) {
  var value_x0 = Blockly.JavaScript.valueToCode(block, 'x0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y0 = Blockly.JavaScript.valueToCode(block, 'y0', Blockly.JavaScript.ORDER_ATOMIC);
  var value_x1 = Blockly.JavaScript.valueToCode(block, 'x1', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y1 = Blockly.JavaScript.valueToCode(block, 'y1', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `display.drawLine(${value_x0},${value_y0},${value_x1},${value_y1});\n`;
  return code;
};

Blockly.JavaScript['i2c128x64_display_draw_rect'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_width = Blockly.JavaScript.valueToCode(block, 'width', Blockly.JavaScript.ORDER_ATOMIC);
  var value_height = Blockly.JavaScript.valueToCode(block, 'height', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_fill = block.getFieldValue('fill') == 'TRUE';  
  if(checkbox_fill){
    var code = `display.fillRect(${value_x},${value_y},${value_width},${value_height});\n`;
  }else{
    var code = `display.drawRect(${value_x},${value_y},${value_width},${value_height});\n`;
  }
  return code;
};

Blockly.JavaScript['i2c128x64_display_draw_circle'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var value_r = Blockly.JavaScript.valueToCode(block, 'r', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_fill = block.getFieldValue('fill') == 'TRUE';
  if(checkbox_fill){
    var code = `display.fillCircle(${value_x},${value_y},${value_r});\n`;
  }else{
    var code = `display.drawCircle(${value_x},${value_y},${value_r});\n`;
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

Blockly.JavaScript['i2c128x64_display_draw_pixel'] = function(block) {
  var value_x = Blockly.JavaScript.valueToCode(block, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var value_y = Blockly.JavaScript.valueToCode(block, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var checkbox_color = (block.getFieldValue('color') == 'TRUE')?'WHITE':'BLACK';  
  var code = `
display.setColor(${checkbox_color});
display.setPixel(${value_x}, ${value_y});
display.setColor(WHITE);
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