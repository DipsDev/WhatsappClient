import {
  Chat,
  GroupChat,
  GroupParticipant,
  MessageMedia,
} from "whatsapp-web.js";
import { sendMessageFromClient } from "./index";
import { Client, LocalAuth } from "whatsapp-web.js";
const COOLDOWN_BETWEEN_MESSAGES = 5; // In seconds

let executablePath =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

if (!__dirname.includes("resources")) {
  executablePath = undefined;
}

const client = new Client({
  puppeteer: {
    headless: false,
    executablePath: executablePath,
  },
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr: string) => {
  console.log("WClient QR Created!");
  sendMessageFromClient("qr", qr);
});

client.on("ready", () => {
  console.log("WClient is ready!");
  sendMessageFromClient("ready", true);
});

client.on("authenticated", (session) => {
  console.log(
    session ? `Authenticated! With ${session}` : "Authenticated with local data"
  );
  sendMessageFromClient("authenticated", true);
});

client.initialize();

export async function getCurrentProfileData() {
  // Fetch the username and profile pic
  try {
    const url = await client.getProfilePicUrl(client.info.wid._serialized);
    const name = client.info.pushname;
    return {
      url,
      name,
    };
  } catch {
    return {};
  }
}

export const exportChat = async (chatId: string) => {
  console.log(chatId);
};

export const sendMessage = async (numbers: string, body: string) => {
  // Send a message to anybody in the list
  try {
    const numberList = numbers.split(" ");

    for (let i = 0; i < numberList.length; i++) {
      const id = await client.getNumberId(numberList[i].replace("0", "972"));
      await client.sendMessage(id?._serialized as string, body);
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const getGroups = async () => {
  // fetch groups
  try {
    const chats = await client.getChats();
    return chats.filter((v: Chat) => v.isGroup);
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const sendMedia = async (number: string, body: string, file: string) => {
  // send media
  try {
    const id = await client.getNumberId(number.replace("0", "972"));
    const media = await MessageMedia.fromUrl(file);
    await client.sendMessage(id?._serialized as string, media, {
      caption: body,
    });
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const duplicateGroup = async (groupId: string, newName: string) => {
  try {
    const group = (await client.getChatById(groupId)) as GroupChat;
    const createdId = await client.createGroup(newName, [
      group.participants[0].id._serialized,
    ]);
    const createdGroup = (await client.getChats()).filter(
      (v: Chat) => v.id._serialized === createdId.gid
    )[0];
    const participantsIds: string[] = [];
    for (let i = 1; i < group.participants.length; i++) {
      if (group.participants[i].id.user !== client.info.wid.user)
        participantsIds.push(group.participants[i].id._serialized);
    }
    return (createdGroup as GroupChat).addParticipants(participantsIds);
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const groupMessage = async (groupid: string, body: string) => {
  try {
    const chat = await client.getChatById(groupid);
    const group: GroupChat = chat as GroupChat;
    const participants: GroupParticipant[] = group.participants;
    for (let i = 0; i < participants.length; i++) {
      await sleep(COOLDOWN_BETWEEN_MESSAGES * 1000);
      if (participants[i].id._serialized !== client.info.wid._serialized)
        await client.sendMessage(participants[i].id._serialized, body);
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const mediaGroup = async (
  groupid: string,
  body: string,
  url: string
) => {
  try {
    const media = await MessageMedia.fromUrl(url);
    const chat = await client.getChatById(groupid);
    const group: GroupChat = chat as GroupChat;
    const participants: GroupParticipant[] = group.participants;
    for (let i = 0; i < participants.length; i++) {
      await sleep(COOLDOWN_BETWEEN_MESSAGES * 1000);
      if (participants[i].id._serialized !== client.info.wid._serialized)
        await client.sendMessage(participants[i].id._serialized, media, {
          caption: body,
        });
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const logoutClient = async () => {
  await client.logout();
  setTimeout(() => {
    client.initialize();
  }, 2000);
};
