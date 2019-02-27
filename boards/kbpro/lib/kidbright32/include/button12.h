#ifndef __BUTTON12_H__
#define __BUTTON12_H__

#include "driver.h"
#include "device.h"

class BUTTON12 : public Device {
	private:
		enum {
   	 		s_get, s_check
   	 	} state;
		 int value;
		 int temp_value;

	public:
		// constructor
		BUTTON12();
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
		int sw1_get(void);
		int sw2_get(void);
		void wait_sw1_pressed(void);
		void wait_sw1_released(void);
		void wait_sw2_pressed(void);
		void wait_sw2_released(void);
		int is_sw1_pressed(void);
		int is_sw1_released(void);
		int is_sw2_pressed(void);
		int is_sw2_released(void);
		int key_pressed(void);
		int key_released(void);
};

#endif
