#ifndef __LDR_H__
#define __LDR_H__

#include "driver.h"
#include "device.h"

class LDR : public Device {
	private:
		enum {
		   s_read, s_wait
		} state;
		TickType_t polling_tickcnt;
		int light;

	public:
		// constructor
		LDR(void);
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
		uint8_t get(void);
};

#endif
