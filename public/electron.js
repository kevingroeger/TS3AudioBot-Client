const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const isDev = require('electron-is-dev')

let mainWindow

const path = require('path')
const url = require('url')
const remote = require('electron').remote
const config = require('electron-json-config')
const yts = require('yt-search')

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
      allowRunningInsecureContent: true,
      plugins: true,
      webSecurity: false
    },
    resizable: false
  })
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  mainWindow.on('closed', () => (
    mainWindow = null
  ))
}
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
