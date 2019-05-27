#ifndef KB_LM73_h
#define KB_LM73_h

#include <Arduino.h>
#include <Wire.h>

class KB_LM73
{
 public:
  void begin(void);
  float readTemp();

 protected:
  float temp;

 private:
};

#endif /* KB_LM73_h */