#ifndef __SHT31_H__
#define __SHT31_H__

#include "driver.h"
#include "device.h"
#include "i2c-dev.h"

#define SHT31_POLLING_MS					1000

class SHT31 : public Device {
	private:
		enum {
			 s_detect, s_read, s_error, s_wait
		} state;
		TickType_t tickcnt, polling_tickcnt;
		double temperature;
		double humidity;
		uint8_t crc8(const uint8_t *data, int size);

	public:
		// constructor
		SHT31(int bus_ch, int dev_addr);
		// override
		void init(void);
		void process(Driver *drv);
		int prop_count(void);
		bool prop_name(int index, char *name);
		bool prop_unit(int index, char *unit);
		bool prop_attr(int index, char *attr);
		bool prop_read(int index, char *value);
		bool prop_write(int index, char *value);
		// method
		double get_temperature(void);
		double get_humidity(void);
};

#endif
