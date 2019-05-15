#include <Arduino.h>
#include <vector>
#include <WiFi.h>

${EXTINC}

#include "KB_LDR.h"
#include "KB_LM73.h"
#include "KB_ht16k33.h"

KB_LDR ldr = KB_LDR();
KB_LM73 lm73 = KB_LM73();
KB_8x16Matrix matrix = KB_8x16Matrix();

typedef int Number;
typedef int Boolean;

using namespace std;

${VARIABLE}

${FUNCTION}

void setup()
{
  lm73.begin();
  matrix.displayBegin();

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  ${LOOP_CODE}
  ${LOOP_EXT_CODE}
}
