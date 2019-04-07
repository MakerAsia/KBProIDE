#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>
#include "SH1106.h"
#include "BMP280.h"
#include "BMX055.h"
#include "BH1745NUC.h"
#include "KBProTime.h"
#include "BluetoothSerial.h"

using namespace std;

SH1106 display(0x3c, 21, 22);
BMP280 bme280(0x77);
BMX055 bmx055;
BH1745NUC bh1745;
KBProTime kbprotime;
BluetoothSerial SerialBT;

String acc;
String gyro;
String mag;
String rgb;
String thp;
String light;
void setup()
{
  pinMode(14,INPUT);
  pinMode(15,INPUT);
  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_10);
  //---SENSOR---//
  bme280.begin();
  bmx055.begin();
  bh1745.getAddr_BH1745NUC(BH1745NUC_DEFAULT_ADDRESS);
  bh1745.Initialize();
  bh1745.begin();
  
}
void loop()
{
  acc = (String((char *)"ACC X:")+String(bmx055.getAccX())+String((char *)"Y:")+String(bmx055.getAccY())+String((char *)"Z:")+String(bmx055.getAccZ()));
gyro = (String((char *)"GYRO X:")+String(bmx055.getGyroX())+String((char *)"Y:")+String(bmx055.getGyroY())+String((char *)"Z:")+String(bmx055.getGyroZ()));
mag = (String((char *)"MAG X:")+String(bmx055.getMagneticX())+String((char *)"Y:")+String(bmx055.getMagneticY())+String((char *)"Z:")+String(bmx055.getMagneticZ()));
rgb = (String((char *)"R:")+String(bh1745.getRedColor())+String((char *)"G:")+String(bh1745.getGreenColor())+String((char *)"B:")+String(bh1745.getBlueColor()));
thp = (String((char *)"T:")+String(bme280.readTemperature())+String((char *)"H:")+String(bme280.readHumidity())+String((char *)"P:")+String(bme280.readPressure()));
light = (String((char *)"L1 : ")+String(analogRead(36))+String((char *)"L2:")+String(analogRead(39))+String((char *)"BT1:")+String(digitalRead(14))+String((char *)"BT2:")+String(digitalRead(15)));
display.clear();
display.setFont(ArialMT_Plain_10);
display.drawString(0,0,acc);
display.setFont(ArialMT_Plain_10);
display.drawString(0,10,gyro);
display.setFont(ArialMT_Plain_10);
display.drawString(0,20,mag);
display.setFont(ArialMT_Plain_10);
display.drawString(0,30,rgb);
display.setFont(ArialMT_Plain_10);
display.drawString(0,40,thp);
display.setFont(ArialMT_Plain_10);
display.drawString(0,50,light);
display.display();

}