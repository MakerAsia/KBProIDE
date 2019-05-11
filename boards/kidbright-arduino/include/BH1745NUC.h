/**************************************************************************/
/*
        Distributed with a free-will license.
        Use it any way you want, profit or free, provided it fits in the licenses of its associated works.
        BH1745NUC
        This code is designed to work with the BH1745NUC_I2CS I2C Mini Module available from ControlEverything.com.
        https://www.controleverything.com/content/Color?sku=BH1745NUC_I2CS#tabs-0-product_tabset-2
*/
/**************************************************************************/

#if ARDUINO >= 100
#include "Arduino.h"
#else
#include "WProgram.h"
#endif

#include <Wire.h>

/**************************************************************************
    I2C ADDRESS/BITS
**************************************************************************/
    #define BH1745NUC_DEFAULT_ADDRESS                       (0x38)    // ADDR =’L’: “0111000”
    #define BH1745NUC_ADDRESS_HIGH                          (0x39)    // ADDR =’H’: “0111001”

/**************************************************************************
    CONVERSION DELAY (in mS)
**************************************************************************/
    #define BH1745NUC_CONVERSIONDELAY                       (100)

/**************************************************************************
    COMMAND SET
**************************************************************************/
    #define BH1745NUC_CMD_SYSTEM_CONTROL                    (0x40)      // System control
    #define BH1745NUC_CMD_MODE_CONTROL1                     (0x41)      // Function setting
    #define BH1745NUC_CMD_MODE_CONTROL2                     (0x42)      // Function setting
    #define BH1745NUC_CMD_MODE_CONTROL3                     (0x44)      // Function setting
    #define BH1745NUC_CMD_RED_DATA_LSB                      (0x50)      // Low byte of RED
    #define BH1745NUC_CMD_RED_DATA_MSB                      (0x51)      // High byte of RED
    #define BH1745NUC_CMD_GREEN_DATA_LSB                    (0x52)      // Low byte of GREEN
    #define BH1745NUC_CMD_GREEN_DATA_MSB                    (0x53)      // High byte of GREEN
    #define BH1745NUC_CMD_BLUE_DATA_LSB                     (0x54)      // Low byte of BLUE
    #define BH1745NUC_CMD_BLUE_DATA_MSB                     (0x55)      // High byte of BLUE
    #define BH1745NUC_CMD_CLEAR_DATA_LSB                    (0x56)      // Low byte of CLEAR
    #define BH1745NUC_CMD_CLEAR_DATA_MSB                    (0x57)      // High byte of CLEAR
    #define BH1745NUC_CMD_DINT_DATA_LSB                     (0x58)      // Low byte of Internal Data
    #define BH1745NUC_CMD_DINT_DATA_MSB                     (0x59)      // High byte of Internal Data
    #define BH1745NUC_CMD_INTERRUPT                         (0x60)      // Interrupt setting
    #define BH1745NUC_CMD_PERSISTENCE                       (0x61)      // Persistence setting
    #define BH1745NUC_CMD_THRESHOLD_HI_LSB                  (0x62)      // Higher threshold low byte
    #define BH1745NUC_CMD_THRESHOLD_HI_MSB                  (0x63)      // Higher threshold high byte
    #define BH1745NUC_CMD_THRESHOLD_LO_LSB                  (0x64)      // Lower threshold low byte
    #define BH1745NUC_CMD_THRESHOLD_LO_MSB                  (0x65)      // Lower threshold high byte
    #define BH1745NUC_CMD_MANUFACTURER_ID                   (0x92)      // Manufacturer ID

/**************************************************************************
    SYSTEM_CONTROL REGISTER
**************************************************************************/
    #define BH1745NUC_SYS_CNTR_SW_RESET_MASK                (0x80)      // SW reset
    #define BH1745NUC_SYS_CNTR_SW_RESET_NOT_START           (0x00)      // Initial reset is not started
    #define BH1745NUC_SYS_CNTR_SW_RESET_START               (0x80)      // Initial reset is started

    #define BH1745NUC_SYS_CNTR_INT_RESET_MASK               (0x40)      // INTERRUPT reset
    #define BH1745NUC_SYS_CNTR_INT_RESET_NOT_INTIAL         (0x00)      // INTERRUPT pin status is not initialized.
    #define BH1745NUC_SYS_CNTR_INT_RESET_INACTIVE           (0x40)      // INTERRUPT pin become inactive (high impedance)

