const path = require("path");
const rootDir = __dirname; // require('electron-root-path').rootPath;

let baseDir = "";

if (process.env.NODE_ENV === "development") {
  if (process.platform === "win32") {
    baseDir = rootDir + "/../../../../../..";
  } else if (process.platform === "darwin") {
    baseDir = rootDir + "/../../../../../../../..";
  } else if (process.platform === "linux") {
    baseDir = rootDir + "/../../../../../..";
  }
} else {
  if (process.platform === "win32") {
    baseDir = rootDir + "/../..";
  } else if (process.platform === "darwin") {
    baseDir = rootDir + "/../..";
  } else if (process.platform === "linux") {
    baseDir = rootDir + "/../..";
  }
}

baseDir = path.resolve(baseDir);

export default {
  name: "editor",
  index: 0,
  description: "no have",
  tooltip: "Change Editor",
  persistence: {
    mode: 1,
    blockCode: "",
    sourceCode: "",
    previewSourceCode : "",
    rawCode: "",
    rawCodeMode: false,
    rollbackMode: 0,
    fontSize: "24",
    theme: "vs-dark",
    editor_options: {
      automaticLayout: true,
      lineNumbers: "on",
      scrollBeyondLastLine: false,
      readOnly: false
    },
    clangFormatFrom: "clang_source.js",
    baseDir: baseDir,
    consoleDisplay: true
  },
  data: {
    Blockly: null,
    workspace: null,
    CodeMirror: null,
    Editor: null
  }
};
