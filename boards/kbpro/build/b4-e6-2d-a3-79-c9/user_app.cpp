#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>
#include "SH1106.h"
#include "BME280.h"
#include "BMX055.h"
#include "BH1745NUC.h"
#include "KBProTime.h"
#include "BluetoothSerial.h"
#include "MusicDefinitions.h"
#include "XT_DAC_Audio.h"

using namespace std;

SH1106 display(0x3c, 21, 22);
BME280 bme280 = BME280();
BMX055 bmx055;
BH1745NUC bh1745;
KBProTime kbprotime;
BluetoothSerial SerialBT;
XT_DAC_Audio_Class DacAudio(26,3);

String res;
 String build_string();


String build_string(){
          res = (String("button A =")+String(digitalRead(14)));

          return res;

}


void setup()
{
  pinMode(14,INPUT);
  pinMode(15,INPUT);
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
  //---SENSOR---//
  bme280.init();
  bmx055.begin();
  bh1745.getAddr_BH1745NUC(BH1745NUC_DEFAULT_ADDRESS);
  bh1745.Initialize();
  bh1745.begin();
  
    Serial.begin(115200);


}
void loop()
{
  /**
 * Describe this function...
 */
  delay(500);
  Serial.println((build_string()));

}