#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include "SPI.h"
#include "pins_arduino.h"
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

Adafruit_ILI9341 tft = Adafruit_ILI9341(T4_TFT_CS, T4_TFT_DC);

${EXTINC}


typedef int Number;
typedef int Boolean;

using namespace std;

${VARIABLE}

${FUNCTION}


void setup()
{
  pinMode(T4_BUTTON1, INPUT_PULLUP);
  pinMode(T4_BUTTON2, INPUT_PULLUP);
  pinMode(T4_BUTTON3, INPUT_PULLUP);
  pinMode(T4_TFT_BL, OUTPUT);
  digitalWrite(T4_TFT_BL, HIGH);

  tft.begin();
  tft.setRotation(0);
  tft.fillScreen(0xFFFF);
  tft.setTextSize(1);

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}

  while(1){yield();};
}
