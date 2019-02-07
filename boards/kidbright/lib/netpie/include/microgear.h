#ifdef __cplusplus
extern "C" {
#endif

#ifndef microgear_h
#define microgear_h

#include "esp_system.h"
#include "esp_event_loop.h"

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/semphr.h"
#include "freertos/queue.h"
#include "freertos/event_groups.h"

#include "lwip/sockets.h"
#include "lwip/dns.h"
#include "lwip/netdb.h"

#include "esp_log.h"
#include "wificontroller.h"
#include "mqtt_client.h"
#include "util.h"

#define MAXTOPICSIZE 64

typedef enum {
    MICROGEAR_EVENT_ERROR = 0,
    MICROGEAR_EVENT_CONNECTED,
    MICROGEAR_EVENT_DISCONNECTED,
    MICROGEAR_EVENT_SUBSCRIBED,
    MICROGEAR_EVENT_UNSUBSCRIBED,
    MICROGEAR_EVENT_PUBLISHED,
    MICROGEAR_EVENT_DATA,
} microgear_event_id_t;

#define MICROGEAR_EVENT_NUM MICROGEAR_EVENT_DATA+1

typedef struct Microgear Microgear;

typedef struct {
    microgear_event_id_t event_id;
    esp_mqtt_client_handle_t client;
    Microgear *microgear;
    char *data;
    int data_len;
    int total_data_len;
    int current_data_offset;
    char *topic;
    int topic_len;
    int msg_id;
} microgear_event_t;
typedef microgear_event_t* microgear_event_handle_t;

struct Microgear {
    char *rootname;
    esp_mqtt_client_handle_t client;
    esp_mqtt_client_config_t config;
    void (*eventhandler[MICROGEAR_EVENT_NUM])(microgear_event_handle_t);
};

void mqtt_event_handler(esp_mqtt_event_handle_t event);
void microgear_init(Microgear *);
void microgear_connect(Microgear *mg, char *clientid, char *username, char *password);
int microgear_publish(Microgear *mg, char *topic, char *payload, int len, int qos, int retain);
int microgear_exec(Microgear *mg, char *topic, char *payload, int len, int qos, int retain);

void microgear_subscribe(Microgear *mg, char *topic, int qos);
void microgear_unsubscribe(Microgear *mg, char *topic);

void microgear_on(Microgear *mg, microgear_event_id_t event, void (*eventcallback)(microgear_event_handle_t));
void microgear_chroot(Microgear *mg, char *kbserial);

bool microgear_connected(Microgear *mg);

#endif

#ifdef __cplusplus
}
#endif
