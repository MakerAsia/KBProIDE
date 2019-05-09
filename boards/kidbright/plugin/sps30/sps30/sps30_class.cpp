#ifndef __SPS30_CLASS_CPP__
#define __SPS30_CLASS_CPP__

#include "sps30_class.h"

void sensirion_i2c_init() { }

int8_t sensirion_i2c_read(uint8_t address, uint8_t* data, uint16_t count) {
    return SPS30_i2c->read(0, address, NULL, 0, (uint8_t*)data, count);
}

int8_t sensirion_i2c_write(uint8_t address, const uint8_t* data, uint16_t count) {
    return SPS30_i2c->write(0, address, (uint8_t*)data, count);
}

void sensirion_sleep_usec(uint32_t useconds) {
	vTaskDelay(((useconds / 1000) + 1) / portTICK_RATE_MS);
}

SPS30::SPS30(int bus_ch, int dev_addr) {
	channel = bus_ch;
	address = dev_addr;
	polling_ms = SPS30_POLLING_MS;
}

void SPS30::init(void) {
	// esp_log_level_set("*", ESP_LOG_INFO);
	
	state = s_detect;
}

int SPS30::prop_count(void) {
	return 0;
}

bool SPS30::prop_name(int index, char *name) {
	// not supported
	return false;
}

bool SPS30::prop_unit(int index, char *unit) {
	// not supported
	return false;
}

bool SPS30::prop_attr(int index, char *attr) {
	// not supported
	return false;
}

bool SPS30::prop_read(int index, char *value) {
	// not supported
	return false;
}

bool SPS30::prop_write(int index, char *value) {
	// not supported
	return false;
}

void SPS30::process(Driver *drv) {
	I2CDev *i2c = (I2CDev *)drv;
	SPS30_i2c = i2c;
	
	switch (state) {
		case s_detect:
			// detect i2c device
			if (i2c->detect(channel, address) == ESP_OK) {
				if (sps30_probe() == 0) {
					if (sps30_start_measurement() == 0) {
						// get current tickcnt
						tickcnt = get_tickcnt();
						
						state = s_read;
					} else {
						ESP_LOGI("SPS30", "Start failed !");
						state = s_error;
					}
				} else {
					ESP_LOGI("SPS30", "probe failed !");
					state = s_error;
				}
			} else {
				state = s_error;
			}
			break;
		
		case s_read:
			// wait polling_ms timeout
			if (is_tickcnt_elapsed(tickcnt, polling_ms)) {
				// get current tickcnt
				tickcnt = get_tickcnt();
				
				uint16_t data_ready;
				if (sps30_read_data_ready(&data_ready) >= 0) {
					if (data_ready) {
						if (sps30_read_measurement(&measurement) >= 0) {
							// clear error flag
							error = false;
							// set initialized flag
							initialized = true;
						} else {
							ESP_LOGI("SPS30", "read measurement failed");
							state = s_error;
						}
					}
				} else {
					ESP_LOGI("SPS30", "error reading data-ready flag");
					state = s_error;
				}
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
			// wait polling_ms timeout
			if (is_tickcnt_elapsed(tickcnt, polling_ms)) {
				state = s_detect;
			}
			break;
	}
}

bool SPS30::isReady() {
	return initialized;
}

double SPS30::read(SPS30_Type type, uint8_t size) {
	float value = 0.0;
	
	if (type == SPS30_MASS) {
		switch(size) {
			case 10:
				value = measurement.mc_1p0;
				break;
			
			case 25:
				value = measurement.mc_2p5;
				break;
				
			case 40:
				value = measurement.mc_4p0;
				break;
				
			case 100:
				value = measurement.mc_10p0;
				break;
				
		}
	} else if (type == SPS30_NUMBER) {
		switch(size) {
			case 5:
				value = measurement.nc_0p5;
				break;
				
			case 10:
				value = measurement.nc_1p0;
				break;
			
			case 25:
				value = measurement.nc_2p5;
				break;
				
			case 40:
				value = measurement.nc_4p0;
				break;
				
			case 100:
				value = measurement.nc_10p0;
				break;
				
		}
	} else if (type == SPS30_TYPICAL) {
		value = measurement.typical_particle_size;
	}
	
	return value;
}

void SPS30::fan(bool isON) {

}

#endif