/**************************************************************************
    MODE CONTROL 1 REGISTER
**************************************************************************/
    #define BH1745NUC_MODE_CNTR1_MEAS_TIME_MASK             (0x07)      // RGBC Measurement time. RGBC each data are updated by the following time
    #define BH1745NUC_MODE_CNTR1_MEAS_TIME_160              (0x00)      // 000 : 160 msec
    #define BH1745NUC_MODE_CNTR1_MEAS_TIME_320              (0x01)      // 001 : 320 msec
    #define BH1745NUC_MODE_CNTR1_MEAS_TIME_640              (0x02)      // 010 : 640 msec
    #define BH1745NUC_MODE_CNTR1_MEAS_TIME_1280             (0x03)      // 011 : 1280 msec
    #define BH1745NUC_MODE_CNTR1_MEAS_TIME_2560             (0x04)      // 100 : 2560 msec
    #define BH1745NUC_MODE_CNTR1_MEAS_TIME_5120             (0x05)      // 101 : 5120 msec

/**************************************************************************
    MODE CONTROL 2 REGISTER
**************************************************************************/
    #define BH1745NUC_MODE_CNTR2_RGBC_VALID_MASK            (0x80)      // RGBC Data Update Status
    #define BH1745NUC_MODE_CNTR2_RGBC_VALID_NOT_UPDATE      (0x00)      // RGBC data is not updated after last writing MODE_CONTROL1,2 register or last reading MODE_CONTROL2 register
    #define BH1745NUC_MODE_CNTR2_RGBC_VALID_UPDATE          (0x80)      // RGBC data is updated after last writing MODE_CONTROL1,2 register or last reading MODE_CONTROL2 register

    #define BH1745NUC_MODE_CNTR2_RGBC_EN_MASK               (0x10)      // RGBC Measurement Status
    #define BH1745NUC_MODE_CNTR2_RGBC_EN_INACTIVE           (0x00)      // RGBC measurement is inactive and becomes power down
    #define BH1745NUC_MODE_CNTR2_RGBC_EN_ACTIVE             (0x10)      // RGBC measurement is active

    #define BH1745NUC_MODE_CNTR2_ADC_GAIN_MASK              (0x03)      // GAIN setting for RGBC measurement
    #define BH1745NUC_MODE_CNTR2_ADC_GAIN_1X                (0x00)      // 00 : 1X
    #define BH1745NUC_MODE_CNTR2_ADC_GAIN_2X                (0x01)      // 01 : 2X
    #define BH1745NUC_MODE_CNTR2_ADC_GAIN_16X               (0x02)      // 10 : 16X

/**************************************************************************
    INTERRUPT REGISTER
**************************************************************************/
    #define BH1745NUC_INTR_INT_STATUS_MASK                  (0x80)      // INTERRUPT STATUS of RGBC
    #define BH1745NUC_INTR_INT_STATUS_INACTIVE              (0x00)      // Interrupt signal is inactive
    #define BH1745NUC_INTR_INT_STATUS_ACTIVE                (0x80)      // Interrupt signal is active

    #define BH1745NUC_INTR_INT_LATCH_MASK                   (0x10)      // INTERRUPT STATUS of RGBC
    #define BH1745NUC_INTR_INT_LATCH_LATCHED                (0x00)      // INTERRUPT pin is latched until INTERRUPT register is read or initialized
    #define BH1745NUC_INTR_INT_LATCH_UPDATED                (0x10)      // INTERRUPT pin is updated after each measurement

    #define BH1745NUC_INTR_INT_SOURCE_MASK                  (0x0C)      // INTERRUPT source select
    #define BH1745NUC_INTR_INT_SOURCE_RED                   (0x00)      // 00 : Red channel
    #define BH1745NUC_INTR_INT_SOURCE_GREEN                 (0x04)      // 00 : Green channel
    #define BH1745NUC_INTR_INT_SOURCE_BLUE                  (0x08)      // 00 : Blue channel
    #define BH1745NUC_INTR_INT_SOURCE_CLEAR                 (0x0C)      // 00 : Clear channel

    #define BH1745NUC_INTR_INT_ENABLE_MASK                  (0x01)      // INTERRUPT Enable
    #define BH1745NUC_INTR_INT_ENABLE_DISABLE               (0x00)      // INTERRUPT pin disable
    #define BH1745NUC_INTR_INT_ENABLE_ENABLE                (0x01)      // INTERRUPT pin enable

