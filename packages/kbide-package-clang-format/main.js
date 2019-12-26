const execSync = require('child_process').execSync;
const os = require('os');
const path = require('path');
const engine = Vue.prototype.$engine;
const fs = require('fs');

const getNativeBinary = function() {
  let nativeBinary;

  if (os.platform() === 'win32') {
    nativeBinary = `${engine.util.packageDir}/kbide-package-clang-format/bin/win32/clang-format.exe`;
  } else {
    nativeBinary = `${engine.util.packageDir}/kbide-package-clang-format/bin/${os.platform()}_${os.arch()}/clang-format`;
  }

  if (!fs.existsSync(nativeBinary)) {
    const message = 'This module doesn\'t bundle the clang-format executable for your platform. ' +
        `(${os.platform()}_${os.arch()})\n` +
        'Consider installing it with your native package manager instead.\n';
    throw new Error(message);
  }

  return nativeBinary;
}

const getEndJSONPosition = (text) => {
    for (let i = 0; i < text.length; i += 1) {
      if ((text[i] === '\n') || (text[i] === '\r')) {
        return i + 1;
      }
    }
    return -1;
}

const getReturnedFormattedText = stdout => stdout.slice(getEndJSONPosition(stdout));

const format = function(sourcecode){
    let exe = getNativeBinary();
    let cwd = `${engine.util.packageDir}/kbide-package-clang-format`;
    const options = {
      style: 'file',
      'sort-includes' : 'false'
    };
    const args = Object.keys(options).reduce((memo, optionKey) => {
      const optionValue = options[optionKey];
      if (optionValue) {
        return `${memo}-${optionKey}="${optionValue}" `;
      }
      return memo;
    }, '');
    const execOptions = { input: sourcecode, cwd : cwd};
    try {
      //console.log(`"${exe}" ${args}`);
      const stdout = execSync(`"${exe}" ${args}`, execOptions).toString();
      //return getReturnedFormattedText(stdout);
      return stdout;
    } catch (error) {
    	console.log(error);
      if (error.message.indexOf('Command failed:') < 0) {
        throw error;
      } else {
      	//throw error;
      	console.error('Clang Format Command Failed');
      	console.error(`Error message: "${error.stderr.toString()}".\nWhen running: "${exe} ${args}".\nStdout was: "${error.stdout.toString()}"`);
      }
    }
}

module.exports = format;
