#ifndef __LM73_H__
#define __LM73_H__

#include "driver.h"
#include "device.h"
#include "i2c-dev.h"

class LM73 : public Device {
	private:
		enum {
			 s_detect, s_pwr_off, s_read, s_error, s_wait
		} state;
		TickType_t tickcnt, polling_tickcnt;
		double temperature;

	public:
		// constructor
		LM73(int bus_ch, int dev_addr);
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
		double get(void);
};

#endif
