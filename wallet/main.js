const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    backgroundColor: "#0b0f19",

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  Menu.setApplicationMenu(null);
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
