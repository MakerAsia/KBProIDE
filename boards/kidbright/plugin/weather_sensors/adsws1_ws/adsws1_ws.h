#ifndef __ADSWS1_WS_H__
#define __ADSWS1_WS_H__

#include "driver.h"
#include "device.h"
#include "driver/gpio.h"

// ads-ws1 anemometer (wind speed)
class ADSWS1_WS : public Device {
	private:
		enum {
			s_detect, s_chk_timeout, s_error, s_wait
		} state;
		gpio_num_t sensor_gpio;

	public:
		TickType_t tickcnt;
		int64_t last_wind_speed_ts;
		float wind_speed;
		// constructor
		ADSWS1_WS(int dev_addr);
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
		double get_wind_speed_km_h(void);
};

#endif
