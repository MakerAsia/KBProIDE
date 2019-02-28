#include <stdio.h>
#include <string.h>
#include "esp_system.h"
#include "kidbright32.h"
#include "lcd_spi.h"

/*
D0..D7	= GPB0..GPB7
E		= PA5		(0 = disable, 1 = enable)
RW		= PA6		(0 = , 1 = read)
RS		= PA7		(0 = instruction, 1 = data)
BL		= PA1		(0 = off, 1 = on)
*/

// mcp23s17 registers
#define MCP23S17_REG_IODIRA				0x00
#define MCP23S17_REG_IODIRB				0x01
#define MCP23S17_REG_GPIOA				0x12
#define MCP23S17_REG_GPIOB				0x13

#define LCD_SPI_SHOW_FLAG				0x01
#define LCD_SPI_CLEAR_FLAG				0x02
#define LCD_SPI_BACKLIGHT_FLAG			0x04
#define LCD_SPI_BUSY_FLAG				0x08

LCD_SPI::LCD_SPI(int bus_ch, int dev_addr, uint8_t lcd_column, uint8_t lcd_row) {
	channel = bus_ch;
	address = dev_addr;
	column = lcd_column;
	row = lcd_row;
}

void LCD_SPI::init(void) {
	int i;

	// fill space
	for (i = 0; i < sizeof(lcd_temp_buffer); i++) {
		lcd_temp_buffer[i] = 0x20;
	}

	flag = 0;
	set_flag = 0;
	clr_flag = 0;
	backlight_status = 0;
	state = s_detect;
}

int LCD_SPI::prop_count(void) {
	// not supported
	return 0;
}

bool LCD_SPI::prop_name(int index, char *name) {
	// not supported
	return false;
}

bool LCD_SPI::prop_unit(int index, char *unit) {
	// not supported
	return false;
}

bool LCD_SPI::prop_attr(int index, char *attr) {
	// not supported
	return false;
}

bool LCD_SPI::prop_read(int index, char *value) {
	// not supported
	return false;
}

bool LCD_SPI::prop_write(int index, char *value) {
	// not supported
	return false;
}

uint8_t LCD_SPI::backlight_mask(void) {
	if (backlight_status) {
		return 0x02;
	}

	return 0;
}

void LCD_SPI::backlight(int val) {
	if (val) {
		backlight_status = 1;
	}
	else {
		backlight_status = 0;
	}

	set_flag |= (0x80 | LCD_SPI_BACKLIGHT_FLAG);
	FLAG_SET(flag, LCD_SPI_BUSY_FLAG);
}

int LCD_SPI::backlight(void) {
	return backlight_status;
}

void LCD_SPI::clear(void) {
	set_flag |= (0x80 | LCD_SPI_CLEAR_FLAG);
	FLAG_SET(flag, LCD_SPI_BUSY_FLAG);
}

esp_err_t LCD_SPI::lcd_write(SPIDev *spi, bool instruction, uint8_t val) {
	esp_err_t ret;
	uint8_t data[3];

	data[0] = address << 1; // opcode write
	data[1] = MCP23S17_REG_GPIOB;
	data[2] = val;
	ret = spi->write(channel, address, data, 3);
	if (ret == ESP_OK) {
		data[0] = address << 1; // opcode write
		data[1] = MCP23S17_REG_GPIOA;
		data[2] = 0xa0 | backlight_mask(); // RS(PA7) = 1 (data), RW(PA6) = 0, E(PA5) = 1
		if (instruction) {
			data[2] = 0x20; // RS(PA7) = 0 (instruction), RW(PA6) = 0, E(PA5) = 1
		}
		ret = spi->write(channel, address, data, 3);
		if (ret == ESP_OK) {
			data[0] = address << 1; // opcode write
			data[1] = MCP23S17_REG_GPIOA;
			data[2] = 0x00  | backlight_mask() ; // E(PA5) = 0
			ret = spi->write(channel, address, data, 3);
		}
	}

	return ret;
}

