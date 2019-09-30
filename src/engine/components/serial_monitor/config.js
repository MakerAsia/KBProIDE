const electron = require("electron");
electron.ipcRenderer.on("serial-monitor", () => {
    Vue.prototype.$global.ui.addBottomTab('serial-monitor','Serial Monitor','./components/serial_monitor/SerialMonitor');
});
export default {
    name : 'serial_monitor',
    index : 0,
    description : "no have",
    tooltip : 'Serial Monitor',
    persistence:{
        port : '',
        baudrate : 115200
    },
    data:{

    }
}