const { contextBridge, ipcRenderer } = require("electron");
console.log("Preload script loaded");

contextBridge.exposeInMainWorld("electronAPI", {
  loadData: () => ipcRenderer.invoke("load-data"),
  saveData: (data) => ipcRenderer.invoke("save-data", data),
});
