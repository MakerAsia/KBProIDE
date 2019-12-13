import Vue from "vue";

const { app, Menu, shell, BrowserWindow } = require("electron");
var isMac = process.platform === "darwin";
const template = [
  ...(process.platform === "darwin"
    ? [
      {
        label: app.getName(),
        submenu: [
          { role: "about" },
          { type: "separator" },
          { role: "services" },
          { type: "separator" },
          { role: "hide" },
          { role: "hideothers" },
          { role: "unhide" },
          { type: "separator" },
          { role: "quit" }
        ]
      }
    ]
    : []),
  {
    label: "File",
    submenu: [
      {
        label: "New",
        accelerator: "CmdOrCtrl+N",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("file-new");
        }
      },
      {
        label: "Open",
        accelerator: "CmdOrCtrl+O",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("file-open");
        }
      },
      {
        label: "Save as",
        accelerator: "CmdOrCtrl+S",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("file-save");
        }
      },
      { type: "separator" },
      {
        label: "Open Board folder",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("file-board-folder");
        }
      },
      {
        label: "Open Platform folder",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send(
            "file-platform-folder");
        }
      },
      {
        label: "Open Plugin folder",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("file-plugin-folder");
        }
      },
      { type: "separator" },
      {
        label: "Setting",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("file-setting",
            "");
        }
      },
      { type: "separator" },
      isMac
        ? { role: "close" }
        : { role: "quit" }
    ]
  },
  // { role: 'editMenu' }
  {
    label: "Edit",
    submenu: [
      {
        label: "Undo",
        accelerator: "CmdOrCtrl+Z",
        registerAccelerator: false,
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("edit-undo");
        }
      },
      {
        label: "Redo",
        accelerator: "CmdOrCtrl+Y",
        registerAccelerator: false,
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("edit-redo");
        }
      },
      { type: "separator" },
      {
        label: "Cut",
        accelerator: "CmdOrCtrl+X",
        registerAccelerator: false,
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("edit-cut");
        }
      },
      {
        label: "Copy",
        accelerator: "CmdOrCtrl+C",
        registerAccelerator: false,
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("edit-copy");
        }
      },
      {
        label: "Paste",
        accelerator: "CmdOrCtrl+V",
        registerAccelerator: false,
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("edit-paste");
        }
      },
      { type: "separator" },
      {
        label: "Find",
        accelerator: "CmdOrCtrl+F",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("edit-find");
        }
      },
      {
        label: "Replace",
        accelerator: "CmdOrCtrl+H",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("edit-replace");
        }
      },
      {
        label: "Reformat Code",
        accelerator: "CmdOrCtrl+Shift+F",
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send("clang-format");
        }
      }
    ]
  },
  // { role: 'viewMenu' }
  {
    label: "View",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { role: "toggledevtools" },
      { type: "separator" },
      { role: "resetzoom" },
      { role: "zoomin" },
      { role: "zoomout" },
      { type: "separator" },
      { role: "togglefullscreen" }
    ]
  },
  {
    label: "Tools",
    submenu: [
    ]
  },
  // { role: 'windowMenu' }
  {
    label: "Window",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
          { type: "separator" },
          { role: "front" },
          { type: "separator" },
          { role: "window" }
        ]
        : [
          { role: "close" }
        ])
    ]
  },
  {
    role: "help",
    submenu: [
      {
        label: "Learn More",
        click() { shell.openExternal("https://www.kbide.org"); }
      },
      {
        label: "About",
        click() { shell.openExternal("https://www.kbide.org/about"); }
      },
      {
        label: "IDE Tour",
        click() { BrowserWindow.getFocusedWindow().webContents.send("help-tour"); }
      },
      { type: "separator" },
      {
        label: "Update",
        click() {
          BrowserWindow.getFocusedWindow().webContents.send("help-update");
        }
      }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
