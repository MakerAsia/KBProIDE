#include <Arduino.h>

#define LDR_PIN 36

class KB_LDR
{
 public:
  void begin(void);
  int getRawLDR();
  int getLDR();

 protected:
  int ldr;

 private:
};
