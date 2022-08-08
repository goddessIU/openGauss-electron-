const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI',{
  openFile: (sql) => ipcRenderer.invoke('openSql', sql)
})