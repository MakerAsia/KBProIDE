#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include "pins_arduino.h"
#include "KB_initBoard.h"

#include "SPI.h"
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

Adafruit_ILI9341 tft = Adafruit_ILI9341(T4_TFT_CS, T4_TFT_DC);

${EXTINC}


#include "KB_tft.h"

KB_board board = KB_board();
KB_TFT display = KB_TFT();

typedef int Number;
typedef int Boolean;

using namespace std;

${VARIABLE}

${FUNCTION}

void setup()
{
  board.begin();
  display.begin();
  tft.begin();

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}

  while(1);
}
