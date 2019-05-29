#include "KB_initBoard.h"

void KB_board::begin(void) {
    pinMode(T4_BUTTON1, INPUT_PULLUP);
    pinMode(T4_BUTTON2, INPUT_PULLUP);
    pinMode(T4_BUTTON3, INPUT_PULLUP);
}

void KB_board::pinWrite(int pin, bool state) {
    digitalWrite(pin, !state);
}

//uint16_t KB_board::pinReadDigital(int pin) {
//    pinReadDigital = digitalRead(pin);
//    return readState;
//}
//
//uint16_t KB_board::pinReadAnalog(int pin) {
//    return analogRead(pin);
//}
