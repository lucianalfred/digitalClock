const { app, BrowserWindow} = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () =>{
    mainWindow = new BrowserWindow({
        width: 400,
        height: 300,
        resizable:false,
        webPreferences: {
            preload:path.join(__dirname, 'src/script.js'),
            nodeIntegration: true
        }
    });
});

mainWindow.loadFile('src/index.html');

mainWindow.setMenu(null);

mainWindow.on('closed', () => {
    mainWindow = null;
});


app.on('window-all-closed', ()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate', ()=>{
    if(BrowserWindow.getAllWindows().length === 0){
        createMainWindow();
    }
});
