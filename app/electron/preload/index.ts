/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";
contextBridge.exposeInMainWorld("api", {
  // send_message: () => ipcRenderer.invoke("send-message"),
  onQr: (callback: any) => ipcRenderer.on("qr", callback),
  onReady: (callback: any) => ipcRenderer.on("ready", callback),
  onAuthenticated: (callback: any) => ipcRenderer.on("authenticated", callback),
  send: (channel: string, data: unknown) => ipcRenderer.invoke(channel, data),
  clearListeners: (channel: string) => ipcRenderer.removeAllListeners(channel),
});
