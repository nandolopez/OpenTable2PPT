import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import * as fs from "fs";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  //Allow console while I delevelop this
    win.webContents.openDevTools();
  //Remove menus
  win.menuBarVisible = false
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('ready',()=>{
   //Checking if directory exists
   const LocalAPPDir = app.getPath("userData")
   const DatabaseSource = path.join(path.dirname(__filename), "database.json");
   const DatabasePath = path.join(LocalAPPDir, "database.json");
 
   if (!fs.existsSync(DatabasePath)) {
     fs.copyFileSync(DatabaseSource, DatabasePath );
   }
   
   ipcMain.handle('getDatabase', (event, args) => {
     let result = undefined
     if(fs.existsSync(DatabasePath)){
       const rawData = fs.readFileSync(DatabasePath)
       result = JSON.parse(rawData.toString())
     }
     return result
   });
 
   ipcMain.handle('updateDatabase', (event, args) => {
    fs.writeFileSync(DatabasePath, JSON.stringify(args[0]))
   });
 
})

app.whenReady().then(createWindow)
