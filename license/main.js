const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
    const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  Menu.setApplicationMenu(null);

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
