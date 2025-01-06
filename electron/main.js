const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs-extra");

const dataFilePath = path.join(app.getPath("downloads"), "ducks.json");

let mainWindow;

// Electron browser window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "electron/preload.js"),
    },
  });
  // loading the react application
  mainWindow.loadURL("http://localhost:5173");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

ipcMain.handle("load-data", async () => {
  try {
    const data = await fs.readJson(dataFilePath);
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    return [];
  }
});
ipcMain.handle("save-data", async (_, data) => {
  await fs.writeJson(dataFilePath, data);
});

// Electron lifecycle events
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
