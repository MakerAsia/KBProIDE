#ifndef __DEVICE_H__
#define __DEVICE_H__

#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver.h"

#define IS_FLAG_SET(x, b)					(x & b)
#define FLAG_SET(x, b)						(x |= b)
#define FLAG_CLR(x, b)						(x &= (~b))

#define DEVICE_NAME_LEN_MAX					15
#define DEVICE_PROP_NAME_LEN_MAX			15
#define DEVICE_PROP_UNIT_LEN_MAX			15
#define DEVICE_PROP_VALUE_LEN_MAX			15

#define DEVICE_ERROR_FLAG					0x01
#define DEVICE_INITIALIZED_FLAG				0x02

#define PROP_ATTR_NOTIFY_FLAG				0x01
#define PROP_ATTR_WRITE_FLAG				0x02
#define PROP_ATTR_READ_FLAG					0x04
#define PROP_ATTR_BIT3_FLAG					0x08
#define PROP_ATTR_TYPE_NUMBER_FLAG			0x10
#define PROP_ATTR_TYPE_STRING_FLAG			0x20
#define PROP_ATTR_BIT6_FLAG					0x40
#define PROP_ATTR_BIT7_FLAG					0x80

class Device {
	public:
		char name[DEVICE_NAME_LEN_MAX + 1] = "";
		int channel = 0;
		int address = -1;
		bool error = false;
		bool initialized = false;
		uint32_t polling_ms;
		// method
		virtual void init(void);
		virtual void process(Driver *drv);
		virtual int prop_count(void);
		virtual bool prop_name(int index, char *name);
		virtual bool prop_unit(int index, char *unit);
		virtual bool prop_attr(int index, char *attr);
		virtual bool prop_read(int index, char *value);
		virtual bool prop_write(int index, char *value);
		bool is_error(void);
		bool is_initialized(void);
		void get_stat_str(char *stat);
		void get_attr_str(char *attr, int flag);
		uint32_t get_polling_ms(void);
		void set_polling_ms(uint32_t ms);
		TickType_t get_tickcnt(void);
		bool is_tickcnt_elapsed(TickType_t tickcnt, uint32_t tickcnt_ms);
};

#endif
