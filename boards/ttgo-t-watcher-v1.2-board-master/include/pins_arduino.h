#ifndef Pins_Arduino_h
#define Pins_Arduino_h

#include <stdint.h>

#define EXTERNAL_NUM_INTERRUPTS 16
#define NUM_DIGITAL_PINS        40
#define NUM_ANALOG_INPUTS       16

#define analogInputToDigitalPin(p)  (((p)<20)?(esp32_adc2gpio[(p)]):-1)
#define digitalPinToInterrupt(p)    (((p)<40)?(p):-1)
#define digitalPinHasPWM(p)         (p < 34)

static const uint8_t TXD0 = 1;
static const uint8_t RXD0 = 3;

static const uint8_t T4_TFT_CLK = 18;
static const uint8_t T4_TFT_RST = 5;
static const uint8_t T4_TFT_MOSI = 23;
static const uint8_t T4_TFT_MISO = 12;
static const uint8_t T4_TFT_CS = 27;
static const uint8_t T4_TFT_DC = 26;
static const uint8_t T4_TFT_BL = 4;

static const uint8_t T4_SD_CLK = 14;
static const uint8_t T4_SD_MOSI = 15;
static const uint8_t T4_SD_MISO = 2;
static const uint8_t T4_SD_CS = 13;

static const uint8_t T4_BUTTON1 = 38;
static const uint8_t T4_BUTTON2 = 37;
static const uint8_t T4_BUTTON3 = 39;

static const uint8_t T4_SDA0 = 21;
static const uint8_t T4_SCL0 = 22;

static const uint8_t T4_GPIO35 = 35;
static const uint8_t T4_GPIO34= 34;
static const uint8_t T4_GPIO33 = 33;
static const uint8_t T4_GPIO25= 25;
static const uint8_t T4_GPIO19= 19;
static const uint8_t T4_GPIO4= 4;
static const uint8_t T4_GPIO0= 0;


#endif /* Pins_Arduino_h */
