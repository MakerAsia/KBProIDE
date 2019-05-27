#ifndef KB_INITBOARD_h
#define KB_INITBOARD_h

#include <Arduino.h>
#include <Wire.h>
#include "pins_arduino.h"

class KB_board
{
 public:
  void begin(void);
  void pinWrite(int pin, bool state);
  uint16_t pinReadDigital(int pin);
  uint16_t pinReadAnalog(int pin);

 protected:
  uint16_t readState;

 private:
};

#endif /* KB_INITBOARD_h */