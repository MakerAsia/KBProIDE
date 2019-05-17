#ifndef KB_LDR_h
#define KB_LDR_h

#include <Arduino.h>

#define LDR_PIN 36

class KB_LDR
{
 public:
  void begin(void);
  uint16_t mapLDR();
  uint16_t getLDR();

 protected:
  uint16_t ldr;

 private:
};

#endif /* KB_LDR_h */
