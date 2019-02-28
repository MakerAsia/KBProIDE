#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const codegen = require('./codeGenerator')
const compiler = require('./compiler.js')

let context = JSON.parse(fs.readFileSync('./context.json').toString())

rawCode = fs.readFileSync('test_code.cpp','utf8');
var template = fs.readFileSync('template.c','utf8');
var code = codegen.codeGenerate(rawCode,context,template);
fs.writeFileSync(`./build/${context.board_name}/user_app.cpp`,code,'utf8');

context.process_dir = './'
context.toolchain_dir = `${context.toolchain}/xtensa-esp32-elf/bin`
context.esptool = `${context.toolchain}/esptool`
context.compiler.plugins_sources.push(`${context.user_app_dir}/${context.board_name}/user_app.cpp`)

var commonmk = fs.readFileSync(context.process_dir + 'lib/common.mk', 'utf8');
commonmk = commonmk.replace(new RegExp(/\$\(RELEASE_DIR\)/, 'g'), context.library_dir);
// extract RELEASE_DIR, CFLAG+=, LDFLAGS+=
var cflags = (/CFLAGS\+=(.*?)\r/gm.exec(commonmk)[1]).split(' ');
var ldflags = (/LDFLAGS\+=(.*?)\r/gm.exec(commonmk)[1]).split(' ');
context.compiler.ldflags = ldflags.join(' ');
context.compiler.cflags = cflags.join(' ')
compiler.setConfig(context)
compiler.compileProgram(context.compiler)
compiler.archiveProgram(context.compiler)
compiler.linkObject(context.compiler)
compiler.createBin()

//                    .then(() => Xtensa.createBin())
/*const createCompiler = (AppContext) => {
    const _Compiler = function () {
        this.compile = ({cflags, plugins_includes_switch, plugins_sources, ldflags}) => {
            let promise = new Promise((resolve, reject) => {
                Xtensa.setConfig(AppContext)
                Xtensa.compileProgram({plugins_sources, cflags, plugins_includes_switch})
                    .then(() => Xtensa.archiveProgram({plugins_sources}))
                    .then(() => Xtensa.linkObject({ldflags}))
                    .then(() => Xtensa.createBin())
                    .then(() => {
                        resolve()
                    })
                    .catch(reject)
            })
            return promise
        }
    }
    return new _Compiler;
}*/