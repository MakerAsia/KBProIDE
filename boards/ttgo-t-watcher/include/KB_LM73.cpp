#include "KB_LM73.h"
#include <Wire.h>

void KB_LM73::begin(void) {

    Wire1.begin(4, 5);
}

float KB_LM73::readTemp() {
    Wire1.beginTransmission(0x4D);
    Wire1.write(0x00);
    Wire1.endTransmission();

    uint8_t count = Wire1.requestFrom(0x4D, 2);
    temp = 0.0;
    if (count == 2) {
      int buff[2];
      buff[0] = Wire1.read();
      buff[1] = Wire1.read();
      temp += (int)(buff[0] << 1);
      if (buff[1] & 0b10000000) temp += 1.0;
      if (buff[1] & 0b01000000) temp += 0.5;
      if (buff[1] & 0b00100000) temp += 0.25;
      if (buff[0] & 0b10000000) temp *= -1.0;
    }
    return temp;
}
