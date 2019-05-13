module.exports = {
  name: "arduino-esp32-actionbar",
  title: "Arduino-esp32 actionbar",
  description: "Actionbar setting menu for arduino-esp32",
  auther: "Comdet Pheaudphut",
  website: "?",
  git: "",
  image: "",
  version: "1.0.0",
  component: [
    "actionbar-just-compile",
    "actionbar-build",
    "actionbar-setting",
  ],
  data: {
    wifi_ssid: "",
    wifi_password: "",
    comport: "",
    baudrate: 921600,
    cflag: "",
    loaded: false, //this will automatic set to 'true' if this pacakage loaded to IDE
  },
  persistence: {
    test: true,
  },
};