void LCD_SPI::process(Driver *drv) {
	SPIDev *spi = (SPIDev *)drv;
	uint8_t data[4];
	int i;
	const uint8_t lcd_init_tab[] = {
		0x38, // 8-bit mode, 2-line
		0x0c, // display on, cursor off, blink off
		0x01 // clear screen
	};
	const uint8_t ddram_addr_tab[] = {
		0x00, // row 0
		0x40, // row 1
		0x14, // row 2
		0x54 // row 3
	};

	switch (state) {
		case s_detect:
			// detect spi device
			if (spi->detect(channel, address) == ESP_OK) {
				// init MCP23S17
				data[0] = address << 1; // opcode write
				data[1] = MCP23S17_REG_GPIOA;
				data[2] = 0x00 | backlight_mask(); // PA = 0000 0000 (PA7=RS, PA6=RW, PA5=E, PA1=BL)
				data[3] = 0xff; // PB = 1111 1111
				if (spi->write(channel, address, data, 4) == ESP_OK) {
					data[0] = address << 1; // opcode write
					data[1] = MCP23S17_REG_IODIRA;
					data[2] = 0x1d; // IODIRA = 0001 1101 (PA1,PA5,PA6,PA7 = output)
					data[3] = 0x00; // IODIRB = 0000 0000 (output)
					if (spi->write(channel, address, data, 4) == ESP_OK) {
						// clear error flag
	    				error = false;
						cmd_index = 0;
						state = s_cmd_init;
					}
					else {
						state = s_error;
					}
				}
				else {
					state = s_error;
				}
			}
			else {
				state = s_error;
			}
			break;

		case s_cmd_init:
			if (lcd_write(spi, true, lcd_init_tab[cmd_index]) == ESP_OK) {
				cmd_index++;
				if (cmd_index >= sizeof(lcd_init_tab)) {
					// set initialized flag
					initialized = true;
					// goto idle state
					state = s_idle;
				}
			}
			else {
				state = s_error;
			}
			break;

		case s_clear:
			if (lcd_write(spi, true, 0x01) == ESP_OK) { // 0x01 = clear screen
				// goto idle state
				state = s_idle;
			}
			else {
				state = s_error;
			}
			break;

		case s_show:
			// lcd address (16x4, 20x4)
			// row #0: 00 01 02 03 04 05 06 07 08 09 0a 0b 0c 0d 0e 0f 10 11 12 13
			// row #1: 40 41 42 43 44 45 46 47 48 49 4a 4b 4c 4d 4e 4f 50 51 52 53
			// row #2: 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f 20 21 22 23 24 25 26 27
			// row #3: 54 55 56 57 58 59 5a 5b 5c 5d 5e 5f 60 61 62 63 64 65 66 67
			//
			// lcd address (40x2)
			// row #0: 00 01 02 03 04 05 06 07 08 09 0a 0b 0c 0d 0e 0f 10 11 12 13 14 15 16 17 18 19 1a 1b 1c 1d 1e 1f 20 21 22 23 24 25 26 27
			// row #1: 40 41 42 43 44 45 46 47 48 49 4a 4b 4c 4d 4e 4f 50 51 52 53 54 55 56 57 58 59 5a 5b 5c 5d 5e 5f 60 61 62 63 64 65 66 67
			//
			// lcd 40x4 not supported (use 2 enable pins)

			if (row_index > sizeof(ddram_addr_tab)) {
				state = s_idle;
			}
			else {
				// set ddram address
				lcd_write(spi, true, 0x80 | ddram_addr_tab[row_index]);
				for (i = 0; i < column; i++) {
					lcd_write(spi, false, lcd_buffer[(row_index * column) + i]);
				}
				// next row index
				row_index++;
				if (row_index >= row) {
					state = s_idle;
				}
			}
			break;

		case s_backlight:
			data[0] = address << 1; // opcode write
			data[1] = MCP23S17_REG_GPIOA;
			data[2] = 0x00 | backlight_mask(); // update backlight status
			if ((spi->write(channel, address, data, 3)) == ESP_OK) {
				state = s_idle;
			}
			else {
				state = s_error;
			}
			break;

		case s_idle:
			// check set/clr flag
			if (clr_flag & 0x7f) {
				FLAG_CLR(flag, clr_flag & 0x7f);
				clr_flag = 0;
			}
			if (set_flag & 0x7f) {
				FLAG_SET(flag, set_flag & 0x7f);
				set_flag = 0;
			}

			// check pending flag
			if (IS_FLAG_SET(flag, LCD_SPI_SHOW_FLAG)) {
				memcpy(&lcd_buffer, &lcd_temp_buffer, sizeof(lcd_buffer));
				FLAG_CLR(flag, LCD_SPI_SHOW_FLAG);
				state = s_show;
			}
			else
			if (IS_FLAG_SET(flag, LCD_SPI_CLEAR_FLAG)) {
				FLAG_CLR(flag, LCD_SPI_CLEAR_FLAG);
				state = s_clear;
			}
			else
			if (IS_FLAG_SET(flag, LCD_SPI_BACKLIGHT_FLAG)) {
				FLAG_CLR(flag, LCD_SPI_BACKLIGHT_FLAG);
				state = s_backlight;
			}
			else
			if (IS_FLAG_SET(flag, LCD_SPI_BUSY_FLAG)) {
				FLAG_CLR(flag, LCD_SPI_BUSY_FLAG);
			}
			break;

		case s_error:
			// set error flag
			error = true;
			// clear initialized flag
			initialized = false;
			// get current tickcnt
			tickcnt = get_tickcnt();
			// goto wait and retry with detect state
			state = s_wait;
			break;

		case s_wait:
			// delay 1000ms before retry detect
			if (is_tickcnt_elapsed(tickcnt, 1000)) {
				state = s_detect;
			}
			break;
	}
}

