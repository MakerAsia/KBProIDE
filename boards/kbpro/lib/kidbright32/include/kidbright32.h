#ifndef __KIDBRIGHT32_H__
#define __KIDBRIGHT32_H__

#define BT_LED_GPIO						GPIO_NUM_17
#define WIFI_LED_GPIO					GPIO_NUM_2
#define NTP_LED_GPIO					GPIO_NUM_15
#define IOT_LED_GPIO					GPIO_NUM_12
#define LED_ON							0
#define LED_OFF							1

#define USBSW_GPIO						GPIO_NUM_25
#define OUT1_GPIO						GPIO_NUM_26
#define OUT2_GPIO						GPIO_NUM_27
#define IN1_GPIO						GPIO_NUM_32
#define IN2_GPIO						GPIO_NUM_33
#define IN3_GPIO						GPIO_NUM_34
#define IN4_GPIO						GPIO_NUM_35

#define BUTTON1_GPIO					GPIO_NUM_16
#define BUTTON2_GPIO					GPIO_NUM_14

#define SOUND_PWM_GPIO					13
#define SOUND_DUTY_CYCLE_PERCENT_MAX	50

#define DISPLAY_I2CBUS_SPEED			400000
#define DISPLAY_SDA_GPIO				GPIO_NUM_21
#define DISPLAY_SCL_GPIO				GPIO_NUM_22
#define CHAIN_I2CBUS_SPEED				400000
#define CHAIN_SDA_GPIO					GPIO_NUM_4
#define CHAIN_SCL_GPIO					GPIO_NUM_5

#define SPIBUS_SPEED					4000000
#define SPIBUS_MISO_GPIO				GPIO_NUM_19
#define SPIBUS_MOSI_GPIO				GPIO_NUM_23
#define SPIBUS_CLK_GPIO					GPIO_NUM_18
#define SPIBUS_CS_GPIO					GPIO_NUM_0
#define SPIBUS_MODE						0
#define SPIBUS_MAX_TRANSFER_SIZE		2048
#define SPIBUS_QUEUE_SIZE				1

#if CONFIG_FREERTOS_UNICORE
#define KIDBRIGHT_RUNNING_CORE			0
#else
#define KIDBRIGHT_RUNNING_CORE			1
#endif

// =============================================================================
// device manager
// =============================================================================
// xTaskCreatePinnedToCore stack size
// task using ESP_LOG*, should set stack size >= 2048,
// or "CORRUPT HEAP: multi_heap.c" will occur
#define IO_DEV_STACK_SIZE_MIN			2048
#define I2C0_DEV_STACK_SIZE_MIN			2048
#define I2C1_DEV_STACK_SIZE_MIN			8192
#define SPI_DEV_STACK_SIZE_MIN			8192
#define UART_STACK_SIZE_MIN				4096
#define USERAPP_STACK_SIZE_MIN			4096

#ifdef SMALL_TEST
// configMAX_PRIORITIES = 7
#define	IO_DEV_TASK_PRIORITY            6
#define	I2C0_DEV_TASK_PRIORITY			5
#define	I2C1_DEV_TASK_PRIORITY			5
#define	SPI_DEV_TASK_PRIORITY			5
#define	UART_TASK_PRIORITY				4
#define	USERAPP_TASK_PRIORITY			2
#else
// configMAX_PRIORITIES = 25 (default)
#define	IO_DEV_TASK_PRIORITY            22
#define	I2C0_DEV_TASK_PRIORITY			20
#define	I2C1_DEV_TASK_PRIORITY			20
#define	SPI_DEV_TASK_PRIORITY			20
#define	UART_TASK_PRIORITY				18
#define	USERAPP_TASK_PRIORITY			8
#endif

#define MAX_IO_DEVICE					31
#define MAX_I2C0_DEVICE					15
#define MAX_I2C1_DEVICE					31
#define MAX_SPI_DEVICE					31
#define IO_TASK_IDLE_MS					40
#define I2C0_TASK_IDLE_MS				20
#define I2C1_TASK_IDLE_MS				40
#define SPI_TASK_IDLE_MS				20

/*
#define STR(x)							#x
#define XSTR(x)							STR(x)
#pragma message "configMAX_PRIORITIES = " XSTR(configMAX_PRIORITIES)
#pragma message "IODEV_TASK_PRIORITY = " XSTR(IODEV_TASK_PRIORITY)
#pragma message "I2CDEV_TASK_PRIORITY = " XSTR(I2CDEV_TASK_PRIORITY)
#pragma message "USERAPP_TASK_PRIORITY = " XSTR(USERAPP_TASK_PRIORITY)
#pragma message "KIDBRIGHT_RUNNING_CORE = " XSTR(KIDBRIGHT_RUNNING_CORE)
*/

//#define DEVICE_DATA_STRING_SIZE		32
// 100 = 2 decimal digits
#define DEVICE_DATA_PREC_COEF			100

#define LDR_POLLING_MS					500
#define LM73_POLLING_MS					500
#define MCP7940N_POLLING_MS				240
#define SENSOR_HUB_POLLING_MS			240
#define SWLED_POLLING_MS				40
#define RELAY_POLLING_MS				240
#define PCA9632_POLLING_MS				240
#define PCA9685_POLLING_MS				240
#define PCA9548_POLLING_MS				240

#define HT16K33_ONBOARD_ADDR			0x70
#define LM73_0_ONBOARD_ADDR				0x49
#define LM73_1_ONBOARD_ADDR				0x4d
#define MCP7940N_ONBOARD_ADDR			0x6f

#define MCP7940N_DEFAULT_DATETIME       "18043001000000"

#define MAX_UART_LINE_CHAR_COUNT		64
#define MAX_UART_SPLIT_COUNT			4

void StrSplit(char *cmd, char list[][MAX_UART_LINE_CHAR_COUNT], int *cnt, int max_split_cnt);

#endif
