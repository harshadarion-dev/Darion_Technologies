const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Preload any required channel APIs or safe events here if we need them later
});
