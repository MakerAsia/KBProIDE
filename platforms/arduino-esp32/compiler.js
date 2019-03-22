const util = require('util');
const fs = require('fs');
var engine = Vue.prototype.$engine;
//---- setup dir and config ----//
var platformName = 'arduino-esp32';
var motherPlatform = 'esp-idf';

var motherPlatformDir = `${engine.util.platformDir}/${motherPlatformDir}`;
var platformDir = `${engine.util.platformDir}/${platformName}`;
var platformLibDir = `${platformDir}/lib`;
//---- idf platform ----//
const idf = require(`${motherPlatformDir}/compiler`);

var G = {};

const setConfig = (context) => {
    let localContext = JSON.parse(fs.readFileSync(`${platformDir}/context.json`,'utf8'))
    G = Object.assign({}, localContext)
    G.board_name = context.board_name   //require boardname
    G.app_dir = context.app_dir         //require app_dir
    G.process_dir = context.process_dir //require working dir

    G.cflags = G.cflags.map(f => f.replace('-Ilib',`-I"${platformDir}/lib`)+'"')
    G.ldflags = G.ldflags.map(f => f.startsWith("-Llib") ? (f.replace('-Llib',`-L"${platformDir}/lib`)+'"') : f);
    G.ldflags = G.ldflags.map(f => f.startsWith("lib/") ? ('"' + f.replace("lib/",`${platformDir}/lib/`)+'"') : f);
    
    idf.setConfig(context);
}

const compileFiles = function (sources, boardCppOptions, boardcflags, plugins_includes_switch){
    let cflags = G.cflags.concat(boardcflags);
    let cppOptions = G.cpp_options.concat(boardCppOptions);    
    return idf.compileFiles(sources,cppOptions,cflags,plugins_includes_switch);
}

function archiveProgram(plugins_sources) {
    return idf.archiveProgram(plugins_sources);
}

function linkObject(ldflags) {
    let flags = G.ldflags.concat(ldflags);
    return idf.linkObject(ldflags)
}

function createBin(flash_mode="dio",flash_freq="40m",flash_size="4MB") {    
    return idf.createBin(flash_mode,flash_freq,flash_size);
}

function flash(port, baudrate, stdio, partition,flash_mode="dio",flash_freq="40m") {
    return idf.flash(port, baudrate, stdio, partition,flash_mode,flash_freq);
}

module.exports = {
    setConfig,
    createBin,
    linkObject,
    archiveProgram,
    readMac,
    flash,
    compileFiles
}