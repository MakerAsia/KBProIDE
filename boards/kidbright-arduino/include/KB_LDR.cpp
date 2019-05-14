#include "KB_LDR.h"

void KB_LDR::begin(void) {
    pinMode(LDR_PIN, INPUT_PULLUP);
}

int KB_LDR::getRawLDR() {
    ldr = 0;
    return ldr;
}
