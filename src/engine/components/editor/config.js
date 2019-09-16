export default {
  name: "editor",
  index: 0,
  description: "no have",
  tooltip: "Change Editor",
  persistence: {
    mode: 1,
    blockCode: "",
    sourceCode: "",
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
    }
  },
  data: {
    Blockly: null,
    workspace: null,
    CodeMirror: null,
    Editor: null
  }
};