bool LCD_SPI::valid_column_row(uint8_t lcd_column, uint8_t lcd_row) {
	if ((lcd_column < column) && (lcd_row < row)) {
		return true;
	}

	return false;
}

void LCD_SPI::print(uint8_t lcd_column, uint8_t lcd_row, char *buf) {
	int len;

	// validate column,row
	if (!valid_column_row(lcd_column, lcd_row)) {
		return;
	}

	len = strlen(buf);
	if (len > (column - lcd_column)) {
		len = (column - lcd_column);
	}
	memcpy(&lcd_temp_buffer[(lcd_row * column) + lcd_column], buf, len);

	row_index = 0;
	set_flag |= (0x80 | LCD_SPI_SHOW_FLAG);
	FLAG_SET(flag, LCD_SPI_BUSY_FLAG);
}

void LCD_SPI::print(uint8_t lcd_column, uint8_t lcd_row, double val) {
	char buf[LCD_MAX_COLUMN + 1];
	int i;

	snprintf(buf, LCD_MAX_COLUMN, "%.2f", val); // default precision = 2
	// check ending zero
	i = strlen(buf) - 1;
	while (i >= 0) {
		if (buf[i] == '0') {
			buf[i] = '\x0';
		}
		else
		if (buf[i] == '.') {
			buf[i] = '\x0';
			break;
		}
		else {
			break; // first occurence of non-zero or dot
		}
		i--;
	}

	print(lcd_column, lcd_row, buf);
}

void LCD_SPI::print(uint8_t lcd_column, uint8_t lcd_row, double val, int precision) {
	char fmt[8];
	char buf[LCD_MAX_COLUMN + 1];

	if (precision < 0) {
		strcpy(fmt, "%.0f");
	}
	else
	if (precision > 6) {
		strcpy(fmt, "%.6f");
	}
	else {
		snprintf(fmt, sizeof(fmt) - 1, "%%.%df", precision);
	}

	snprintf(buf, LCD_MAX_COLUMN, fmt, val);
	print(lcd_column, lcd_row, buf);
}
