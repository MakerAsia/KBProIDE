const electron = require("electron");
electron.ipcRenderer.on("compile-logs", () => {
    Vue.prototype.$global.ui.addBottomTab("compile-logs","Compile Logs","./components/compile_logs/CompileLogs");
});
export default {
    name : 'compile_logs',
    index : 0,
    description : "no have",
    tooltip : 'Compile Logs',
    persistence:{
        opened : true
    },
    data:{

    }
}