export interface PrivateMessageData {
  numbers: string;
  body: string;
}

export interface PrivateMediaData {
  number: string;
  body: string;
  file: string;
}

export interface DuplicateGroupData {
  toDuplicate: string;
  name: string;
}

export interface GroupMessageData {
  groupName: string;
  body: string;
}
export interface GroupMediaMessage {
  groupname: string;
  body: string;
  url: string;
}
