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
