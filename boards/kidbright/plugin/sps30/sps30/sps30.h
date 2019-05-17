/*
 * Copyright (c) 2018, Sensirion AG
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of Sensirion AG nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef SPS30_H
#define SPS30_H

#ifdef __cplusplus
extern "C" {
#endif

#include "sensirion_arch_config.h"

#define SPS_MAX_SERIAL_LEN 32

struct sps30_measurement {
    float mc_1p0;
    float mc_2p5;
    float mc_4p0;
    float mc_10p0;
    float nc_0p5;
    float nc_1p0;
    float nc_2p5;
    float nc_4p0;
    float nc_10p0;
    float typical_particle_size;
};

/**
 * sps30_probe() - check if SPS sensor is available and initialize it
 *
 * Note that Pin 4 must be pulled to ground for the sensor to operate in i2c
 * mode (this driver). When left floating, the sensor operates in UART mode
 * which is not compatible with this i2c driver.
 *
 * Return:  0 on success, an error code otherwise
 */
int16_t sps30_probe();

/**
 * sps30_get_serial() - retrieve the serial number
 *
 * Note that serial must be discarded when the return code is non-zero.
 *
 * @serial: Memory where the serial number is written into as hex string (zero
 *          terminated). Must be at least SPS_MAX_SERIAL_LEN long.
 * Return:  0 on success, an error code otherwise
 */
int16_t sps30_get_serial(char *serial);

/**
 * sps30_start_measurement() - start measuring
 *
 * Once the measurement is started, measurements are retrievable once per second
 * with sps30_read_measurement.
 *
 * Return:  0 on success, an error code otherwise
 */
int16_t sps30_start_measurement();

/**
 * sps30_stop_measurement() - stop measuring
 *
 * Return:  0 on success, an error code otherwise
 */
int16_t sps30_stop_measurement();

/**
 * sps30_read_datda_ready() - reads the current data-ready flag
 *
 * The data-ready flag indicates that new (not yet retrieved) measurements are
 * available
 *
 * @data_ready: Memory where the data-ready flag (0|1) is stored.
 * Return:      0 on success, an error code otherwise
 */
int16_t sps30_read_data_ready(uint16_t *data_ready);

/**
 * sps30_read_measurement() - read a measurement
 *
 * Read the last measurement.
 *
 * Return:  0 on success, an error code otherwise
 */
int16_t sps30_read_measurement(struct sps30_measurement *measurement);

/**
 * sps30_get_fan_auto_cleaning_interval() - read the current(*) auto-cleaning
 * interval
 *
 * Note that interval_seconds must be discarded when the return code is
 * non-zero.
 *
 * (*) Note that due to a firmware bug, the reported interval is only updated on
 * sensor restart/reset. If the interval was thus updated after the last reset,
 * the old value is still reported. Power-cycle the sensor or call sps30_reset()
 * first if you need the latest value.
 *
 * @interval_seconds:   Memory where the interval in seconds is stored
 * Return:              0 on success, an error code otherwise
 */
int16_t sps30_get_fan_auto_cleaning_interval(uint32_t *interval_seconds);

/**
 * sps30_set_fan_auto_cleaning_interval() - set the current auto-cleaning
 * interval
 *
 * @interval_seconds:   Value in seconds used to sets the auto-cleaning
 *                      interval, 0 to disable auto cleaning
 * Return:              0 on success, an error code otherwise
 */
int16_t sps30_set_fan_auto_cleaning_interval(uint32_t interval_seconds);

/**
 * sps30_get_fan_auto_cleaning_interval_days() - convenience function to read
 * the current(*) auto-cleaning interval in days
 *
 * note that the value is simply cut, not rounded or calculated nicely, thus
 * using this method is not precise when used in conjunction with
 * sps30_set_fan_auto_cleaning_interval instead of
 * sps30_set_fan_auto_cleaning_interval_days
 *
 * Note that interval_days must be discarded when the return code is non-zero.
 *
 * (*) Note that due to a firmware bug, the reported interval is only updated on
 * sensor restart/reset. If the interval was thus updated after the last reset,
 * the old value is still reported. Power-cycle the sensor or call sps30_reset()
 * first if you need the latest value.
 *
 * @interval_days:  Memory where the interval in days is stored
 * Return:          0 on success, an error code otherwise
 */
int16_t sps30_get_fan_auto_cleaning_interval_days(uint8_t *interval_days);

/**
 * sps30_set_fan_auto_cleaning_interval_days() - convenience function to set the
 * current auto-cleaning interval in days
 *
 * @interval_days:  Value in days used to sets the auto-cleaning interval, 0 to
 *                  disable auto cleaning
 * Return:          0 on success, an error code otherwise
 */
int16_t sps30_set_fan_auto_cleaning_interval_days(uint8_t interval_days);

/**
 * sps30_reset() - reset the SGP30
 *
 * The sensor reboots to the same state as before the reset but takes a few
 * seconds to resume measurements.
 *
 * Note that the interface-select configuration is reinterpreted, thus Pin 4
 * must be pulled to ground during the reset period for the sensor to remain in
 * i2c mode.
 *
 * Return:          0 on success, an error code otherwise
 */
int16_t sps30_reset();

#ifdef __cplusplus
}
#endif

#endif /* SPS30_H */
