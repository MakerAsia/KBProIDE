#ifndef __SPS30_CLASS_H__
#define __SPS30_CLASS_H__

#include "math.h"
#include "driver.h"
#include "device.h"
#include "i2c-dev.h"
#include "esp_log.h"

#include <stdio.h>
#include <string.h>
#include "esp_system.h"
#include "kidbright32.h"

#include "sps30.h"
#include "sensirion_i2c.h"
#include "sensirion_arch_config.h"

#define SPS30_POLLING_MS 100

static I2CDev *SPS30_i2c;

enum SPS30_Type {
	SPS30_MASS, SPS30_NUMBER, SPS30_TYPICAL
};

class SPS30 : public Device {
	private:
		enum {
			s_detect, 
			s_read, 
			s_error, 
			s_wait
		} state;
		TickType_t tickcnt;
		
		struct sps30_measurement measurement;

	public:
		// constructor
		SPS30(int bus_ch, int dev_addr);
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
		bool isReady() ;
		double read(SPS30_Type, uint8_t=0) ;
		void fan(bool) ;
		
};

#endif
