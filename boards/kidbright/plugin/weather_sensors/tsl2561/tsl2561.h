#ifndef __TSL2561_H__
#define __TSL2561_H__

#include "driver.h"
#include "device.h"
#include "i2c-dev.h"

#define TSL2561_POLLING_MS					1000

class TSL2561 : public Device {
	private:
		enum {
			 s_detect, s_get_lux, s_error, s_wait
		} state;
		TickType_t tickcnt, polling_tickcnt;
		bool first_read;
		double illuminance;
		double calc_lux(unsigned int ch0, unsigned int ch1);

	public:
		// constructor
		TSL2561(int bus_ch, int dev_addr);
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
		double get_illuminance(void);
};

#endif
