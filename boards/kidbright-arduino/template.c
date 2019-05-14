#include <Arduino.h>
#include <vector>
#include <WiFi.h>

${EXTINC}

#include "KB_LM73.h"
KB_LM73 lm73 = KB_LM73();

#include "KB_ht16k33.h"
KB_8x16Matrix matrix = KB_8x16Matrix();

typedef int Number;
typedef int Boolean;

using namespace std;

${VARIABLE}

${FUNCTION}

void setup()
{
  Serial.begin(115200);

  lm73.begin();

  matrix.displayBegin();

  ${SETUP_CODE}
  ${BLOCKSETUP}
}
void loop()
{
  //Serial.print("temp: ");
  //Serial.println(lm73.readTemp());
  //matrix.printNumber(0, 0, lm73.readTemp());
  //delay(100);

  ${LOOP_CODE}
  ${LOOP_EXT_CODE}

}
