#include "KB_ht16k33.h"


void KB_8x16Matrix::displayBegin(void) {
    Wire.begin();
    matrix.begin(MATRIX_ADDR);
    matrix.setTextColor(LED_ON);
    matrix.setTextSize(1);
    matrix.setRotation(1);
    matrix.setTextWrap(false);
}


void KB_8x16Matrix::scrollText(String text) {
  String msg = text;
  msg_len = (-1 * (msg.length() * 6));
  for (int16_t x = 16; x >= msg_len; x--) {
     matrix.clear();
     matrix.setCursor(x, 0);
     matrix.print(msg);
     matrix.writeDisplay();
     delay(50);
  }
}

void KB_8x16Matrix::printText(int x, int y, String text) {
    matrix.clear();
    matrix.setCursor(x, y);
    matrix.print(text);
    matrix.writeDisplay();
}

void KB_8x16Matrix::printNumber(int x, int y, int number) {
    matrix.clear();
    matrix.setCursor(x, y);
    matrix.print(String(number));
    matrix.writeDisplay();
}

void KB_8x16Matrix::printFloat(int x, int y, float number) {
    matrix.clear();
    matrix.setCursor(x, y);
    matrix.print(String(number));
    matrix.writeDisplay();
}

