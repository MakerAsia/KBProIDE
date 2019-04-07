module.exports = function(Blockly){
  'use strict';

Blockly.JavaScript['wifi_connect'] = function(block) {
  var text_ssid = block.getFieldValue('ssid');
  var text_password = block.getFieldValue('password');
  var code = `WiFi.begin("${text_ssid}","${text_password}");
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
  }\n`;
  return code;
};

Blockly.JavaScript['wifi_ap'] = function(block) {
  var text_ssid = block.getFieldValue('ssid');
  var text_password = block.getFieldValue('password');
  var code = `WiFi.softAP("${text_ssid}", "${text_password}");\n`;
  return code;
};

Blockly.JavaScript['wifi_http_get'] = function(block) {
  var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  var code = `...`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['wifi_http_post'] = function(block) {
  var value_url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_content_type = block.getFieldValue('content_type');
  var code = `...`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['wifi_start_server'] = function(block) {
  var text_port = block.getFieldValue('port');
  var code = `VARIABLE.WebServer server(80);
  SETUP.server.begin();
  server.handleClient()\n`;
  return code;
};

Blockly.JavaScript['wifi_server_on'] = function(block) {
  var text_event_name = block.getFieldValue('event_name');
  var statements_event_do = Blockly.JavaScript.statementToCode(block, 'event_do');
  var code = `SETUP.server.on("${text_event_name}",[](){
    ${statements_event_do}
  });\n`;
  return code;
};

Blockly.JavaScript['wifi_server_send'] = function(block) {
  var dropdown_status = block.getFieldValue('status');
  var dropdown_content_type = block.getFieldValue('content_type');
  var value_text = Blockly.JavaScript.valueToCode(block, 'text', Blockly.JavaScript.ORDER_ATOMIC);  
  var code = `server.send(${dropdown_status}, "${dropdown_content_type}", ${value_text});\n`;
  return code;
};

Blockly.JavaScript['wifi_get_ip_addr'] = function(block) {
  var code = `WiFi.localIP()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};


}