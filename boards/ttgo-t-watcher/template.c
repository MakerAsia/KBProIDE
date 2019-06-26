#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include "SPI.h"

#include "pins_arduino.h"
#include "KB_initBoard.h"

#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

// Adafruit_ILI9341 tft = Adafruit_ILI9341(T4_TFT_CS, T4_TFT_DC, T4_TFT_MOSI, T4_TFT_CLK, T4_TFT_RST, T4_TFT_MISO);
Adafruit_ILI9341 tft = Adafruit_ILI9341(T4_TFT_CS, T4_TFT_DC);

${EXTINC}

#include "KB_tft.h"

KB_board board = KB_board();
// KB_TFT display = KB_TFT();

typedef int Number;
typedef int Boolean;

using namespace std;

${VARIABLE}

${FUNCTION}


void setup()
{
  board.begin();
  // display.begin();

  pinMode(4, OUTPUT);
  digitalWrite(4, HIGH);

  tft.begin();

  tft.setRotation(0);
  tft.fillScreen(0x0000);
  tft.setTextSize(1);
  tft.setCursor(0, 0);
  tft.setTextColor(0x0000);
  tft.println(String(String("Hello World!")));

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}

  while(1){yield();};
}
