#ifndef __MCP23S17_16IN_H__
#define __MCP23S17_16IN_H__

#include "driver.h"
#include "device.h"
#include "spi-dev.h"

#define MCP23S17_16IN_POLLING_MS					100

class MCP23S17_16IN : public Device {
	private:
		enum {
			s_detect, s_read, s_idle, s_error, s_wait
		} state;
		TickType_t tickcnt;
		uint8_t gpa_value, gpb_value;

	public:
		// constructor
		MCP23S17_16IN(int bus_ch, int dev_addr);
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
		int read(uint8_t bit);
};

#endif
