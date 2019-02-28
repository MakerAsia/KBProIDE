#ifndef __MCP23S17_16OUT_H__
#define __MCP23S17_16OUT_H__

#include "driver.h"
#include "device.h"
#include "spi-dev.h"

class MCP23S17_16OUT : public Device {
	private:
		enum {
			s_detect, s_write, s_idle, s_error, s_wait
		} state;
		TickType_t tickcnt;
		uint8_t gpa_value, gpb_value;
		uint8_t gpa_write_value, gpb_write_value;
		uint8_t flag, set_flag, clr_flag;

	public:
		// constructor
		MCP23S17_16OUT(int bus_ch, int dev_addr);
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
		void write(uint8_t bit, bool val);
};

#endif
