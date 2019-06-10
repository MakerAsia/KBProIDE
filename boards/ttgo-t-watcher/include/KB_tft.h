#ifndef KB_ILI9341_h
#define KB_ILI9341_h

#include <Arduino.h>
#include "SPI.h"
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

// Color definitions
#define ILI9341_BLACK       0x0000  ///<   0,   0,   0
#define ILI9341_NAVY        0x000F  ///<   0,   0, 123
#define ILI9341_DARKGREEN   0x03E0  ///<   0, 125,   0
#define ILI9341_DARKCYAN    0x03EF  ///<   0, 125, 123
#define ILI9341_MAROON      0x7800  ///< 123,   0,   0
#define ILI9341_PURPLE      0x780F  ///< 123,   0, 123
#define ILI9341_OLIVE       0x7BE0  ///< 123, 125,   0
#define ILI9341_LIGHTGREY   0xC618  ///< 198, 195, 198
#define ILI9341_DARKGREY    0x7BEF  ///< 123, 125, 123
#define ILI9341_BLUE        0x001F  ///<   0,   0, 255
#define ILI9341_GREEN       0x07E0  ///<   0, 255,   0
#define ILI9341_CYAN        0x07FF  ///<   0, 255, 255
#define ILI9341_RED         0xF800  ///< 255,   0,   0
#define ILI9341_MAGENTA     0xF81F  ///< 255,   0, 255
#define ILI9341_YELLOW      0xFFE0  ///< 255, 255,   0
#define ILI9341_WHITE       0xFFFF  ///< 255, 255, 255
#define ILI9341_ORANGE      0xFD20  ///< 255, 165,   0
#define ILI9341_GREENYELLOW 0xAFE5  ///< 173, 255,  41
#define ILI9341_PINK        0xFC18  ///< 255, 130, 198

class KB_TFT
{
 public:
  void begin(void);
  void printText(int x, int y, String text, int color);
//   void setTextSize(int size);
//   void fillScreen(int color);
//   void setRotation(int rotation);

 protected:
  Adafruit_ILI9341 tft = Adafruit_ILI9341(T4_TFT_CS, T4_TFT_DC, T4_TFT_MOSI, T4_TFT_CLK, T4_TFT_RST, T4_TFT_MISO);


 private:
};

#endif /* KB_HT16K33_h */