/**************************************************************************
    PERSISTENCE REGISTER
**************************************************************************/
    #define BH1745NUC_PERSISTENCE_MASK                      (0x03)      // Interrupt persistence function
    #define BH1745NUC_PERSISTENCE_TOGGLED_EACH              (0x00)      // 00 : Interrupt status is toggled at each measurement end
    #define BH1745NUC_PERSISTENCE_UPDATED_EACH              (0x01)      // 01 : Interrupt status is updated at each measurement end
    #define BH1745NUC_PERSISTENCE_UPDATED_4                 (0x02)      // 10 : Interrupt status is updated if 4 consecutive threshold judgments are the same
    #define BH1745NUC_PERSISTENCE_UPDATED_8                 (0x03)      // 10 : Interrupt status is updated if 4 consecutive threshold judgments are the same


typedef enum
{
    SW_RESET_NOT_START              = BH1745NUC_SYS_CNTR_SW_RESET_NOT_START,
    SW_RESET_START                  = BH1745NUC_SYS_CNTR_SW_RESET_START

} bhSWReset_t;

typedef enum
{
    INT_RESET_NOT_INTIAL            = BH1745NUC_SYS_CNTR_INT_RESET_NOT_INTIAL,
    INT_RESET_INACTIVE              = BH1745NUC_SYS_CNTR_INT_RESET_INACTIVE
    
} bhINTReset_t;

typedef enum
{
    MEAS_TIME_160                   = BH1745NUC_MODE_CNTR1_MEAS_TIME_160,
    MEAS_TIME_320                   = BH1745NUC_MODE_CNTR1_MEAS_TIME_320,
    MEAS_TIME_640                   = BH1745NUC_MODE_CNTR1_MEAS_TIME_640,
    MEAS_TIME_1280                  = BH1745NUC_MODE_CNTR1_MEAS_TIME_1280,
    MEAS_TIME_2560                  = BH1745NUC_MODE_CNTR1_MEAS_TIME_2560,
    MEAS_TIME_5120                  = BH1745NUC_MODE_CNTR1_MEAS_TIME_5120
    
} bhMeasTime_t;

typedef enum
{
    RGBC_VALID_NOT_UPDATE           = BH1745NUC_MODE_CNTR2_RGBC_VALID_NOT_UPDATE,
    RGBC_VALID_UPDATE               = BH1745NUC_MODE_CNTR2_RGBC_VALID_UPDATE
    
} bhRGBCValid_t;

typedef enum
{
    RGBC_EN_INACTIVE                = BH1745NUC_MODE_CNTR2_RGBC_EN_INACTIVE,
    RGBC_EN_ACTIVE                  = BH1745NUC_MODE_CNTR2_RGBC_EN_ACTIVE
    
} bhRGBCEnable_t;

typedef enum
{
    ADC_GAIN_1X                     = BH1745NUC_MODE_CNTR2_ADC_GAIN_1X,
    ADC_GAIN_2X                     = BH1745NUC_MODE_CNTR2_ADC_GAIN_2X,
    ADC_GAIN_16X                    = BH1745NUC_MODE_CNTR2_ADC_GAIN_16X
    
} bhADCGain_t;

typedef enum
{
    STATUS_INACTIVE                 = BH1745NUC_INTR_INT_STATUS_INACTIVE,
    STATUS_ACTIVE                   = BH1745NUC_INTR_INT_STATUS_ACTIVE
    
} bhINTStatus_t;

