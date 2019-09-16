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
    fontSize: "24",
    theme: "vs-dark"
  },
  data: {
    Blockly: null,
    workspace: null,
    CodeMirror: null,
    Editor: null
  }
};
