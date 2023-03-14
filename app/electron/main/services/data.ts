import { ipcMain } from "electron";
import { getCurrentProfileData, getGroups } from "../whatsapp";

ipcMain.handle("get-groups", () => {
  return getGroups();
});

ipcMain.handle("get-current-data", () => {
  return getCurrentProfileData();
});
