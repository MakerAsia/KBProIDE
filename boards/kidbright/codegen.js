//---- setup dir ----//
var engine = Vue.prototype.$engine;
var G = Vue.prototype.$global;

const fs = require("fs");
const md5 = engine.util.requireFunc("md5");
const log = require("./log");

var boardDirectory = `${engine.util.boardDir}/${G.board.board}`;
var platformDir = `${engine.util.platformDir}/${G.board.board_info.platform}`;
var pluginDir = `${boardDirectory}/plugin`;
//-------------------//

const driver_type_arr = ["DEV_IO", "DEV_I2C0", "DEV_I2C1", "DEV_SPI"];

module.exports = {
  listPlugin: function(dir) {
    let plugins = {};
    let catPlugins = fs.readdirSync(dir);
    if (catPlugins.length > 0) {
      catPlugins.forEach(plugin => {
        let fdir = `${dir}/${plugin}`;
        if (fs.lstatSync(fdir).isDirectory()) {
          // read source and include file
          let srcs = [];
          let incs = [];
          let files = fs.readdirSync(fdir);
          files.forEach(file => {
            if (fs.lstatSync(`${fdir}/${file}`).isFile()) {
              // source file (*.c, *.cpp)
              if (
                file.match(/\.c$/g) != null ||
                file.match(/\.cpp$/g) != null
              ) {
                srcs.push(file);
              }
              // header file (*.h, *.hpp)
              if (
                file.match(/\.h$/g) != null ||
                file.match(/\.hpp$/g) != null
              ) {
                incs.push(file);
              }
            }
          });
          // TODO : check block and generator must eq
          plugins[plugin] = {
            dir: fdir,
            incs: incs,
            srcs: srcs,
            name: plugin
          };
          log.i(
            `plugin "${plugin}" found ${incs.length} inc, ${
              srcs.length
            } src file(s)`
          );
        }
      });
    }
    return plugins;
  },

  listCategoryPlugins: function() {
    var categories = [];
    var allPlugin = {};
    var cats = fs.readdirSync(pluginDir);
    cats.forEach(cat => {
      var dir = `${pluginDir}/${cat}`;
      var infoFile = `${dir}/${cat}.json`;

      if (!fs.lstatSync(dir).isDirectory()) {
        return;
      }
      if (!fs.existsSync(infoFile)) {
        return;
      }

      var catInfoFile = JSON.parse(fs.readFileSync(infoFile));
      var plugins = this.listPlugin(dir);
      categories.push({
        directory: cat,
        plugins: plugins,
        category: catInfoFile
      });
      Object.assign(allPlugin, plugins);
    });
    return { categories: categories, plugins: allPlugin };
  },

  gen_iot_code: function(setup_code, current_setup_code) {
    let config_flag = false;
    let iot_config = [];
    let topics = [];
    let iot_code = "";

    let trim_code = current_setup_code.trim();
    if (trim_code.substring(0, 10) === "IOT_CONFIG") {
      config_flag = true;
      let current_line = JSON.parse(trim_code.substring(10, trim_code.length));
      iot_config.push(current_line);
      if (topics.indexOf(current_line["topic"]) === -1) {
        topics.push(current_line["topic"]);
      }
    } else {
      config_flag = false;
    }
    if (config_flag === false && iot_config.length !== 0) {
      for (let topics_index in topics) {
        let filtered_data = iot_config.filter(
          a => a.topic === topics[topics_index]
        );
        if (topics_index == 0) {
          iot_code += '{\\"' + topics[topics_index] + '\\":{';
        } else {
          iot_code += '},\\"' + topics[topics_index] + '\\":{';
        }
        for (let data_index in filtered_data) {
          if (data_index !== 0) {
            iot_code += ",";
          }
          iot_code += filtered_data[data_index]["data"].replace(/"/g, '\\"');
        }
        if (topics_index === topics.length - 1) {
          iot_code += "}";
        }
      }
      iot_code += "}";
      setup_code += "  " + 'kbiot_setConfig("CFG", "' + iot_code + '");\n';
      setup_code += "  " + current_setup_code + "\n";
      topics = [];
      iot_config = [];
      iot_code = "";
    } else if (config_flag === false) {
      setup_code += "  " + current_setup_code + "\n";
    }
    return setup_code;
  },
  check_use_prime_func: function(code, flag) {
    if (flag === false) {
      return code.includes("check_is_prime");
    }
    return flag;
  },
  getPluginInstatantLine: function(line) {
    let line_inst_arr = [];
    for (let dt_index in driver_type_arr) {
      let driver_type = driver_type_arr[dt_index];
      let re = new RegExp(driver_type + "\\..*?\\.", "g"); // https://www.regextester.com/94730
      let m_arr = line.match(re);
      if (m_arr != null) {
        for (let m_index in m_arr) {
          line_inst_arr.push({
            obj_inst: m_arr[m_index],
            drv_type: driver_type
          });
        }
      }
    }
    return line_inst_arr;
  },
  generateObjectInstantTab: function(line_inst_arr, obj_inst_tab) {
    if (line_inst_arr.length > 0) {
      for (let line_inst_index in line_inst_arr) {
        let obj_inst = line_inst_arr[line_inst_index].obj_inst;
        let drv_type = line_inst_arr[line_inst_index].drv_type;
        let inst = "";
        let cls = "";
        let re = new RegExp(drv_type + "\\..*?\\)", "g");
        let inst_lst = obj_inst.match(re);

        if (inst_lst != null) {
          inst = inst_lst[0].replace(drv_type + ".", "");
          let cls_lst = inst.match(/.*?\(/g);
          if (cls_lst != null) {
            cls = cls_lst[0].replace("(", "");
          }
        }

        let obj_declare_index = 0;
        // check duplicate object instantiate
        let obj_inst_dup_flag = false;
        for (let inst_index in obj_inst_tab) {
          if (inst === obj_inst_tab[inst_index].instantiate) {
            obj_inst_dup_flag = true;
            break;
          }
          if (cls === obj_inst_tab[inst_index].class) {
            obj_declare_index++;
          }
        }
        if (!obj_inst_dup_flag) {
          obj_inst_tab[inst] = {
            instantiate: inst,
            class: cls,
            dir: cls.toLowerCase(),
            declare: cls.toLowerCase() + "_" + String(obj_declare_index),
            driver: drv_type
          };
        }
      }
    }
    return obj_inst_tab;
  },
  generatePluginCode: function(pluginsInfo, obj_inst_tab) {
    // plug-ins includes
    let plugins_includes_code = "";
    let plugins_includes_switch = [];
    let plugins_sources = [];
    for (let inst_index in obj_inst_tab) {
      for (let i in pluginsInfo[obj_inst_tab[inst_index].dir].incs) {
        plugins_includes_code +=
          '#include "' +
          pluginsInfo[obj_inst_tab[inst_index].dir].incs[i] +
          '"\n';
      }
      for (let i in pluginsInfo[obj_inst_tab[inst_index].dir].srcs) {
        plugins_sources.push(
          pluginsInfo[obj_inst_tab[inst_index].dir].dir +
            "/" +
            pluginsInfo[obj_inst_tab[inst_index].dir].srcs[i]
        );
      }
      plugins_includes_switch.push(
        `-I"${pluginsInfo[obj_inst_tab[inst_index].dir].dir}"`
      );
    }
    return {
      code: plugins_includes_code,
      switch: plugins_includes_switch,
      source: plugins_sources
    };
  },
  generateIoTTask: function(sta_ssid, sta_password, enable_iot) {
    //TODO : some wifi no need password to connect internet
    return `void iotTask(void *pvParameters) {
			${
        sta_ssid !== "" && sta_password !== ""
          ? "wifi_sta_start(CONFIG_WIFI_SSID, CONFIG_WIFI_PASSWORD);"
          : ""
      } 
			${
        sta_ssid !== "" && sta_password !== "" && enable_iot === true
          ? "kbiot_init(KBSERIAL, CLIENTID, USERNAME, PASSWORD);"
          : ""
      }
			vTaskDelay(500 / portTICK_RATE_MS);
			vTaskDelete(NULL);
}`;
  },
  generate: function(rawCode) {
    let template = fs.readFileSync(`${boardDirectory}/template.c`, "utf8");
    let config = {
      board_mac_addr: "Insert board MAC address here",
      sta_ssid: "",
      sta_password: "",
      enable_iot: false
    };
    if (G.board.package["kidbright-actionbar"]) {
      config.sta_ssid = G.board.package["kidbright-actionbar"].wifi_ssid;
      config.sta_password =
        G.board.package["kidbright-actionbar"].wifi_password;
      config.enable_iot = G.board.package["kidbright-actionbar"].enable_iot;
    }
    return this.codeGenerate(rawCode, template, config);
  },
  codeGenerate: function(rawCode, template, config) {
    //--- list plugins dependency ---//
    let categoriesInfo = this.listCategoryPlugins();
    let plugins = categoriesInfo.plugins;

    let codeContext = this.createCodeContext(rawCode, config, plugins);
    const entries = Object.entries(codeContext);
    const result = entries.reduce((output, entry) => {
      const [key, value] = entry;
      const regex = new RegExp(`\\$\{${key}\}`, "g");
      return output.replace(regex, value);
    }, template);
    return { sourceCode: result, codeContext: codeContext };
  },
  createCodeContext: function(code, config, pluginsInfo) {
    //require config.board_mac_addr
    //option  config.sta_ssid, config.sta_password, config.enable_iot
    const mac_addr = config.board_mac_addr;
    const kbmac_addr = mac_addr.replace(/:/g, "").toUpperCase();
    const md5_mac_addr = md5("K:" + kbmac_addr);

    let prime_func_code = "";
    let use_prime_func = false;

    // extract setup and task statements
    let var_str = "";
    let code_strlst = (code)? code.split("\n") : "";
    let braces_cnt = 0;
    let task_code = "";
    let task_fn_name = [];
    let setup_code = "// setup\n";
    let in_func_flag = false;

    let obj_inst_tab = [];

    for (let code_str_index in code_strlst) {
      let line = code_strlst[code_str_index].replace("\n", "");

      // collect plug-ins object instantiation
      let line_inst_arr = this.getPluginInstatantLine(line);
      obj_inst_tab = this.generateObjectInstantTab(line_inst_arr, obj_inst_tab);

      // perform plug-ins object instantiate substitution
      for (let line_inst_index in line_inst_arr) {
        let obj_inst_lst = line_inst_arr[line_inst_index].obj_inst.split(".");
        if (obj_inst_lst.length === 3) {
          line = line
            .split(line_inst_arr[line_inst_index].obj_inst)
            .join(obj_inst_tab[obj_inst_lst[1]].declare + ".");
        }
      }

      // find variable line
      if (line.substring(0, 4) === "var ") {
        var_str +=
          line
            .replace("var", "double")
            .replace(new RegExp(",", "g"), "=0,")
            .replace(";", "=0;") + "\n";
        line = "";
      }

      if (line.length <= 0) {
        continue;
      }

      // task function
      if (line.substring(0, 10) === "void vTask") {
        let tmp_line = line.replace("(", " ");
        let tmp_linelst = tmp_line.split(" ");
        task_fn_name.push(tmp_linelst[1]);
        task_code += "\n";
        in_func_flag = true;
      }

      let open_brace_cnt = line.split("{").length - 1;
      let close_brace_cnt = line.split("}").length - 1;
      braces_cnt = braces_cnt + open_brace_cnt - close_brace_cnt;

      if (in_func_flag) {
        task_code = this.gen_iot_code(task_code, line) + "\n"; // generate iot code
        use_prime_func = this.check_use_prime_func(line, use_prime_func);
        // task_code += (line + '\n');
        if (braces_cnt === 0) {
          in_func_flag = false;
        }
      } else {
        setup_code += line + "\n";
      }
    }
    if (task_code !== "") {
      task_code = task_code + "\n";
    }

    // plug-ins includes
    let pluginRes = this.generatePluginCode(pluginsInfo, obj_inst_tab);
    let plugins_includes_code = pluginRes.code;
    let plugins_includes_switch = pluginRes.switch;
    let plugins_sources = pluginRes.source;

    // plug-ins object instantiate code, ex: SHT31 sht31_0 = SHT31(64, 0x44, 1000);
    let plugins_obj_inst_code = "";
    for (let inst_index in obj_inst_tab) {
      plugins_obj_inst_code += `${obj_inst_tab[inst_index].class} ${
        obj_inst_tab[inst_index].declare
      } = ${inst_index};\n`;
    }
    // plug-ins object registration, ex: devman_add("sht31_0", DEV_I2C1, &sht31_0);
    let plugins_obj_reg_code = "";
    for (let inst_index in obj_inst_tab) {
      plugins_obj_reg_code += `  devman_add((char *)"${
        obj_inst_tab[inst_index].declare
      }",${obj_inst_tab[inst_index].driver},&${
        obj_inst_tab[inst_index].declare
      });\n`;
    }

    // add setup code indent
    var setup_code_list = setup_code.split("\n");
    setup_code = "";
    for (var setup_code_index in setup_code_list) {
      use_prime_func = this.check_use_prime_func(
        setup_code_list[setup_code_index],
        use_prime_func
      );
      setup_code = this.gen_iot_code(
        setup_code,
        setup_code_list[setup_code_index]
      ); // generate iot code
    }

    let task_fn_code = "  // create tasks\n";
    for (let task_fn_index in task_fn_name) {
      let task_fn = task_fn_name[task_fn_index];
      task_fn_code += `  xTaskCreatePinnedToCore(${task_fn}, "${task_fn}", USERAPP_STACK_SIZE_MIN, NULL, USERAPP_TASK_PRIORITY, NULL, KIDBRIGHT_RUNNING_CORE);\n`;
    }

    if (use_prime_func === true) {
      prime_func_code = `bool check_is_prime(int num){				
				for(int i = 2; i <= int(sqrt(num)); ++i){
					if(num % i == 0){
						return false;
					}
				}
				return true;
			}\n`;
    }

    var iot_task = this.generateIoTTask(
      config.sta_ssid,
      config.sta_password,
      config.enable_iot
    );
    return {
      plugins_includes_code: plugins_includes_code,
      kbmac_addr: kbmac_addr,
      md5_mac_addr: md5_mac_addr,
      sta_ssid: config.sta_ssid,
      sta_password: config.sta_password,
      plugins_obj_inst_code: plugins_obj_inst_code,
      var_str: var_str,
      prime_func_code: prime_func_code,
      iot_task: iot_task,
      task_code: task_code,
      setup_code: setup_code,
      task_fn_code: task_fn_code,
      plugins_obj_reg_code: plugins_obj_reg_code,
      plugins_includes_switch: plugins_includes_switch,
      plugins_sources: plugins_sources
    };
  }
};
