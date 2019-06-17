# ESP32-Wrover board for KBPro IDE

## การสร้างบอร์ดสำหรับ KBPro IDE
- ทำการ falk repository นี้ (หรือ repo ที่ต้องการแก้ไข)
- ใน folder **block** จะเก็บ block ที่ให้แสดงใน IDE สามารถเพิ่ม block ใหม่เข้าไปได้
	- ในการสร้าง block ใหม่จะต้องมี 2 ไฟล์ **blocks-xxx.js** และ **generators-xxx.js**
	- blocks-wifi.js (ตัวอย่างการสร้าง block wifi)
		~~~ 
        module.exports = function(Blockly){
        'use strict';
        
          Blockly.Blocks['wifi_connect'] = {
              init: function() {
                this.appendDummyInput()
                    .appendField("connect WiFi ssid")
                    .appendField(new Blockly.FieldTextInput("test"), "ssid")
                    .appendField("password")
                    .appendField(new Blockly.FieldTextInput("test"), "password");
                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setColour(270);
                this.setTooltip("connect WiFi");
                this.setHelpUrl("");
          	}
          }
          
        };
        ~~~
    - generators-wifi.js (ตัวอย่างการสร้าง generator wifi)
        ~~~ 
        module.exports = function(Blockly){
        'use strict';
        	Blockly.JavaScript['wifi_connect'] = function(block) {
            	var text_ssid = block.getFieldValue('ssid');
                var text_password = block.getFieldValue('password');
                var code = `
                  WiFi.begin("${text_ssid}","${text_password}");
                  while(WiFi.status() != WL_CONNECTED){ 
                      delay(500); 
                  }
                  `;
  				return code;
            }
		};

        ~~~
   - สามารถออกแบบ design block อย่างง่ายได้ที่ <https://blockly-demo.appspot.com/static/demos/blockfactory/index.html> 
   - ในไฟล์ config.js จะเป็น json สำหรับจัดเรียงการแสดงผล block บน toolbar ซึ่งสามารถกำหนดแบบปกติและแบบ xml (ดูตัวอย่างในไฟล์) config.js
- **build** จะเก็บโค้ดและไฟล์ที่คอมไพล์แล้ว (.bin) ไว้แยกตาม MAC Address
- **include** ใช้สำหรับเก็บโค้ด .h และ .cpp โดยขณะที่ compile จะรวมโค้ดเหล่านี้เข้าไปด้วย
- **lib** ใช้สำหรับเก็บ static library .a สำหรับการ link
- **plugin** จะใช้เก็บ plugin ของบอร์ด (ปลั๊กอินที่มี scope ใช้งานได้เฉพาะบอร์ดจะเก็บไว้ที่นี่)
- **static** จะเก็บไฟล์อื่น ๆ เช่นรูปภาพแสดงผล เสียง เป็นต้น
- ไฟล์ **compiler.js** จะเป็นไฟล์ที่ถูกเรียกใช้เมื่อทำการคอมไพล์ สามารถแก้ไขการคอมไพล์ได้ที่ไฟล์นี้
- ไฟล์ **config.js** ให้ทำการแก้ไขรายละเอียดของบอร์ดที่ไฟล์นี้
	- name : 'esp32-wrover',     //เป็นชื่อของบอร์ด ห้ามมี spacebar
    - platform : 'arduino-esp32',     //ใช้กำหนด platform ของบอร์ดนี้ว่าจะเป็น platform ไหน
    - title : 'Generic ESP32 Wrover',    //ชื่อที่ใช้แสดงผล  
    - description : 'ESP32-Wrover development board with extra RAM.\n',    //คำอธิบายบอร์ด
    - author : 'Comdet Phueadphut',     //ผู้เขียน
    - website : 'https://docs.espressif.com/projects/esp-idf/en/latest/get-started/get-started-wrover-kit.html',    //เว็บไซต์ของบอร์ด
    - email : 'comdet.p@gmail.com',    //email ติดต่อ
    - git : 'https://github.com/comdet/generic-esp32-wrover/',     //github ของบอร์ด (รองรับแค่ github เท่านั้น)
    - image : '/static/display.jpg',     //รูปภาพที่ใช้แสดงผล
    - version : '1.0.1'     //เวอร์ชั่นของบอร์ด 
- context.json ใช้เก็บ flag ตอน compile เรียกใช้โดยไฟล์ compile.js (เก็บเป็นแบบ Array)
- template.c ไฟล์สำหรับเป็น template ของโค้ด โดยโค้ดที่เขียนจาก block จะแทรกตามส่วนต่าง ๆ ของไฟล์นี้เพื่อประกอบเป็นโค้ดที่สมบูรณ์
## การเพิ่มบอร์ดเข้า IDE
สามารถทำได้โดยคัดลอกไปยัง folder board ใน IDE
## การ publish บอร์ด
- ทำการเปิดโหมด developer ใน IDE setting
- เข้าไปที่เมนูเลือกบอร์ด จะมีปุ่ม + เพิ่มขึ้นมา 
- ทำการใส่ URL ของ github เข้าไป