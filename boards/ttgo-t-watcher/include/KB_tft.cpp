#include "KB_tft.h"

void KB_TFT::begin(void) {
    tft.begin();
}

void KB_TFT::printText(int x, int y, String text, int color) {
    tft.setTextColor(color);
    tft.setCursor(x, y);
    tft.print(text);
}

// void KB_TFT::fillScreen(int color) {
//     tft.fillScreen(color);
// }

// void KB_TFT::setRotation(int rotation) {
//     tft.setRotation(rotation);
// }

// void KB_TFT::setTextSize(int size) {
//     tft.setTextSize(size);
// }
