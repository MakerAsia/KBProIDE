#ifndef KB_MUSIC_h
#define KB_MUSIC_h

#include <Arduino.h>
#include "pins_arduino.h"

class KB_music
{
 public:
  void begin(void);
  void note(uint32_t keynote, uint16_t duration);
  void rest(int delay);
  void stop(void);

 protected:
  uint16_t channel;
  uint16_t bit;

 private:
};

#endif /* KB_LDR_h */
