module.exports = {
  name: "kbide-extension-pack",
  title: "KBIDE Extensions Pack",
  description: "KBIDE Tools (Packed) Ex. Serial Monitor, Developer code preview, C/C++ Code auto format",
  auther: "Maker Asia Co.,Ltd.",
  website: "kbide.org",
  git: "",
  image: "/static/extension.jpg",
  version: "1.0.0",
  component: [
    "serial-monitor",
    "actionbar-serial"
  ],
  data: {
    loaded: false, //this will automatic set to 'true' if this pacakage loaded to IDE
  },
  persistence: {
  },
};
