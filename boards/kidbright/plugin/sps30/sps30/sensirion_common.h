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
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef SENSIRION_COMMON_H
#define SENSIRION_COMMON_H

#include "sensirion_arch_config.h"

#ifdef __cplusplus
extern "C" {
#endif

#define STATUS_OK 0
#define STATUS_FAIL (-1)

#ifndef NULL
#define NULL ((void *)0)
#endif

#if SENSIRION_BIG_ENDIAN
#define be16_to_cpu(s) (s)
#define be32_to_cpu(s) (s)
#define be64_to_cpu(s) (s)
#define SENSIRION_WORDS_TO_BYTES(a, w) ()

#else /* SENSIRION_BIG_ENDIAN */

#define be16_to_cpu(s) (((uint16_t)(s) << 8) | (0xff & ((uint16_t)(s)) >> 8))
#define be32_to_cpu(s) (((uint32_t)be16_to_cpu(s) << 16) | \
                        (0xffff & (be16_to_cpu((s) >> 16))))
#define be64_to_cpu(s) (((uint64_t)be32_to_cpu(s) << 32) | \
                        (0xffffffff & ((uint64_t)be32_to_cpu((s) >> 32))))
/**
 * Convert a word-array to a bytes-array, effectively reverting the
 * host-endianness to big-endian
 * @a:  word array to change (must be (uint16_t *) castable)
 * @w:  number of word-sized elements in the array (SENSIRION_NUM_WORDS(a)).
 */
#define SENSIRION_WORDS_TO_BYTES(a, w) \
    for (uint16_t *__a = (uint16_t *)(a), __e = (w), __w = 0; __w < __e; ++__w) { \
        __a[__w] = be16_to_cpu(__a[__w]); \
    }
#endif /* SENSIRION_BIG_ENDIAN */

#ifndef ARRAY_SIZE
#define ARRAY_SIZE(x) (sizeof(x) / sizeof(*(x)))
#endif

#define CRC8_POLYNOMIAL             0x31
#define CRC8_INIT                   0xFF
#define CRC8_LEN                    1

#define SENSIRION_COMMAND_SIZE      2
#define SENSIRION_WORD_SIZE         2
#define SENSIRION_NUM_WORDS(x) (sizeof(x) / SENSIRION_WORD_SIZE)
#define SENSIRION_MAX_BUFFER_WORDS  32

uint8_t sensirion_common_generate_crc(uint8_t *data, uint16_t count);

int8_t sensirion_common_check_crc(uint8_t *data, uint16_t count, uint8_t checksum);

/**
 * sensirion_fill_cmd_send_buf() - create the i2c send buffer for a command and
 *                                 a set of argument words. The output buffer
 *                                 interleaves argument words with their
 *                                 checksums.
 * @buf:        The generated buffer to send over i2c. Then buffer length must
 *              be at least SENSIRION_COMMAND_LEN + num_args *
 *              (SENSIRION_WORD_SIZE + CRC8_LEN).
 * @cmd:        The i2c command to send. It already includes a checksum.
 * @args:       The arguments to the command. Can be NULL if none.
 * @num_args:   The number of word arguments in args.
 *
 * @return      The number of bytes written to buf
 */
uint16_t sensirion_fill_cmd_send_buf(uint8_t *buf, uint16_t cmd, const uint16_t *args, uint8_t num_args);

/**
 * sensirion_i2c_read_words() - read data words from sensor
 *
 * @address:    Sensor i2c address
 * @data_words: Allocated buffer to store the read words.
 *              The buffer may also have been modified on STATUS_FAIL return.
 * @num_words:  Number of data words to read (without CRC bytes)
 *
 * @return      STATUS_OK on success, an error code otherwise
 */
int16_t sensirion_i2c_read_words(uint8_t address, uint16_t *data_words, uint16_t num_words);

/**
 * sensirion_i2c_read_bytes() - read data words as byte-stream from sensor
 *
 * Read bytes without adjusting values to the uP's word-order.
 *
 * @address:    Sensor i2c address
 * @data:       Allocated buffer to store the read bytes.
 *              The buffer may also have been modified on STATUS_FAIL return.
 * @num_words:  Number of data words(!) to read (without CRC bytes)
 *              Since only word-chunks can be read from the sensor the size
 *              is still specified in sensor-words (num_words = num_bytes *
 *              SENSIRION_WORD_SIZE)
 *
 * @return      STATUS_OK on success, an error code otherwise
 */
int16_t sensirion_i2c_read_bytes(uint8_t address, uint8_t *data, uint16_t num_words);

/**
 * sensirion_i2c_write_cmd() - writes a command to the sensor
 * @address:    Sensor i2c address
 * @command:    Sensor command
 *
 * @return      STATUS_OK on success, an error code otherwise
 */
int16_t sensirion_i2c_write_cmd(uint8_t address, uint16_t command);

/**
 * sensirion_i2c_write_cmd_with_args() - writes a command with arguments to the
 *                                       sensor
 * @address:    Sensor i2c address
 * @command:    Sensor command
 * @data:       Argument buffer with words to send
 * @num_words:  Number of data words to send (without CRC bytes)
 *
 * @return      STATUS_OK on success, an error code otherwise
 */
int16_t sensirion_i2c_write_cmd_with_args(uint8_t address, uint16_t command,
                                      const uint16_t *data_words, uint16_t num_words);

/**
 * sensirion_i2c_delayed_read_cmd() - send a command, wait for the sensor to
 *                                    process and read data back
 * @address:    Sensor i2c address
 * @cmd:        Command
 * @delay:      Time in microseconds to delay sending the read request
 * @data_words: Allocated buffer to store the read data
 * @num_words:  Data words to read (without CRC bytes)
 *
 * @return      STATUS_OK on success, an error code otherwise
 */
int16_t sensirion_i2c_delayed_read_cmd(uint8_t address, uint16_t cmd, uint32_t delay_us,
                                   uint16_t *data_words, uint16_t num_words);
/**
 * sensirion_i2c_read_cmd() - reads data words from the sensor after a command
 *                            is issued
 * @address:    Sensor i2c address
 * @cmd:        Command
 * @data_words: Allocated buffer to store the read data
 * @num_words:  Data words to read (without CRC bytes)
 *
 * @return      STATUS_OK on success, an error code otherwise
 */
int16_t sensirion_i2c_read_cmd(uint8_t address, uint16_t cmd, uint16_t *data_words, uint16_t num_words);

#ifdef __cplusplus
}
#endif

#endif /* SENSIRION_COMMON_H */
