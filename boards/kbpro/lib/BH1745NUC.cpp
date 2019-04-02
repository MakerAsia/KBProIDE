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

#include "BH1745NUC.h"

/**************************************************************************/
/*
        Abstract away platform differences in Arduino wire library
*/
/**************************************************************************/
static uint8_t i2cread(void)
{
    #if ARDUINO >= 100
        return Wire.read();
    #else
        return Wire.receive();
    #endif
}

/**************************************************************************/
/*
        Abstract away platform differences in Arduino wire library
*/
/**************************************************************************/
static void i2cwrite(uint8_t x)
{
    #if ARDUINO >= 100
        Wire.write((uint8_t)x);
    #else
        Wire.send(x);
    #endif
}

/**************************************************************************/
/*
        Writes 8-bits to the specified destination register
*/
/**************************************************************************/
static uint8_t writeRegister(uint8_t i2cAddress, uint8_t reg, uint8_t value)
{
    Wire.beginTransmission(i2cAddress);
    i2cwrite((uint8_t)reg);
    i2cwrite((uint8_t)value);
    Wire.endTransmission();
}

/**************************************************************************/
/*
        Reads 8-bits from the specified destination register
*/
/**************************************************************************/
static uint8_t readRegister(uint8_t i2cAddress, uint8_t reg)
{
    Wire.beginTransmission(i2cAddress);
    i2cwrite((uint8_t)reg);
    Wire.endTransmission();
    Wire.requestFrom(i2cAddress, (uint8_t)1);
    return (uint8_t)(i2cread());
}

/**************************************************************************/
/*
        Instantiates a new BH1745NUC class with appropriate properties
*/
/**************************************************************************/
void BH1745NUC::getAddr_BH1745NUC(uint8_t i2cAddress)
{
    bh_i2cAddress = i2cAddress;
    bh_conversionDelay = BH1745NUC_CONVERSIONDELAY;
}

/**************************************************************************/
/*
        Sets up the Hardware
*/
/**************************************************************************/
bool BH1745NUC::begin()
{
    Wire.begin();
    if (readRegister(bh_i2cAddress, BH1745NUC_CMD_MANUFACTURER_ID) != 0xE0) return false;
    
    // Set Up the Color Sensor
    // Initialize();
    return true;
}

/**************************************************************************/
/*
        Sets the Intial Reset Mode
*/
/**************************************************************************/
void BH1745NUC::setSWReset(bhSWReset_t swreset)
{
        bh_swreset = swreset;
}

/**************************************************************************/
/*
        Gets the Intial Reset Mode
*/
/**************************************************************************/
bhSWReset_t BH1745NUC::getSWReset()
{
    return bh_swreset;
}

/**************************************************************************/
/*
        Sets the Interrupt Pin Status
*/
/**************************************************************************/
void BH1745NUC::setINTReset(bhINTReset_t intreset)
{
    bh_intreset = intreset;
}

/**************************************************************************/
/*
        Gets the Interrupt Pin Status
*/
/**************************************************************************/
bhINTReset_t BH1745NUC::getINTReset()
{
    return bh_intreset;
}

/**************************************************************************/
/*
        Sets the RGBC Measurement time
        RGBC each data are updated by the following time
*/
/**************************************************************************/
void BH1745NUC::setMeasTime(bhMeasTime_t meastime)
{
    bh_meastime = meastime;
}

/**************************************************************************/
/*
        Gets the RGBC Measurement time
*/
/**************************************************************************/
bhMeasTime_t BH1745NUC::getMeasTime()
{
    return bh_meastime;
}

/**************************************************************************/
/*
        Sets the Validity of the RGBC Data Update
*/
/**************************************************************************/
void BH1745NUC::setRGBCValid(bhRGBCValid_t rgbcvalid)
{
    bh_rgbcvalid = rgbcvalid;
}

/**************************************************************************/
/*
        Gets the Validity of the RGBC Data Update
*/
/**************************************************************************/
bhRGBCValid_t BH1745NUC::getRGBCValid()
{
    return bh_rgbcvalid;
}

/**************************************************************************/
/*
        Sets the RGBC Measurement Enable
*/
/**************************************************************************/
void BH1745NUC::setRGBCEnable(bhRGBCEnable_t rgbcenable)
{
    bh_rgbcenable = rgbcenable;
}

/**************************************************************************/
/*
        Gets the RGBC Measurement Enable
*/
/**************************************************************************/
bhRGBCEnable_t BH1745NUC::getRGBCEnable()
{
    return bh_rgbcenable;
}

/**************************************************************************/
/*
        Sets the Gain Setting for RGBC Measurement
*/
/**************************************************************************/
void BH1745NUC::setADCGain(bhADCGain_t adcgain)
{
    bh_adcgain = adcgain;
}

