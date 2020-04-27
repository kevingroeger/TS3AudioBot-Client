const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const remote = require('electron').remote
const config = require('electron-json-config')
const yts = require('yt-search')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      allowRunningInsecureContent: true,
      plugins: true,
      webSecurity: false
    },
    resizable: false
  })

  mainWindow.loadURL('http://localhost:3000')

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
