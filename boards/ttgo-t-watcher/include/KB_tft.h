#ifndef KB_ILI9341_h
#define KB_ILI9341_h

#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

#define TFT_CS   27
#define TFT_DC   32
#define TFT_BL   4


class KB_TFT
{
 public:
  void tftBegin(void);
  void printText(int x, int y, String text, int color);
  void setTextSize(int size);
  void fillScreen(int color);
  void setRotation(int rotation);


 protected:
  Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC);


 private:
};

#endif /* KB_HT16K33_h */