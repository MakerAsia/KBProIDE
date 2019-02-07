#ifndef __DRIVER_H__
#define __DRIVER_H__

#include "esp_system.h"

class Driver {
	public:
		virtual esp_err_t init(void);
		virtual esp_err_t detect(int ch, int addr);
		virtual esp_err_t write(int ch, int addr, uint8_t *data, size_t data_size);
		virtual esp_err_t read(int ch, int addr, uint8_t *pointer, size_t pointer_size, uint8_t *data, size_t data_size);
};

#endif
