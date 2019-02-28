#include <stdio.h>
#include <string.h>
#include <math.h>
#include "esp_system.h"
#include "kidbright32.h"
#include "tsl2561.h"

TSL2561::TSL2561(int bus_ch, int dev_addr) {
	channel = bus_ch;
	address = dev_addr;
	polling_ms = TSL2561_POLLING_MS;
}

void TSL2561::init(void) {
	first_read = true;
	illuminance = 0;
	state = s_detect;
}

int TSL2561::prop_count(void) {
	return 1;
}

bool TSL2561::prop_name(int index, char *name) {
	if (index == 0) {
		snprintf(name, DEVICE_PROP_NAME_LEN_MAX, "%s", "illuminance");
		return true;
	}

	// not supported
	return false;
}

bool TSL2561::prop_unit(int index, char *unit) {
	if (index == 0) {
		snprintf(unit, DEVICE_PROP_UNIT_LEN_MAX, "%s", "lux");
		return true;
	}

	// not supported
	return false;
}

bool TSL2561::prop_attr(int index, char *attr) {
	if (index == 0) {
		get_attr_str(attr, PROP_ATTR_READ_FLAG | PROP_ATTR_TYPE_NUMBER_FLAG); // read only, number
		return true;
	}

	// not supported
	return false;
}

bool TSL2561::prop_read(int index, char *value) {
	if (index == 0) {
		snprintf(value, DEVICE_PROP_VALUE_LEN_MAX, "%f", illuminance);
		return true;
	}

	// not supported
	return false;
}

bool TSL2561::prop_write(int index, char *value) {
	// not supported
	return false;
}

double TSL2561::calc_lux(unsigned int ch0, unsigned int ch1) {
	double ratio, d0, d1;

	// ignore calc, if sensor saturated
	if ((ch0 == 0xffff) || (ch1 == 0xffff)) {
		return 0.0;
	}

	// unsigned integer to floating point
	d0 = ch0;
	d1 = ch1;
	// calc d1/d0 ratio
	ratio = d1 / d0;

	// gain normalize
	d0 *= 16;
	d1 *= 16;

	if (ratio < 0.5) {
		return 0.0304 * d0 - 0.062 * d0 * pow(ratio, 1.4);
	}

	if (ratio < 0.61) {
		return 0.0224 * d0 - 0.031 * d1;
	}

	if (ratio < 0.80) {
		return 0.0128 * d0 - 0.0153 * d1;
	}

	if (ratio < 1.30) {
		return 0.00146 * d0 - 0.00112 * d1;
	}

	// if (ratio > 1.30)
	return 0.0;
}

void TSL2561::process(Driver *drv) {
	I2CDev *i2c = (I2CDev *)drv;
	uint8_t byte, data[4];

	switch (state) {
		case s_detect:
			// stamp polling tickcnt
			polling_tickcnt = get_tickcnt();
			// detect i2c device
			if (i2c->detect(channel, address) == ESP_OK) {
				// set gain to 1x, interation time to 402ms
				data[0] = 0x81;
				data[1] = 0x02;
				if (i2c->write(channel, address, data, 2) == ESP_OK) {
					// power up
					data[0] = 0x80;
					data[1] = 0x03;
					if (i2c->write(channel, address, data, 2) == ESP_OK) {
						// clear error flag
						error = false;
						// get current tickcnt
						tickcnt = get_tickcnt();
						state = s_get_lux;
					}
					else {
						state = s_error;
					}
				}
				else {
					state = s_error;
				}
			}
			else {
				state = s_error;
			}
			break;

		case s_get_lux:
			// delay > 400ms
			if (is_tickcnt_elapsed(tickcnt, 500) || (!first_read)) {
				// clear first read flag
				first_read = false;

				// get channel1
				byte = 0xae;
				if (i2c->read(channel, address, &byte, 1, &data[2], 2) == ESP_OK) {
					// get channel0
					byte = 0xac;
					if (i2c->read(channel, address, &byte, 1, data, 2) == ESP_OK) {
						// calc illuminance in lux
						illuminance = calc_lux(data[0] | (data[1] << 8), data[2] | (data[3] << 8));
						// set initialized flag
						initialized = true;

						// load polling tickcnt
						tickcnt = polling_tickcnt;
						// goto wait and retry with detect state
						state = s_wait;
					}
					else {
						state = s_error;
					}
				}
				else {
					state = s_error;
				}
			}
			break;

		case s_error:
			// set error flag
			error = true;
			// clear initialized flag
			initialized = false;
			// set first read flag
			first_read = true;
			// get current tickcnt
			tickcnt = get_tickcnt();
			// goto wait and retry with detect state
			state = s_wait;
			break;

		case s_wait:
			// wait polling_ms timeout
			if (is_tickcnt_elapsed(tickcnt, polling_ms)) {
				state = s_detect;
			}
			break;
	}
}

double TSL2561::get_illuminance(void) {
	return illuminance;
}
