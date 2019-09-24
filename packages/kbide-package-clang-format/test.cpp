#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <Wire.h>
#include "SPI.h"
#include "Adafruit_GFX.h"
#include "Adafruit_LEDBackpack.h"



    #include "KB_initBoard.h"
    #include "KB_music.h"
    #include "KB_LDR.h"
    #include "KB_LM73.h"
    #include "KB_ht16k33.h"

KB_board board = KB_board();
KB_music music = KB_music();
KB_LDR ldr = KB_LDR();
KB_LM73 lm73 = KB_LM73();
KB_8x16Matrix matrix = KB_8x16Matrix();

  typedef int Number;
typedef int Boolean;
using namespace std;

int i;




void setup()
{
      board.begin();
  music.begin();
  lm73.begin();
  matrix.displayBegin();

  
  while (((int)digitalRead(KB_BUTTON1))) {
  }
  for (i = 1; i <= 120; i++) {
    matrix.printText(0, 0, String(i));
    delay(1000);
  }
        music.tone(349,1000);
  delay(500);
    music.tone(349,1000);
  delay(500);
  music.tone(349,1000);
  for (i = 1; i <= 60; i++) {
    matrix.printText(0, 0, String(i));
    delay(1000);
  }}
void loop()
{
    music.tone(349,1000);
  delay(500);

  
}
void test()
{
  
}