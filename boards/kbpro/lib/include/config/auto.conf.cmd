deps_config := \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/app_trace/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/aws_iot/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/bt/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/driver/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/esp32/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/esp_adc_cal/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/esp_http_client/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/ethernet/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/fatfs/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/freertos/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/heap/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/libsodium/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/log/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/lwip/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/mbedtls/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/openssl/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/pthread/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/spi_flash/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/spiffs/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/tcpip_adapter/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/vfs/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/wear_levelling/Kconfig \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/bootloader/Kconfig.projbuild \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/esptool_py/Kconfig.projbuild \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/components/partition_table/Kconfig.projbuild \
	/home/user/Dropbox/nodejs/kidbrightide/esp32/lib/esp-idf/Kconfig

include/config/auto.conf: \
	$(deps_config)

ifneq "$(IDF_CMAKE)" "n"
include/config/auto.conf: FORCE
endif

$(deps_config): ;
