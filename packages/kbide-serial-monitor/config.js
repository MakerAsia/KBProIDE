module.exports = {
  name: "kbide-serial-monitor",
  title: "KBIDE Serial Monitor",
  description: "Serial monitor",
  auther: "Comdet Pheaudphut",
  website: "kbide.org",
  git: "",
  image: "",
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
