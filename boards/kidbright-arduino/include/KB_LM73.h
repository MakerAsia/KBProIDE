#include <Arduino.h>
#include <Wire.h>

class KB_LM73
{
 public:
  void begin(void);
  String readTemp();

 protected:
  int temp;

 private:
};
