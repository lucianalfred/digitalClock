const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'src/script.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'src/index.html'));
  
  // Remover o menu padrão (opcional)
  mainWindow.setMenu(null);
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Sair quando todas as janelas forem fechadas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
