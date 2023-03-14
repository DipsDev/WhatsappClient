import { ipcMain } from "electron";
import { IpcMainInvokeEvent } from "electron";
import {
  sendMedia,
  sendMessage,
  groupMessage,
  duplicateGroup,
  exportChat,
  mediaGroup,
} from "../whatsapp";
import {
  DuplicateGroupData,
  PrivateMediaData,
  PrivateMessageData,
  GroupMessageData,
  GroupMediaMessage,
} from "./types";

ipcMain.handle(
  "dup_group",
  (__event: IpcMainInvokeEvent, data: DuplicateGroupData) => {
    return duplicateGroup(data.toDuplicate, data.name);
  }
);

ipcMain.handle(
  "private_send",
  (__event: IpcMainInvokeEvent, data: PrivateMessageData) => {
    return sendMessage(data.numbers, data.body);
  }
);

ipcMain.handle(
  "media_send",
  (__event: IpcMainInvokeEvent, data: PrivateMediaData) => {
    return sendMedia(data.number, data.body, data.file);
  }
);

ipcMain.handle(
  "group_send",
  (__event: IpcMainInvokeEvent, data: GroupMessageData) => {
    return groupMessage(data.groupName, data.body);
  }
);
ipcMain.handle(
  "group_media",
  (__event: IpcMainInvokeEvent, data: GroupMediaMessage) => {
    return mediaGroup(data.groupname, data.body, data.url);
  }
);

ipcMain.handle("export_chat", (__event: IpcMainInvokeEvent, data: any) => {
  return exportChat(data.chatId);
});
