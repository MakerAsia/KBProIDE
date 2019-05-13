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

typedef int Number;
typedef int Boolean;

using namespace std;

SH1106 display(0x3c, 21, 22);
BME280 bme280 = BME280();
BMX055 bmx055;
BH1745NUC bh1745;
KBProTime kbprotime;
BluetoothSerial SerialBT;
XT_DAC_Audio_Class DacAudio(26,3);

Boolean enterGame;
Number barXPos;
Number obarXPos;
Number ballXPos;
Number ballYPos;
Number humanScore;
Number aiScore;
Number xVector;
Number yVector;



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
  
  
    pinMode(37,INPUT_PULLUP);
  pinMode(38,INPUT_PULLUP);
  pinMode(39,INPUT_PULLUP);
  enterGame = false;
  barXPos = 32;
  obarXPos = 32;
  ballXPos = 0;
  ballYPos = 32;
  humanScore = 0;
  aiScore = 0;
  xVector = 1;
  yVector = 1;

  display.setFont(ArialMT_Plain_24);
  display.drawString(20,20,String("Pong Game"));
  display.display();
  while (!enterGame) {
    if (digitalRead(39) == 1) {
      enterGame = true;
    }
    delay(100);
  }
  display.clear();

  display.setFont(ArialMT_Plain_24);
  display.drawString(20,20,String("Game Start !!!"));
  display.display();
  delay(500);
  display.clear();


}
void loop()
{
  
  
}