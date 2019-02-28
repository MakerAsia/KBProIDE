#include "esp_system.h"
#include "kidbright32.h"
#include "blink.h"

BLINK::BLINK(void) {
	//
}

void BLINK::init(void) {
	gpio_config_t io_conf;

	// outputs init
	io_conf.intr_type = GPIO_INTR_DISABLE; // disable interrupt
	io_conf.mode = GPIO_MODE_OUTPUT; // set as output mode
	io_conf.pin_bit_mask = (1ULL << BT_LED_GPIO); // pin bit mask
	io_conf.pull_down_en = GPIO_PULLDOWN_DISABLE; // disable pull-down mode
	io_conf.pull_up_en = GPIO_PULLUP_DISABLE; // disable pull-up mode
	blink_status = 1;
	gpio_set_level(BT_LED_GPIO, blink_status); // active low
	gpio_config(&io_conf);

	blink_flag = false;
	state = s_detect;
}

int BLINK::prop_count(void) {
	// not supported
	return 0;
}

bool BLINK::prop_name(int index, char *name) {
	// not supported
	return false;
}

bool BLINK::prop_unit(int index, char *unit) {
	// not supported
	return false;
}

bool BLINK::prop_attr(int index, char *attr) {
	// not supported
	return false;
}

bool BLINK::prop_read(int index, char *value) {
	// not supported
	return false;
}

bool BLINK::prop_write(int index, char *value) {
	// not supported
	return false;
}

void BLINK::process(Driver *drv) {
	switch (state) {
		case s_detect:
			// clear error flag
			error = false;
			// set initialized flag
			initialized = true;

			// go to blink state
			state = s_blink;
			break;

		case s_blink:
			if (blink_flag) {
				if (is_tickcnt_elapsed(tickcnt, 500)) {
					blink_status ^= 0x01; // toggle status
					gpio_set_level(BT_LED_GPIO, blink_status);
					// get current tickcnt
					tickcnt = get_tickcnt();
				}
			}
			break;
	}
}

void BLINK::start(void) {
	blink_status = 0;
	gpio_set_level(BT_LED_GPIO, blink_status); // active low
	// get current tickcnt
	tickcnt = get_tickcnt();
	blink_flag = true;
}

void BLINK::stop(void) {
	blink_flag = false;
	blink_status = 1;
	gpio_set_level(BT_LED_GPIO, blink_status); // active low
}
