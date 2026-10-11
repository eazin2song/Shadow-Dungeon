const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getAppPath: () => ipcRenderer.invoke('get-app-path'),
    saveFile: (options) => ipcRenderer.invoke('save-file', options),
    loadFile: (options) => ipcRenderer.invoke('load-file', options),
    platform: process.platform
});
