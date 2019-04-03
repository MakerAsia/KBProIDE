module.exports = {
    base_blocks : [ // use "blocks : [ " in normally situation but this need to override base block from esp-idf platforms
        {
            name : 'Display',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            blocks : [
                'i2c128x64_display_image',
                'i2c128x64_display_clear',
                'i2c128x64_display_display',
                'i2c128x64_display_print',
                'i2c128x64_display_draw_line',
                'i2c128x64_display_draw_rect',
                'i2c128x64_display_draw_circle',
                'i2c128x64_display_draw_progress_bar',
                'i2c128x64_display_draw_pixel',
                'i2c128x64_display_string_width',
                'i2c128x64_display_width',                
                'i2c128x64_display_height',                
                'basic_string'
            ]
        },
        {
            name : 'Sensor',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            blocks : [
                'button_1_status',
                'button_2_status',
                'bme280_read_temp',
                'bme280_read_humid',
                'bme280_read_pressure',
                'bh1680_read_light_1',
                'bh1680_read_light_2',
                'bh1745_read_red',
                'bh1745_read_green',
                'bh1745_read_blue',
                'bmx055_read_acc_x',
                'bmx055_read_acc_y',
                'bmx055_read_acc_z',
                'bmx055_read_gyro_x',
                'bmx055_read_gyro_y',
                'bmx055_read_gyro_z',
                'bmx055_read_compass',
            ]
        },
        {
            name : 'GPIO',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            blocks : [
                'io_board_read',
                'io_board_write',
                'io_board_write_value',
                'io_setpin',
                'io_digital_read',
                'io_digital_write',
                'io_analog_read',
                'io_analog_write',
                'io_pwm_write',
                'io_pulse_in',
                'io_shift_in',
                'io_shift_out'
            ]
        },        
        {
            name : 'Time',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            blocks : [
                'time_delay',
                'time_wait_btn_press',
                'time_sync',
                'time_get_year',
                'time_get_month',
                'time_get_day',
                'time_get_day_of_week',
                'time_get_hour',
                'time_get_minute',
                'time_get_second',
                'time_millis',
                'time_micros'
            ]
        },        
        {
            name : 'Music',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            blocks : [
                'speaker_music_note',
                'speaker_play_note',
                'speaker_set_volume',
                'speaker_get_volume'
            ]
        },
        {
            name : 'Variables',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            custom : 'VARIABLE'
        },
        {
            name : 'Math',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            blocks : [
                'math_number',
                'math_arithmetic',
                'math_variables_set',
                'math_variables_get',
                'math_pow',
                'math_sqrt',
                'math_single',
                'math_trig',
                'math_round',
                'math_min',
                'math_max',
                'math_map',
                'math_random_int',
                'math_number_property'
            ]
        },
        {
            name : 'Logic',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            blocks : [
                'controls_if',
                'logic_compare',
                'logic_operation',
                'logic_negate',
                'logic_boolean',
            ]
        },
        {
            name : 'Loops',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            blocks : [
                'basic_forever',
                'controls_whileUntil',
                'controls_for',
                'controls_flow_statements',
            ]
        },
        {
            name : 'Advanced',
            color : '195',
            icon : '/static/icons/SVG/c11.svg',
            blocks : [
                {
                    type : 'category',
                    name : 'Functions',
                    icon : '/static/icons/SVG/13.svg',
                    custom : 'PROCEDURE'
                },
                {
                    type : 'category',
                    name : 'Tasks',
                    icon : '/static/icons/SVG/13.svg',
                    blocks : [
                        'create task',
                        'start task',
                        'stop task'
                    ]
                },
                {
                    type : 'category',
                    name : 'Arrays',
                    icon : '/static/icons/SVG/13.svg',
                    blocks : [
                        'array_set_to',
                        'array_set_string_to',
                        'array_length',
                        'array_get_value_at',
                        'array_set_value_at',
                        'array_push',
                        'array_pop',
                        'array_index_of',
                        'array_prepand',
                        'array_pop_front',
                        'array_insert_at',
                        'array_remove_at',
                        'array_reverse'
                    ]
                },
                {
                    type : 'category',
                    name : 'Text',
                    icon : '/static/icons/SVG/13.svg',
                    blocks : [
                        'basic_string',
                        'string_length',
                        'string_join',
                        'string_compare',
                        'string_substring',
                        'string_parse_int',
                        'string_char_at',
                        'string_sprintf'
                    ]
                },
                {
                    type : 'category',
                    name : 'WiFi',
                    icon : '/static/icons/SVG/13.svg',
                    blocks : [
                        'wifi_connect',
                        'wifi_http_get',
                        'wifi_http_post',
                        'wifi_start_server',
                        'wifi_server_on',
                        'wifi_get_ip_addr'
                    ]
                },
                {
                    type : 'category',
                    name : 'Bluetooth',
                    icon : '/static/icons/SVG/13.svg',
                    blocks : [
                        'bt_start',                        
                        'bt_send_string',
                        'bt_on_receive',
                        'bt_read_data'
                    ]
                },
                {
                    type : 'category',
                    name : 'Serial',
                    icon : '/static/icons/SVG/13.svg',
                    blocks : [
                        'serial_usb_init',
                        'serial_hardware_init',
                        'serial_available',
                        'serial_write_newline',
                        'serial_write_data',
                        'serial_read_line',
                        'serial_read_until'
                    ]
                }
            ]
        }
    ]
}