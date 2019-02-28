#include <stdio.h>
#include <string.h>
#include "esp_system.h"
#include "kidbright32.h"
#include "adsws1_ws.h"

#define ESP_INTR_FLAG_DEFAULT 	0

static void IRAM_ATTR adsws1_ws_gpio_isr_handler(void* arg) {
	ADSWS1_WS *adsws1_ws = (ADSWS1_WS *)arg;
    int64_t ts = esp_timer_get_time(); // int64_t = 2^63÷10^6÷(24×60×60)÷365 = 292471.208677536 years

	// wind speed = 2.4 km/h at 1 Hz
	adsws1_ws->wind_speed = (2.4 * 1000000) / (ts - adsws1_ws->last_wind_speed_ts);
	adsws1_ws->last_wind_speed_ts = ts;

	// update tickcnt
	adsws1_ws->tickcnt = adsws1_ws->get_tickcnt();
}

ADSWS1_WS::ADSWS1_WS(int dev_addr) {
	address = dev_addr;
	sensor_gpio = (gpio_num_t)dev_addr;
}

void ADSWS1_WS::init(void) {
	last_wind_speed_ts = 0;
	wind_speed = 0;
	state = s_detect;
}

int ADSWS1_WS::prop_count(void) {
	return 1;
}

bool ADSWS1_WS::prop_name(int index, char *name) {
	if (index == 0) {
		snprintf(name, DEVICE_PROP_NAME_LEN_MAX, "%s", "wind_speed");
		return true;
	}

	// not supported
	return false;
}

bool ADSWS1_WS::prop_unit(int index, char *unit) {
	if (index == 0) {
		snprintf(unit, DEVICE_PROP_UNIT_LEN_MAX, "%s", "km/h");
		return true;
	}

	// not supported
	return false;
}

bool ADSWS1_WS::prop_attr(int index, char *attr) {
	if (index == 0) {
		get_attr_str(attr, PROP_ATTR_READ_FLAG | PROP_ATTR_TYPE_NUMBER_FLAG); // read only, number
		return true;
	}

	// not supported
	return false;
}

bool ADSWS1_WS::prop_read(int index, char *value) {
	if (index == 0) {
		snprintf(value, DEVICE_PROP_VALUE_LEN_MAX, "%f", wind_speed);
		return true;
	}

	// not supported
	return false;
}

bool ADSWS1_WS::prop_write(int index, char *value) {
	// not supported
	return false;
}

void ADSWS1_WS::process(Driver *drv) {
	gpio_config_t io_conf;

	switch (state) {
		case s_detect:
			// disable in1 interrupt
			gpio_intr_disable(sensor_gpio);

			// gpio event init
			io_conf.intr_type = GPIO_INTR_POSEDGE; // rising edge interrupt (GPIO_INTR_DISABLE | GPIO_INTR_POSEDGE | GPIO_INTR_NEGEDGE | GPIO_INTR_ANYEDGE | GPIO_INTR_LOW_LEVEL | GPIO_INTR_HIGH_LEVEL)
			io_conf.mode = GPIO_MODE_INPUT; // set as input mode
			io_conf.pin_bit_mask = (1ULL << sensor_gpio); // pin bit mask
			io_conf.pull_down_en = GPIO_PULLDOWN_DISABLE; // disable pull-down mode
			io_conf.pull_up_en = GPIO_PULLUP_ENABLE; // enable pull-up mode
			gpio_config(&io_conf);

			// install gpio isr service
			gpio_install_isr_service(ESP_INTR_FLAG_DEFAULT);
			// hook isr handler for specific gpio pin
			gpio_isr_handler_add(sensor_gpio, adsws1_ws_gpio_isr_handler, (void *)this);
			// remove isr handler for gpio number
			//gpio_isr_handler_remove(sensor_gpio);

			// update last wind speed timestamp
			last_wind_speed_ts = esp_timer_get_time();
			wind_speed = 0;
			// enable in1 interrupt
			gpio_intr_enable(sensor_gpio);

			// clear error flag
			error = false;
			// set initialized flag
			initialized = true;

			// get current tickcnt
			tickcnt = get_tickcnt();
			// go to read state
			state = s_chk_timeout;
			break;

		case s_chk_timeout:
			if (is_tickcnt_elapsed(tickcnt, 3000)) {
				// no edge detect for a while, reset wind speed
				wind_speed = 0;
				// get current tickcnt
				tickcnt = get_tickcnt();
			}
			break;

		case s_error:
			// set error flag
			error = true;
			// clear initialized flag
			initialized = false;
			// get current tickcnt
			tickcnt = get_tickcnt();
			// goto wait and retry with detect state
			state = s_wait;
			break;

		case s_wait:
			// delay 1000ms before retry detect
			if (is_tickcnt_elapsed(tickcnt, 1000)) {
				state = s_detect;
			}
			break;
	}
}

double ADSWS1_WS::get_wind_speed_km_h(void) {
	double val;

	// atomic read
	gpio_intr_disable(sensor_gpio);
	val = wind_speed;
	gpio_intr_enable(sensor_gpio);

	return val;
}
