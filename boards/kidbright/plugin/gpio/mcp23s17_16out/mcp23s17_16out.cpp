#include <stdio.h>
#include <string.h>
#include "esp_system.h"
#include "kidbright32.h"
#include "mcp23s17_16out.h"

// mcp23s17 registers
#define MCP23S17_REG_IODIRA				0x00
#define MCP23S17_REG_IODIRB				0x01
#define MCP23S17_REG_IOCON				0x0a
#define MCP23S17_REG_GPPUA				0x0c
#define MCP23S17_REG_GPPUB				0x0d
#define MCP23S17_REG_GPIOA				0x12
#define MCP23S17_REG_GPIOB				0x13

#define MCP23S17_16OUT_WRITE_FLAG		0x01
#define MCP23S17_16OUT_BUSY_FLAG		0x02

MCP23S17_16OUT::MCP23S17_16OUT(int bus_ch, int dev_addr) {
	channel = bus_ch;
	address = dev_addr;
}

void MCP23S17_16OUT::init(void) {
	flag = 0;
	set_flag = 0;
	clr_flag = 0;
	gpa_value = 0;
	gpb_value = 0;
	state = s_detect;
}

int MCP23S17_16OUT::prop_count(void) {
	// not supported
	return 0;
}

bool MCP23S17_16OUT::prop_name(int index, char *name) {
	// not supported
	return false;
}

bool MCP23S17_16OUT::prop_unit(int index, char *unit) {
	// not supported
	return false;
}

bool MCP23S17_16OUT::prop_attr(int index, char *attr) {
	// not supported
	return false;
}

bool MCP23S17_16OUT::prop_read(int index, char *value) {
	// not supported
	return false;
}

bool MCP23S17_16OUT::prop_write(int index, char *value) {
	// not supported
	return false;
}

void MCP23S17_16OUT::write(uint8_t bit, bool val) {
	if (bit <= 7) {
		gpa_write_value = gpa_value & (~(1 << bit));
		if (val) {
			gpa_write_value |= (1 << bit);
		}

		set_flag = 0x80 | MCP23S17_16OUT_WRITE_FLAG;
		FLAG_SET(flag, MCP23S17_16OUT_BUSY_FLAG);
	}
	else
	if ((bit >= 8) && (bit <= 15)) {
		gpb_write_value = gpb_value & (~(1 << (bit - 8)));
		if (val) {
			gpb_write_value |= (1 << (bit - 8));
		}

		set_flag = 0x80 | MCP23S17_16OUT_WRITE_FLAG;
		FLAG_SET(flag, MCP23S17_16OUT_BUSY_FLAG);
	}
}

void MCP23S17_16OUT::process(Driver *drv) {
	SPIDev *spi = (SPIDev *)drv;
	uint8_t data[4];

	switch (state) {
		case s_detect:
			// detect spi device
			if (spi->detect(channel, address) == ESP_OK) {
				// // enable hardware address
				data[0] = address << 1; // opcode write
				data[1] = MCP23S17_REG_IOCON;
				data[2] = 0x08; // enable HAEN bit
				data[3] = 0x08; // enable HAEN bit
				if (spi->write(channel, address, data, 4) == ESP_OK) {
					// initial gpio
					data[0] = address << 1; // opcode write
					data[1] = MCP23S17_REG_GPIOA;
					data[2] = gpa_value; // GPIOA
					data[3] = gpb_value; // GPIOB
					if (spi->write(channel, address, data, 4) == ESP_OK) {
						// set io direction to output
						data[0] = address << 1; // opcode write
						data[1] = MCP23S17_REG_IODIRA;
						data[2] = 0x00; // IODIRA = 0000 0000 (output)
						data[3] = 0x00; // IODIRB = 0000 0000 (output)
						if (spi->write(channel, address, data, 4) == ESP_OK) {
							// clear error flag
		    				error = false;
							// set initialized flag
							initialized = true;
							state = s_idle;
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
			}
			else {
				state = s_error;
			}
			break;

		case s_write:
			// initial gpio
			data[0] = address << 1; // opcode write
			data[1] = MCP23S17_REG_GPIOA;
			data[2] = gpa_write_value; // GPIOA
			data[3] = gpb_write_value; // GPIOB
			if (spi->write(channel, address, data, 4) == ESP_OK) {
				gpa_value = gpa_write_value;
				gpa_value = gpb_write_value;
				state = s_idle;
			}
			else {
				state = s_error;
			}
			break;

		case s_idle:
			// check set/clr flag
			if (clr_flag & 0x7f) {
				FLAG_CLR(flag, clr_flag);
				clr_flag = 0;
			}
			if (set_flag & 0x7f) {
				FLAG_SET(flag, set_flag);
				set_flag = 0;
			}

			// check pending flag
			if (IS_FLAG_SET(flag, MCP23S17_16OUT_WRITE_FLAG)) {
				FLAG_CLR(flag, MCP23S17_16OUT_WRITE_FLAG);
				state = s_write;
			}
			if (IS_FLAG_SET(flag, MCP23S17_16OUT_BUSY_FLAG)) {
				FLAG_CLR(flag, MCP23S17_16OUT_BUSY_FLAG);
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
