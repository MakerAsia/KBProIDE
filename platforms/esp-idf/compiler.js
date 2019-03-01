var G = {};
module.exports = {
    setConfig : (AppContext) => {
        const app_dir = `${AppContext.user_app_dir}/${AppContext.board_name}`
        G = Object.assign({}, AppContext)
        G.compiler = ''
        G.Log = require('./log')
        G.esptool = AppContext.esptool
        G.board_name = AppContext.board_name
        G.toolchain_dir = AppContext.toolchain_dir
        G.COMPILER_AR = `${G.toolchain_dir}/xtensa-esp32-elf-ar`
        G.COMPILER_GCC = `${G.toolchain_dir}/xtensa-esp32-elf-gcc`
        G.COMPILER_CPP = `${G.toolchain_dir}/xtensa-esp32-elf-c++`
        G.user_app_dir = app_dir
        G.ELF_FILE = `${app_dir}/${G.board_name}.elf`
        G.BIN_FILE = `${app_dir}/${G.board_name}.bin`
        G.ARCHIVE_FILE = `${G.user_app_dir}/libmain.a`
        G.PROCESS_DIR = AppContext.process_dir || `${__dirname}/../..`
        G.ospath = ospath
        console.log(`process_dir=${G.process_dir}`)
    }
}