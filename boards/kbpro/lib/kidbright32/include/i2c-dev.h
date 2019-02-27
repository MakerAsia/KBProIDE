#ifndef __I2CDEV_H__
#define __I2CDEV_H__

#include "driver/i2c.h"
#include "driver.h"

#define I2C_CMD_TIMEOUT_MS					50

class I2CDev : public Driver {
	private:
		i2c_port_t i2c_num;
		gpio_num_t sda, scl;
		uint32_t frequency;
		esp_err_t ch_sw(int ch, bool on_off);

	public:
		I2CDev(i2c_port_t _i2c_num, gpio_num_t _sda, gpio_num_t _scl, uint32_t _frequency);
		esp_err_t init(void);
		esp_err_t detect(int ch, int addr);
		esp_err_t write(int ch, int addr, uint8_t *data, size_t data_size);
		esp_err_t read(int ch, int addr, uint8_t *pointer, size_t pointer_size, uint8_t *data, size_t data_size);
};

#endif
