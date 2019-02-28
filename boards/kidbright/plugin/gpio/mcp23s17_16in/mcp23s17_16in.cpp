#include <stdio.h>
#include <string.h>
#include "esp_system.h"
#include "kidbright32.h"
#include "mcp23s17_16in.h"

// mcp23s17 registers
#define MCP23S17_REG_IODIRA				0x00
#define MCP23S17_REG_IODIRB				0x01
#define MCP23S17_REG_IOCON				0x0a
#define MCP23S17_REG_GPPUA				0x0c
#define MCP23S17_REG_GPPUB				0x0d
#define MCP23S17_REG_GPIOA				0x12
#define MCP23S17_REG_GPIOB				0x13

MCP23S17_16IN::MCP23S17_16IN(int bus_ch, int dev_addr) {
	channel = bus_ch;
	address = dev_addr;
	polling_ms = MCP23S17_16IN_POLLING_MS;
}

void MCP23S17_16IN::init(void) {
	gpa_value = 0;
	gpb_value = 0;
	state = s_detect;
}

int MCP23S17_16IN::prop_count(void) {
	// not supported
	return 0;
}

bool MCP23S17_16IN::prop_name(int index, char *name) {
	// not supported
	return false;
}

bool MCP23S17_16IN::prop_unit(int index, char *unit) {
	// not supported
	return false;
}

bool MCP23S17_16IN::prop_attr(int index, char *attr) {
	// not supported
	return false;
}

bool MCP23S17_16IN::prop_read(int index, char *value) {
	// not supported
	return false;
}

bool MCP23S17_16IN::prop_write(int index, char *value) {
	// not supported
	return false;
}

int MCP23S17_16IN::read(uint8_t bit) {
	if (bit <= 7) {
		return ((gpa_value >> bit) & 0x01);
	}
	else
	if ((bit >= 8) && (bit <= 15)) {
		return ((gpb_value >> (bit - 8)) & 0x01);
	}

	// default value
	return 0;
}

void MCP23S17_16IN::process(Driver *drv) {
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
					// enable pull-up
					data[0] = address << 1; // opcode write
					data[1] = MCP23S17_REG_GPPUA;
					data[2] = 0xff; // GPPUA = 1111 1111 (all pull-up)
					data[3] = 0xff; // GPPUB = 1111 1111 (all pull-up)
					if (spi->write(channel, address, data, 4) == ESP_OK) {
						// set io direction to input
						data[0] = address << 1; // opcode write
						data[1] = MCP23S17_REG_IODIRA;
						data[2] = 0xff; // IODIRA = 1111 1111 (input)
						data[3] = 0xff; // IODIRB = 1111 1111 (input)
						if (spi->write(channel, address, data, 4) == ESP_OK) {
							// clear error flag
		    				error = false;
							state = s_read;
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

		case s_read:
			// init MCP23S17
			data[0] = (address << 1) | 0x01; // opcode read
			data[1] = MCP23S17_REG_GPIOA;
			if (spi->read(channel, address, data, 2, &data[2], 2) == ESP_OK) {
				gpa_value = data[2];
				gpb_value = data[3];
				// set initialized flag
				initialized = true;
				// stamp polling tickcnt
				tickcnt = get_tickcnt();
				state = s_idle;
			}
			else {
				state = s_error;
			}
			break;

		case s_idle:
			// wait polling_ms timeout
			if (is_tickcnt_elapsed(tickcnt, polling_ms)) {
				state = s_read;
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
