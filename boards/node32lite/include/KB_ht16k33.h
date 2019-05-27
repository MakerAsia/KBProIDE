#ifndef KB_HT16K33_h
#define KB_HT16K33_h

#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include "Adafruit_LEDBackpack.h"

#define MATRIX_ADDR 0x70

class KB_8x16Matrix
{
 public:
  void displayBegin(void);
  void scrollText(String text);
  void scrollTextWhenReady(String text);
  void printText(int x, int y, String text);
  void printNumber(int x, int y, int number);
  void printFloat(int x, int y, float number);


 protected:
  int temp;
  String msg;
  int16_t msg_len;

  Adafruit_8x16minimatrix matrix = Adafruit_8x16minimatrix();


 private:
};

#endif /* KB_HT16K33_h */