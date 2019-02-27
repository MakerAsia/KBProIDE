#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const compiler = require('./codeGenerator')

let context = JSON.parse(fs.readFileSync('./context.json').toString())

rawCode = fs.readFileSync('test_code.cpp','utf8');
var template = fs.readFileSync('template.c','utf8');
var code = compiler.codeGenerate(rawCode,context,template);
fs.writeFileSync('user_code.cpp',code,'utf8');