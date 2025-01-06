const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs-extra");

const dataFilePath = path.join(app.getPath("downloads"), "ducks.json");
console.log("Data file path:", dataFilePath);

let mainWindow;

// Electron browser window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "/preload.js"),
    },
  });
  mainWindow.loadURL("http://localhost:5173");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

ipcMain.handle("load-data", async () => {
  try {
    console.log("Attempting to load data from:", dataFilePath);
    const data = await fs.readJson(dataFilePath);
    console.log("Data loaded successfully:", data);
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    return [];
  }
});

ipcMain.handle("save-data", async (_, data) => {
  try {
    await fs.writeJson(dataFilePath, data);
  } catch (error) {
    console.error("Error writing JSON file:", error.message);
  }
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
