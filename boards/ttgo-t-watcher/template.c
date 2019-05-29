#include <Arduino.h>
#include <vector>
#include <WiFi.h>

${EXTINC}

#include "KB_initBoard.h"
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

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}

  while(1);
}