typedef enum
{
    INT_LATCH_LATCHED               = BH1745NUC_INTR_INT_LATCH_LATCHED,
    INT_LATCH_UPDATED               = BH1745NUC_INTR_INT_LATCH_UPDATED
    
} bhINTLatch_t;

typedef enum
{
    INT_SOURCE_RED                  = BH1745NUC_INTR_INT_SOURCE_RED,
    INT_SOURCE_GREEN                = BH1745NUC_INTR_INT_SOURCE_GREEN,
    INT_SOURCE_BLUE                 = BH1745NUC_INTR_INT_SOURCE_BLUE,
    INT_SOURCE_CLEAR                = BH1745NUC_INTR_INT_SOURCE_CLEAR
    
} bhINTSource_t;

typedef enum
{
    INT_ENABLE_DISABLE              = BH1745NUC_INTR_INT_ENABLE_DISABLE,
    INT_ENABLE_ENABLE               = BH1745NUC_INTR_INT_ENABLE_ENABLE
    
} bhINTEnable_t;

typedef enum
{
    PERSISTENCE_TOGGLED_EACH        = BH1745NUC_PERSISTENCE_TOGGLED_EACH,
    PERSISTENCE_UPDATED_EACH        = BH1745NUC_PERSISTENCE_UPDATED_EACH,
    PERSISTENCE_UPDATED_4           = BH1745NUC_PERSISTENCE_UPDATED_4,
    PERSISTENCE_UPDATED_8           = BH1745NUC_PERSISTENCE_UPDATED_8
    
} bhPersistance_t;


class BH1745NUC
{
    protected:
        // Instance-specific properties
        uint8_t bh_conversionDelay;
        uint16_t bh_red, bh_green, bh_blue, bh_clear;
        bhSWReset_t bh_swreset;
        bhINTReset_t bh_intreset;
        bhMeasTime_t bh_meastime;
        bhRGBCValid_t bh_rgbcvalid;
        bhRGBCEnable_t bh_rgbcenable;
        bhADCGain_t bh_adcgain;
        bhINTStatus_t bh_intstatus;
        bhINTLatch_t bh_intlatch;
        bhINTSource_t bh_intsource;
        bhINTEnable_t bh_intenable;
        bhPersistance_t bh_persistance;
    
    public:
        uint8_t bh_i2cAddress;
        void getAddr_BH1745NUC(uint8_t i2cAddress);
        bool begin(void);
        void Initialize(void);
        uint16_t getRedColor(void);
        uint16_t getGreenColor(void);
        uint16_t getBlueColor(void);
        uint16_t getClearColor(void);
        void setSWReset(bhSWReset_t swreset);
        bhSWReset_t getSWReset(void);
        void setINTReset(bhINTReset_t intreset);
        bhINTReset_t getINTReset(void);
        void setMeasTime(bhMeasTime_t meastime);
        bhMeasTime_t getMeasTime(void);
        void setRGBCValid(bhRGBCValid_t rgbcvalid);
        bhRGBCValid_t getRGBCValid(void);
        void setRGBCEnable(bhRGBCEnable_t rgbcenable);
        bhRGBCEnable_t getRGBCEnable(void);
        void setADCGain(bhADCGain_t adcgain);
        bhADCGain_t getADCGain(void);
        void setINTStatus(bhINTStatus_t intstatus);
        bhINTStatus_t getINTStatus(void);
        void setINTLatch(bhINTLatch_t intlatch);
        bhINTLatch_t getINTLatch(void);
        void setINTSource(bhINTSource_t intsource);
        bhINTSource_t getINTSource(void);
        void setINTEnable(bhINTEnable_t intenable);
        bhINTEnable_t getINTEnable(void);
        void setPersistance(bhPersistance_t persistance);
        bhPersistance_t getPersistance(void);
        uint8_t setTHLimitLow(uint8_t limit);
        uint8_t setTHLimitHigh(uint8_t limit);
        uint8_t setTLLimitLow(uint8_t limit);
        uint8_t setTLLimitHigh(uint8_t limit);
    
    private:
};
