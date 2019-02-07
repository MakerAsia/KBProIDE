#ifdef __cplusplus
extern "C" {
#endif

#ifndef kbiot_h
#define kbiot_h

#include "esp_system.h"

typedef enum {
    KBIOT_BUTTON_RELEASED = 0,
    KBIOT_BUTTON_PRESSED = 1,
    KBIOT_BUTTON_CLICKED = 2,
} kbiot_button_state_t;

void kbiot_init(char* kbserial, char *clientid, char *username, char *password);
void kbiot_setValue_int(char *target, int value);
void kbiot_setValue_str(char *target, char *value);
void kbiot_push(char *title, char *message);
void kbiot_writeFeed(char *feedid, char *key, float value);
void kbiot_setValue_float(char *target, float value);
void kbiot_setConfig(char *target, char *data);
void set_B1release();
void set_B2release();
uint8_t get_B1state();
uint8_t get_B2state();
uint8_t get_B1stateClicked();
uint8_t get_B2stateClicked();
// test
bool check_microgear_connected();
#endif

#ifdef __cplusplus
}
#endif
