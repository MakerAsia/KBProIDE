#ifndef __MCP7940N_H__
#define __MCP7940N_H__

#include "driver.h"
#include "device.h"
#include "i2c-dev.h"

#define MCP7940N_BUFFER_SIZE				16
#define DATETIME_STR_LEN					31
#define DATE_STR_LEN						15
#define TIME_STR_LEN						15

class MCP7940N : public Device {
	private:
		enum {
		   s_detect, s_read, s_wait, s_write, s_cal, s_cal_coarse, s_error
		} state;
		TickType_t tickcnt, polling_tickcnt;
		uint8_t flag;
		uint8_t read_buffer[MCP7940N_BUFFER_SIZE], write_buffer[MCP7940N_BUFFER_SIZE];
		uint8_t cal_value, cal_coarse_value;
		char datetime_str[DATETIME_STR_LEN + 1], date_str[DATE_STR_LEN + 1], time_str[TIME_STR_LEN + 1];

	public:
		// constructor
		MCP7940N(int bus_ch, int dev_addr);
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
		char *get_datetime(void);
		char *get_datetime_with_second(void);
		char *get_date(void);
		char *get_time(void);
		char *get_time_with_second(void);
		int get(int index);
		void write(char *str);
		bool write_flag(void);
		void cal(int val);
		void cal_coarse(int val);
};

#endif