/**************************************************************************/
/*
        Gets the Gain Setting for RGBC Measurement
*/
/**************************************************************************/
bhADCGain_t BH1745NUC::getADCGain()
{
    return bh_adcgain;
}

/**************************************************************************/
/*
        Sets the Interrupt Status of RGBC
*/
/**************************************************************************/
void BH1745NUC::setINTStatus(bhINTStatus_t intstatus)
{
    bh_intstatus = intstatus;
}

/**************************************************************************/
/*
        Gets the Interrupt Status of RGBC
*/
/**************************************************************************/
bhINTStatus_t BH1745NUC::getINTStatus()
{
    return bh_intstatus;
}

/**************************************************************************/
/*
        Sets the Interrupt Pin Latch Status
*/
/**************************************************************************/
void BH1745NUC::setINTLatch(bhINTLatch_t intlatch)
{
    bh_intlatch = intlatch;
}

/**************************************************************************/
/*
        Gets the Interrupt Pin Latch Status
*/
/**************************************************************************/
bhINTLatch_t BH1745NUC::getINTLatch()
{
    return bh_intlatch;
}

/**************************************************************************/
/*
        Sets the Interrupt Source Select
*/
/**************************************************************************/
void BH1745NUC::setINTSource(bhINTSource_t intsource)
{
    bh_intsource = intsource;
}

/**************************************************************************/
/*
        Gets the Interrupt Source Select
*/
/**************************************************************************/
bhINTSource_t BH1745NUC::getINTSource()
{
    return bh_intsource;
}

/**************************************************************************/
/*
        Sets the Interrupt Pin Status
*/
/**************************************************************************/
void BH1745NUC::setINTEnable(bhINTEnable_t intenable)
{
    bh_intenable = intenable;
}

/**************************************************************************/
/*
        Gets the Interrupt Pin Status
*/
/**************************************************************************/
bhINTEnable_t BH1745NUC::getINTEnable()
{
    return bh_intenable;
}

/**************************************************************************/
/*
        Sets the Interrupt Persistence Function
*/
/**************************************************************************/
void BH1745NUC::setPersistance(bhPersistance_t persistance)
{
    bh_persistance = persistance;
}

/**************************************************************************/
/*
        Gets the Interrupt Persistence Function
*/
/**************************************************************************/
bhPersistance_t BH1745NUC::getPersistance()
{
    return bh_persistance;
}

/**************************************************************************/
/*
        Sets the Higher Threshold Low Limit Interrupt
*/
/**************************************************************************/
uint8_t BH1745NUC::setTHLimitLow(uint8_t limit)
{
    // mask off the invalid bits in case they were set
    limit &= 0xFF;
    return writeRegister(bh_i2cAddress, BH1745NUC_CMD_THRESHOLD_HI_LSB, limit);
}

/**************************************************************************/
/*
        Sets the Higher Threshold High Limit Interrupt
*/
/**************************************************************************/
uint8_t BH1745NUC::setTHLimitHigh(uint8_t limit)
{
    // mask off the invalid bits in case they were set
    limit &= 0xFF;
    return writeRegister(bh_i2cAddress, BH1745NUC_CMD_THRESHOLD_HI_MSB, limit);
}

/**************************************************************************/
/*
        Sets the Lower Threshold Low Limit Interrupt
*/
/**************************************************************************/
uint8_t BH1745NUC::setTLLimitLow(uint8_t limit)
{
    // mask off the invalid bits in case they were set
    limit &= 0xFF;
    return writeRegister(bh_i2cAddress, BH1745NUC_CMD_THRESHOLD_LO_LSB, limit);
}

/**************************************************************************/
/*
        Sets the Lower Threshold High Limit Interrupt
*/
/**************************************************************************/
uint8_t BH1745NUC::setTLLimitHigh(uint8_t limit)
{
    // mask off the invalid bits in case they were set
    limit &= 0xFF;
    return writeRegister(bh_i2cAddress, BH1745NUC_CMD_THRESHOLD_LO_MSB, limit);
}

