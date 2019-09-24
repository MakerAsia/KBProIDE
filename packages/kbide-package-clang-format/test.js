const os = require('os');
const path = require('path');
const fs = require('fs');

const format = require('./main');

fs.readFile('test.cpp','utf8', function(err, data) {
    let res = format(data);
    console.log(res);
});