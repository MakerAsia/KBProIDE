module.exports = {
    initial_blocks : '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables></xml>',
    base_blocks : [ // use "blocks : [ " in normally situation but this need to override base block from esp-idf platforms
        {
            name : 'Basic',
            color : '230',
            icon : '/static/icons/SVG/c1.svg',
            blocks : [
                'basic_led16x8',
                'basic_led16x8_clr',
                'basic_led16x8_2chars',
                'basic_led16x8_scroll',
                'basic_led16x8_scroll_when_ready',
                'basic_delay',
                'basic_forever',
                'basic_string'
            ]
        },
        {
            name : 'Math',
            color : '230',
            icon : '/static/icons/SVG/c2.svg',
            blocks : [
                'math_number',
                'math_arithmetic',
                'math_variables_set',
                'math_variables_get',
                'math_pow',
                'math_single',
                'math_trig',
                'math_round',
                'convert_ra_de',
                'math_random_int',
                'math_number_property'
            ]
        },
        {
            name : 'Logic',
            color : '210',
            icon : '/static/icons/SVG/c3.svg',
            blocks : [
                'controls_if',
                {
                    name : 'controls_if' , 
                    blocks : [
                        {
                            mutation : { else : '1'}
                        }
                    ]
                },
                'logic_compare',
                'logic_operation',
                'logic_negate',
                'logic_boolean',
                'logic_led16x8_scroll_ready',
                'logic_sw1_pressed',
                'logic_sw1_released',
                'logic_sw2_pressed',
                'logic_sw2_released'
            ]
        },
        {
            name : 'Loop',
            color : '120',
            icon : '/static/icons/SVG/c4.svg',
            blocks : [
                'controls_whileUntil',
                'loop_break',
                'loop_continue',
            ]
        },
        {
            name : 'Wait',
            color : '160',
            icon : '/static/icons/SVG/c5.svg',
            blocks : [
                'wait_led_matrix_ready',
                'wait_sw1_pressed',
                'wait_sw1_released',
                'wait_sw2_pressed',
                'wait_sw2_released',
            ]
        },
        {
            name : 'Music',
            color : '330',
            icon : '/static/icons/SVG/c6.svg',
            blocks : [
                'music_note',
                'music_rest',
                'music_scale',
                'music_set_volume',
                'music_get_volume'
            ]
        },
        {
            name : 'Sensor',
            color : '58',
            icon : '/static/icons/SVG/c7.svg',
            blocks : [
                'sensor_ldr',
                'sensor_lm73',
                'sensor_switch1',
                'sensor_switch2'
            ]
        },
        {
            name : 'Clock',
            color : '19',
            icon : '/static/icons/SVG/c8.svg',
            blocks : [
                'rtc_get',
                'rtc_get_date',
                'rtc_get_time',
                'rtc_get_day',
                'rtc_get_month',
                'rtc_get_year',
                'rtc_get_hour',
                'rtc_get_minute',
                'rtc_get_second',
            ]
        },
        {
            name : 'I/O',
            color : '19',
            icon : '/static/icons/SVG/c9.svg',
            blocks : [
                'output_write',
                'output_toggle',
                'output_read',
                'usbsw_write',
                'usbsw_toggle',
                'usbsw_read',
                'input_read'                
            ]
        },
        {
            name : 'Advance',
            color : '290',
            icon : '/static/icons/SVG/c10.svg',
            blocks : [
                'advance_task'                
            ]
        },
        {
            name : 'IoT',
            color : '195',
            icon : '/static/icons/SVG/c11.svg',
            blocks : [
                {
                    type : 'category',
                    name : 'Gauge',
                    icon : '/static/icons/SVG/13.svg',
                    blocks : [
                        'gauge_iot',
                        'gauge_title',
                        'gauge_unit',
                        'gauge_color',
                        'gauge_minmax'
                    ]
                },
                {
                    type : 'category',
                    name : 'Graph',
                    icon : '/static/icons/SVG/13.svg',
                    blocks : [
                        'feed_iot',
                        'feed_main_title',
                        'feed_title',
                        'feed_color'
                    ]
                },
                {
                    type : 'category',
                    name : 'Messaging',
                    icon : '/static/icons/SVG/13.svg',
                    blocks : [
                        'push_notification',                        
                    ]
                }
            ]
        }
    ]
}