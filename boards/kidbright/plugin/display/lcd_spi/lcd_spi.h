#ifndef __LCD_SPI_H__
#define __LCD_SPI_H__

#include "driver.h"
#include "device.h"
#include "spi-dev.h"

#define LCD_MAX_COLUMN			20
#define LCD_MAX_ROW				4

class LCD_SPI : public Device {
	private:
		enum {
			s_detect, s_cmd_init, s_clear, s_show, s_backlight, s_idle, s_error, s_wait
		} state;
		TickType_t tickcnt;
		uint8_t column, row, backlight_status;
		uint8_t lcd_buffer[LCD_MAX_COLUMN * LCD_MAX_ROW], lcd_temp_buffer[LCD_MAX_COLUMN * LCD_MAX_ROW];
		uint8_t cmd_index, row_index;
		uint8_t flag, set_flag, clr_flag;
		uint8_t backlight_mask(void);
		bool valid_column_row(uint8_t lcd_column, uint8_t lcd_row);
		esp_err_t lcd_write(SPIDev *spi, bool instruction, uint8_t val);

	public:
		// constructor
		LCD_SPI(int bus_ch, int dev_addr, uint8_t lcd_column, uint8_t lcd_row);
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
		int backlight(void); // get backlight status
		void backlight(int val); // set backlight status
		void clear(void);
		void print(uint8_t lcd_column, uint8_t lcd_row, char *buf);
		void print(uint8_t lcd_column, uint8_t lcd_row, double val);
		void print(uint8_t lcd_column, uint8_t lcd_row, double val, int precision);
};

#endif
