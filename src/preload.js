const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "api", {
    send: (channel, data) => {
      const validChannels = ["get-battery", "get-devices", "donate", "set-window-default", "get-window-default"];
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    receive: (channel, cb) => {
      const validChannels = ["send-battery", "get-devices", "donate", "set-window-default", "get-window-default"];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, ...args) => cb(...args));
      }
    }
  }
);