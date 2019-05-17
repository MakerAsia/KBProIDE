#ifndef __SOUND_H__
#define __SOUND_H__

#include "driver/mcpwm.h"
#include "driver.h"
#include "device.h"

class SOUND : public Device {
	private:
		mcpwm_config_t pwm_config;
   	 	uint32_t bpm;
		uint32_t duty_cycle;
		uint32_t volume;

	public:
		// constructor
		SOUND();
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
		void on(uint32_t freq, uint8_t duty_in_percent);
		void off(void);
		void note(uint8_t note);
		void rest(uint8_t duration);
		uint32_t get_bpm(void);
		void set_bpm(uint32_t val);
		uint8_t get_volume(void);
		void set_volume(uint32_t val);
};

#endif
