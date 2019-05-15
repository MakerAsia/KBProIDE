#include "KB_LDR.h"

void KB_LDR::begin(void) {
    pinMode(LDR_PIN, INPUT_PULLUP);
}

int KB_LDR::getLDR() {
    return analogRead(LDR_PIN);
}

int KB_LDR::getRawLDR() {
    ldr = map(analogRead(LDR_PIN), 0, 500, 100, 0);
    return ldr;
}