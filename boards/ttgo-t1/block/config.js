module.exports = {
    initial_blocks : `<xml>
                            <block type="arduino_init" deletable="false" x="-100" y="-50">
                            </block><block type="arduino_loop" deletable="false" x="100" y="-50"></block>
                      </xml>`,
    base_blocks : [ // use "blocks : [ " in normally situation but this need to override base block from esp-idf platforms
        {
            name : 'GPIO',
            color : '230',
            icon : '/static/icons/icons8_electronics_96px.png',
            blocks : [
                {
                    xml : 
                    `<block type="io_setpin">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">25</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml : 
                    `<block type="io_digital_read">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">32</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml : 
                    `<block type="io_digital_write">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">33</field>
                            </shadow>
                        </value>
                        <value name="value">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },                
                {
                    xml : 
                    `<block type="io_analog_read">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">36</field>
                            </shadow>
                        </value>
                    </block>`
                },     
                {
                    xml :
                    `<block type="io_analog_write">
                        <value name="value">
                            <shadow type="math_number">
                                <field name="NUM">128</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml : 
                    `<block type="io_pwm_write">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">36</field>
                            </shadow>
                        </value>
                        <value name="value">
                            <shadow type="math_number">
                                <field name="NUM">128</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml : 
                    `<block type="io_pulse_in">
                        <value name="pin">
                            <shadow type="math_number">
                                <field name="NUM">36</field>
                            </shadow>
                        </value>
                    </block>`
                },
                'io_shift_in',
                {
                    xml : 
                    `<block type="io_shift_out">
                        <value name="data">
                            <shadow type="math_number">
                                <field name="NUM">127</field>
                            </shadow>
                        </value>
                    </block>`
                }
            ]
        },        
        {
            name : 'Time',
            color : '230',
            icon : '/static/icons/icons8_Story_Time_96px.png',
            blocks : [
                {
                    xml : 
                    `<block type="time_delay">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">500</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml :
                        `<block type="time_delay_microsec">
                        <value name="delay">
                            <shadow type="math_number">
                                <field name="NUM">1000</field>
                            </shadow>
                        </value>
                    </block>`
                },
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
            name : 'Variables',
            color : '230',
            icon : '/static/icons/icons8_variable_96px.png',
            custom : 'VARIABLE'
        },
        {
            name : 'Math',
            color : '230',
            icon : '/static/icons/calculator.png',
            blocks : [
                'math_number',
                {
                    xml : 
                    `<block type="math_arithmetic">
                        <value name="A">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="B">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml : 
                    `<block type="math_variables_set">
                        <value name="VALUE">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                'math_variables_get',
                {
                    xml : 
                    `<block type="math_pow">
                        <value name="NUM1">
                            <shadow type="math_number">
                                <field name="NUM">2</field>
                            </shadow>
                        </value>
                        <value name="NUM2">
                            <shadow type="math_number">
                                <field name="NUM">3</field>
                            </shadow>
                        </value>
                    </block>`
                },                
                /*'math_sqrt',*/
                {
                    xml : 
                    `<block type="math_single">
                        <value name="NUM">
                            <shadow type="math_number">
                                <field name="NUM">9</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml : 
                    `<block type="math_trig">
                        <value name="NUM">
                            <shadow type="math_number">
                                <field name="NUM">90</field>
                            </shadow>
                        </value>
                    </block>`
                },
                {
                    xml : 
                    `<block type="math_round">
                        <value name="NUM">
                            <shadow type="math_number">
                                <field name="NUM">1.2</field>
                            </shadow>
                        </value>
                    </block>`
                },
                /*'math_min',
                'math_max',
                'math_map',*/
                'math_random_int',
                {
                    xml : 
                    `<block type="math_number_property">
                        <value name="NUMBER_TO_CHECK">
                            <shadow type="math_number">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                    </block>`
                }
            ]
        },
        {
            name : 'Logic',
            color : '230',
            icon : '/static/icons/icons8_serial_tasks_96px.png',
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
            icon : '/static/icons/icons8_repeat_96px.png',
            blocks : [
                'basic_forever',
                'controls_whileUntil',
                {
                    xml : 
                    `<block type="controls_for">
                        <value name="FROM">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="TO">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                        <value name="BY">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>`
                },
                'controls_flow_statements',
            ]
        },
        {
            name : 'Advanced',
            color : '195',
            icon : '/static/icons/icons8_hacker_128px.png',
            blocks : [
                {
                    type : 'category',
                    name : 'Functions',
                    icon : '/static/icons/icons8_module_96px.png',
                    custom : 'PROCEDURE'
                },
                /*{
                    type : 'category',
                    name : 'Tasks',
                    icon : '/static/icons/icons8_exercise_96px.png',
                    blocks : [
                        'create task',
                        'start task',
                        'stop task'
                    ]
                },*/
                /*{
                    type : 'category',
                    name : 'Arrays',
                    icon : '/static/icons/icons8_stack_96px.png',
                    blocks : [
                        'lists_create_empty',
                        'lists_repeat',
                        'lists_reverse',
                        'lists_isEmpty',
                        'lists_length',
                        'lists_create_with',
                        'lists_indexOf',
                        'lists_getIndex',
                        'lists_setIndex',
                        'lists_getSublist',
                        'lists_sort',
                        'lists_split',
                    ]
                },*/
                {
                    type : 'category',
                    name : 'Text',
                    icon : '/static/icons/icons8_text_color_96px.png',
                    blocks : [
                        'basic_string',                        
                        { xml : 
                            `<block type="text_length">
                                <value name="VALUE">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        'text_join',                        
                        { xml : 
                            `<block type="text_append">
                                <value name="TEXT">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        { xml : 
                                `<block type="text_isEmpty">
                                    <value name="VALUE">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>                                    
                                </block>`
                        },
                        { xml : 
                            `<block type="text_indexOf">
                                <value name="VALUE">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        { xml : 
                            `<block type="text_charAt">
                                <value name="VALUE">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        { xml : 
                            `<block type="text_getSubstring">
                                <value name="STRING">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        { xml : 
                            `<block type="text_changeCase">
                                <value name="TEXT">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        { xml : 
                            `<block type="text_trim">
                                <value name="TEXT">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        { xml : 
                            `<block type="text_replace">
                                <value name="TEXT">
                                    <shadow type="basic_string">
                                        <field name="VALUE">Hello world!</field>
                                    </shadow>
                                </value>                                    
                            </block>`
                        },
                        //'text_compare',
                        //'text_parse_int'
                    ]
                },
                {
                    type : 'category',
                    name : 'WiFi',
                    icon : '/static/icons/icons8_wifi_router_96px.png',
                    blocks : [
                        'wifi_connect',    
                        'wifi_ap',
                        /*{
                            xml : 
                                `<block type="wifi_http_get">
                                    <value name="url">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>
                                </block>`
                        },
                        {
                            xml : 
                                `<block type="wifi_http_post">
                                    <value name="url">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>
                                    <value name="data">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>
                                </block>`
                        },*/                   
                        'wifi_start_server',
                        'wifi_server_on',
                        {
                            xml : 
                                `<block type="wifi_server_send">
                                    <value name="text">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>
                                </block>`
                        },
                        
                        'wifi_get_ip_addr',
                        'wifi_get_ap_ip_addr',
                        'wifi_get_arg'
                    ]
                },
                {
                    type : 'category',
                    name : 'Bluetooth',
                    icon : '/static/icons/icons8_bluetooth_2_96px.png',
                    blocks : [
                        'bt_start',
                        {
                            xml : 
                                `<block type="bt_send_string">
                                    <value name="text">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>
                                </block>`
                        },
                        'bt_on_receive',
                        'bt_read_data',
                        'bt_read_line'
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
                        {
                            xml : 
                                `<block type="serial_write_data">
                                    <value name="text">
                                        <shadow type="basic_string">
                                            <field name="VALUE">Hello world!</field>
                                        </shadow>
                                    </value>
                                </block>`
                        },
                        'serial_write_newline',                        
                        'serial_read_line',
                        'serial_read_until',
                        'basic_string'
                    ]
                }
            ]
        }
    ]
}
