const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const md5 = require('md5');

const driver_type_arr = [
    'DEV_IO',
    'DEV_I2C0',
    'DEV_I2C1',
    'DEV_SPI'
];

module.exports = {

    gen_iot_code : function(setup_code, current_setup_code) {
        var config_flag = false;
        var iot_config = [];        
        var topics = [];
        var iot_code = '';

        var trim_code = current_setup_code.trim();
		if (trim_code.substring(0, 10) == 'IOT_CONFIG') {
			config_flag = true;
			var current_line = JSON.parse(
				trim_code.substring(10, trim_code.length));
			iot_config.push(current_line);

			if (topics.indexOf(current_line['topic']) == -1) {
				topics.push(current_line['topic']);
			}
		}
		else {
			config_flag = false;
		}
		if ((config_flag == false) && (iot_config.length != 0)) {
			for (topics_index in topics) {
				var filtered_data = iot_config.filter(a => a.topic == topics[topics_index]);
				if (topics_index == 0) {
					iot_code += '{\\"' + topics[topics_index] + '\\":{';
				}
				else {
					iot_code += '},\\"' + topics[topics_index] + '\\":{';
				}
				for (data_index in filtered_data) {
					if (data_index != 0) {
						iot_code += ',';
					}
					iot_code += filtered_data[data_index]['data'].replace(/"/g, '\\"');
				}
				if (topics_index == topics.length - 1) {
					iot_code += '}';
				}
			}
			iot_code += '}'
			setup_code += '  ' + 'kbiot_setConfig("CFG", "' + iot_code + '");\n';
			setup_code += '  ' + current_setup_code + '\n';
			topics = [];
			iot_config = [];
			iot_code = '';
		}
		else if (config_flag == false) {
			setup_code += '  ' + current_setup_code + '\n';
		}
		return setup_code;
	},
	check_use_prime_func : function(code, flag) {
		if (flag === false) {
			return code.includes('check_is_prime');
		}
		return flag;
	},
    getPluginInstatantLine : function(line){
        var line_inst_arr = [];        
        for (var dt_index in driver_type_arr) {
            var driver_type = driver_type_arr[dt_index];
            var re = new RegExp(driver_type + '\\..*?\\.', 'g'); // https://www.regextester.com/94730
            var m_arr = line.match(re);
            if (m_arr != null) {
                for (var m_index in m_arr) {
                    line_inst_arr.push({
                        obj_inst: m_arr[m_index],
                        drv_type: driver_type
                    });
                }
            }
        }
        return line_inst_arr;
    },
    generateObjectInstantTab : function(line_inst_arr){   
		var obj_inst_tab = [];     
        if (line_inst_arr.length > 0) {
            for (var line_inst_index in line_inst_arr) {
                var obj_inst = line_inst_arr[line_inst_index].obj_inst;
                var drv_type = line_inst_arr[line_inst_index].drv_type;
                var inst = '';
                var cls = '';
                var re = new RegExp(drv_type + '\\..*?\\)', 'g');
                var inst_lst = obj_inst.match(re);

                if (inst_lst != null) {
                    inst = inst_lst[0].replace(drv_type + '.', '');
                    var cls_lst = inst.match(/.*?\(/g);
                    if (cls_lst != null) {
                        cls = cls_lst[0].replace('(', '');
                    }
                }

                var obj_declare_index = 0;
                // check duplicate object instantiate
                var obj_inst_dup_flag = false;
                for (var inst_index in obj_inst_tab) {
                    if (inst == obj_inst_tab[inst_index].instantiate) {
                        obj_inst_dup_flag = true;
                        break;
                    }
                    if (cls == obj_inst_tab[inst_index].class) {
                        obj_declare_index++;
                    }
                }
                if (!obj_inst_dup_flag) {
                    obj_inst_tab[inst] = {
                        instantiate: inst,
                        class: cls,
                        dir: cls.toLowerCase(),
                        declare: cls.toLowerCase() + '_' + String(obj_declare_index),
                        driver: drv_type
                    };
                }
            }
		}
		return obj_inst_tab;
    },
    generatePluginCode : function(pluginsInfo,obj_inst_tab){
        // plug-ins includes
		var plugins_includes_code = '';
		var plugins_includes_switch = '';
		var plugins_sources = [];
		for (var inst_index in obj_inst_tab) {
			for (var i in pluginsInfo[obj_inst_tab[inst_index].dir].incs) {
				plugins_includes_code += '#include "' + pluginsInfo[obj_inst_tab[inst_index].dir].incs[i] + '"\n';
			}
			for (var i in pluginsInfo[obj_inst_tab[inst_index].dir].srcs) {
				plugins_sources.push(pluginsInfo[obj_inst_tab[inst_index].dir].abs_dir + '/' + pluginsInfo[obj_inst_tab[inst_index].dir].srcs[i]);
			}
			plugins_includes_switch += ' -I"' + pluginsInfo[obj_inst_tab[inst_index].dir].rel_dir + '"';
        }
        return {code : plugins_includes_code, switch : plugins_includes_switch, source : plugins_sources};
    },
    generateIoTTask : function(sta_ssid,sta_password,enable_iot){        
		//TODO : some wifi no need password to connect internet
        return `void iotTask(void *pvParameters) {
			${(sta_ssid != '' && sta_password != '')? 'wifi_sta_start(CONFIG_WIFI_SSID, CONFIG_WIFI_PASSWORD);' : ''} 
			${(sta_ssid != '' && sta_password != '' && enable_iot === true)? 'kbiot_init(KBSERIAL, CLIENTID, USERNAME, PASSWORD);' : ''}
			vTaskDelay(500 / portTICK_RATE_MS);
			vTaskDelete(NULL);
		}`;
    },
    codeGenerate : function(rawCode,template,config){
        var codeContext = this.createCodeContext(rawCode,config);
        const entries = Object.entries(codeContext)
        const result = entries.reduce( (output, entry) => {
            const [key, value] = entry;
            const regex = new RegExp( `\\$\{${key}\}`, 'g');
            return output.replace( regex, value );
        }, template );
        return result;
    },
	createCodeContext : function(rawCode,config){
		var mac_addr = config.board_mac_addr;
		var kbmac_addr = (mac_addr.replace(/:/g, "")).toUpperCase();
		var md5_mac_addr = md5('K:' + kbmac_addr);

		// console.log('=== ' + kbmac_addr);
		// console.log(md5_mac_addr);
		
		var prime_func_code = '';
		var use_prime_func = false;

		//Log.i('building board id ' + board_id + ' (' + mac_addr + ')');

		var code = rawCode;// new Buffer(rawCodeBase64, 'base64').toString('utf8');
		// extract setup and task statements
		var var_str = '';
		var code_strlst = code.split('\n');
		var braces_cnt = 0;
		var task_code = '';
		var task_fn_name = [];
		var setup_code = '// setup\n';
		var in_func_flag = false;

		var obj_inst_tab = [];

		for (var code_str_index in code_strlst) {
            var line = code_strlst[code_str_index].replace('\n', '');
                        
            // collect plug-ins object instantiation
			var line_inst_arr = this.getPluginInstatantLine(line);
            obj_inst_tab = this.generateObjectInstantTab(line_inst_arr,config.plugins);

			// perform plug-ins object instantiate substitution
			for (var line_inst_index in line_inst_arr) {
				var obj_inst_lst = line_inst_arr[line_inst_index].obj_inst.split('.');
				if (obj_inst_lst.length == 3) {
					line = line.split(line_inst_arr[line_inst_index].obj_inst).join(obj_inst_tab[obj_inst_lst[1]].declare + '.');
				}
			}

			// find variable line
			if (line.substring(0, 4) == 'var ') {
				var_str += line.replace('var', 'double').replace(new RegExp(',', 'g'), '=0,').replace(';', '=0;') + '\n';
				line = '';
			}

			if (line.length <= 0) {
				continue;
			}

			// task function
			if (line.substring(0, 10) == 'void vTask') {
				var tmp_line = line.replace('(', ' ');
				var tmp_linelst = tmp_line.split(' ');
				task_fn_name.push(tmp_linelst[1]);
				task_code += '\n';
				in_func_flag = true;
			}

			var open_brace_cnt = line.split('{').length - 1;
			var close_brace_cnt = line.split('}').length - 1;
			braces_cnt = braces_cnt + open_brace_cnt - close_brace_cnt;

			if (in_func_flag) {
				task_code = this.gen_iot_code(task_code, line); + '\n'; // generate iot code
				use_prime_func = this.check_use_prime_func(line, use_prime_func);
				// task_code += (line + '\n');
				if (braces_cnt == 0) {
					in_func_flag = false;
				}
			} else {
				setup_code += (line + '\n');
			}
		}
		if (task_code != '') {
			task_code = task_code + '\n';
		}

        // plug-ins includes
        var pluginRes = this.generatePluginCode();
		var plugins_includes_code = pluginRes.code;
		var plugins_includes_switch = pluginRes.switch;
		var plugins_sources = pluginRes.source;		

		// plug-ins object instantiate code, ex: SHT31 sht31_0 = SHT31(64, 0x44, 1000);
		var plugins_obj_inst_code = '';
		for (var inst_index in obj_inst_tab) {
			plugins_obj_inst_code += obj_inst_tab[inst_index].class + ' ' + obj_inst_tab[inst_index].declare + ' = ' + inst_index + ';\n';
		}
		// plug-ins object registration, ex: devman_add("sht31_0", DEV_I2C1, &sht31_0);
		var plugins_obj_reg_code = '';
		for (var inst_index in obj_inst_tab) {
			plugins_obj_reg_code += '  devman_add((char *)"' + obj_inst_tab[inst_index].declare + '", ' + obj_inst_tab[inst_index].driver + ',' + ' &' + obj_inst_tab[inst_index].declare + ');\n';
		}

		// add setup code indent
		var setup_code_list = setup_code.split('\n');
		setup_code = '';
		for (var setup_code_index in setup_code_list) {
			use_prime_func = this.check_use_prime_func(setup_code_list[setup_code_index], use_prime_func);
			setup_code = this.gen_iot_code(setup_code, setup_code_list[setup_code_index]); // generate iot code
			// setup_code += '  ' + setup_code_list[setup_code_index] + '\n';
		}

		var task_fn_code = '  // create tasks\n';
		for (var task_fn_index in task_fn_name) {
			var task_fn = task_fn_name[task_fn_index];
			task_fn_code += '  xTaskCreatePinnedToCore(' + task_fn + ', "' + task_fn + '", USERAPP_STACK_SIZE_MIN, NULL, USERAPP_TASK_PRIORITY, NULL, KIDBRIGHT_RUNNING_CORE);\n';
		}

		if (use_prime_func === true) {
			prime_func_code =
				'bool check_is_prime(int num){\n' +
				'	bool isPrime = true; \n' +
				'	for(int i = 2; i <= int(sqrt(num)); ++i)\n' +
				'	{\n' +
				'		if(num % i == 0){\n' +
				'			isPrime = false;\n' +
				'			break;\n' +
				'		}\n' +
				'	}\n' +
				'	return isPrime;\n' +
				'  }\n';
		}

        var iot_task = this.generateIoTTask(config.sta_ssid,config.sta_password,config.enable_iot);        
        var code = {
            plugins_includes_code : plugins_includes_code,
            kbmac_addr : kbmac_addr,
            md5_mac_addr : md5_mac_addr,
            sta_ssid : sta_ssid,
            sta_password : sta_password,
            plugins_obj_inst_code : plugins_obj_inst_code,
            var_str : var_str,
            prime_func_code : prime_func_code,
            iot_task : iot_task,
            task_code : task_code,
            setup_code : setup_code,
            task_fn_code : task_fn_code,
            plugins_obj_reg_code : plugins_obj_reg_code
        };        
        return code;
	}
};