/**************************************************************************/
/*
        Set Up sensor to be ready for multiple measurements
*/
/**************************************************************************/
void BH1745NUC::Initialize(void)
{
    // Start with default values
    // Set up the System Control register
    // Set the Intial Reset Mode
    uint8_t system = bh_swreset;
    
    // Set the Interrupt Pin Status
    system |= bh_intreset;
    
    // Write the configuration for the System Control Register
    writeRegister(bh_i2cAddress, BH1745NUC_CMD_SYSTEM_CONTROL, system);
    
    // Wait for the conversion to complete
    delay(bh_conversionDelay);
    
    // Set Up the Mode Control 1 Register
    // Set the RGBC Measurement Time
    uint8_t modecontrol1 = bh_meastime;
    
    // Write the configuration for the Mode Control 1 Register
    writeRegister(bh_i2cAddress, BH1745NUC_CMD_MODE_CONTROL1, modecontrol1);
    
    // Wait for the conversion to complete
    delay(bh_conversionDelay);
    
    // Set Up the Mode Control 2 Register
    // Set the Validity of the RGBC Data Update
    uint8_t modecontrol2 = bh_rgbcvalid;
    
    // Set the RGBC Measurement Enable
    modecontrol2 |= bh_rgbcenable;
    
    // Set the Gain Setting for RGBC Measurement
    modecontrol2 |= bh_adcgain;
    
    // Write the configuration for the Mode Control 2 Register
    writeRegister(bh_i2cAddress, BH1745NUC_CMD_MODE_CONTROL2, modecontrol2);
    
    // Write the configuration for the Mode Control 3 Register
    uint8_t modecontrol3 = 0x02;
    writeRegister(bh_i2cAddress, BH1745NUC_CMD_MODE_CONTROL3, modecontrol3);
    
    // Wait for the conversion to complete
    delay(bh_conversionDelay);
    
    // Set Up the Mode Control 2 Register
    // Set the Interrupt Status of RGBC
    uint8_t interrupt = bh_intstatus;
    
    // Set the Interrupt Pin Latch Status
    interrupt |= bh_intlatch;
    
    // Set the Interrupt Source Select
    interrupt |= bh_intsource;
    
    // Set the Interrupt Pin Status
    interrupt |= bh_intenable;
    
    // Write the configuration for the Interrupt Register
    writeRegister(bh_i2cAddress, BH1745NUC_CMD_INTERRUPT, interrupt);
    
    // Wait for the conversion to complete
    delay(bh_conversionDelay);
    
    // Set Up the Persistence Register
    // Set the Interrupt Persistence Function Status
    uint8_t interrupt_persistence = bh_persistance;
    
    // Write the configuration for the Persistence Register
    writeRegister(bh_i2cAddress, BH1745NUC_CMD_PERSISTENCE, interrupt_persistence);
    
    // Wait for the conversion to complete
    delay(bh_conversionDelay);
    
}

/**************************************************************************/
/*
        Reads the results for the Red Color measuring in lux value
*/
/**************************************************************************/
uint16_t BH1745NUC::getRedColor(void)
{
    uint8_t redLSB, redMSB;
    
    // Read the conversion results
    // Reading the red color low byte data
    redLSB = readRegister(bh_i2cAddress, BH1745NUC_CMD_RED_DATA_LSB);
    // Reading the red color high byte data
    redMSB = readRegister(bh_i2cAddress, BH1745NUC_CMD_RED_DATA_MSB);
    // 16-bit unsigned results for the red color of BH1745NUC
    bh_red = redMSB << 8 | redLSB;
    
    return (uint16_t)bh_red;
}

/**************************************************************************/
/*
        Reads the results for the Green Color measuring in lux value
*/
/**************************************************************************/
uint16_t BH1745NUC::getGreenColor(void)
{
    uint8_t greenLSB, greenMSB;
    
    // Read the conversion results
    // Reading the green color low byte data
    greenLSB = readRegister(bh_i2cAddress, BH1745NUC_CMD_GREEN_DATA_LSB);
    // Reading the green color high byte data
    greenMSB = readRegister(bh_i2cAddress, BH1745NUC_CMD_GREEN_DATA_MSB);
    // 16-bit unsigned results for the green color of BH1745NUC
    bh_green = greenMSB << 8 | greenLSB;
    
    return (uint16_t)bh_green;
}

/**************************************************************************/
/*
        Reads the results for the Blue Color measuring in lux value
*/
/**************************************************************************/
uint16_t BH1745NUC::getBlueColor(void)
{
    uint8_t blueLSB, blueMSB;
    
    // Read the conversion results
    // Reading the blue color low byte data
    blueLSB = readRegister(bh_i2cAddress, BH1745NUC_CMD_BLUE_DATA_LSB);
    // Reading the blue color high byte data
    blueMSB = readRegister(bh_i2cAddress, BH1745NUC_CMD_BLUE_DATA_MSB);
    // 16-bit unsigned results for the blue color of BH1745NUC
    bh_blue = blueMSB << 8 | blueLSB;
    
    return (uint16_t)bh_blue;
}

/**************************************************************************/
/*
        Reads the results for the Clear Color measuring in lux value
*/
/**************************************************************************/
uint16_t BH1745NUC::getClearColor(void)
{
    uint8_t clearLSB, clearMSB;
    
    // Read the conversion results
    // Reading the clear color low byte data
    clearLSB = readRegister(bh_i2cAddress, BH1745NUC_CMD_CLEAR_DATA_LSB);
    // Reading the clear color high byte data
    clearMSB = readRegister(bh_i2cAddress, BH1745NUC_CMD_CLEAR_DATA_MSB);
    // 16-bit unsigned results for the clear color of BH1745NUC
    bh_clear = clearMSB << 8 | clearLSB;
    
    return (uint16_t)bh_clear;
}
