#ifndef __HT16K33_H__
#define __HT16K33_H__

#include "driver.h"
#include "device.h"
#include "i2c-dev.h"

#define SCROLLING_STRING_LEN			31
#define LED16x8_MAX_CHARS				2

class HT16K33 : public Device {
	private:
		enum {
			s_detect, s_clrscr, s_cmd_init, s_show, s_scrolling_init, s_scrolling, s_idle, s_error, s_wait
		} state;
		TickType_t tickcnt;
		uint8_t buffer[16], temp_buffer[16];
		uint8_t scrolling_buffer[16];
		char scrolling_string[SCROLLING_STRING_LEN + 1], scrolling_temp_string[SCROLLING_STRING_LEN + 1];;
		uint8_t curr_char_index, start_strip_index, display_width, font_width, curr_heading_width, cmd_index;
		uint8_t flag, set_flag, clr_flag;

	public:
		// constructor
		HT16K33(int bus_ch, int dev_addr);
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
		int busy(void);
		int idle(void);
		void wait_idle(void);
		void show(uint8_t *buf);
		void scroll(char *buf, bool scroll_flag);
		void scroll(int val, bool scroll_flag);
		void scroll(double val, bool scroll_flag);
		void scroll(double val, bool scroll_flag, int precision);
};

#endif
