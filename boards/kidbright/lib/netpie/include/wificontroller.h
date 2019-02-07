#ifdef __cplusplus
extern "C" {
#endif

#ifndef wificontroller_h
#define wificontroller_h

#include "esp_system.h"
#include "nvs_flash.h"

#include "esp_wifi.h"
#include "esp_event_loop.h"

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/semphr.h"
#include "freertos/queue.h"
#include "freertos/event_groups.h"

#include "driver/gpio.h"

#include "esp_log.h"
#include "util.h"

const static int CONNECTED_BIT = BIT0;

void wifi_sta_start(char *ssid, char *password);

#endif

#ifdef __cplusplus
}
#endif
