const PREFIX = "::";

export enum FormTypes {
  Text = "TEXT",
  Number = "NUMBER",
  Group = "GROUP",
  Textarea = "TEXTAREA",
}
export interface ClientFunction {
  id: string;
  label: string;
  description: string;
  catg: string;
  formFields: {
    data: Record<string, FormTypes>;
    translatedLabels: string[];
  };
}

export interface ClientCategory {
  hebrew: string;
  english: string;
}

export interface Command {
  name: string;
  command_executer: string; // For example: ::echo abc
  description: string;
  id: string;
}

export const BaseCommands: Command[] = [
  {
    name: "echo",
    command_executer: `${PREFIX}echo`,
    description: "חוזר אחרי מה שאתה כותב",
    id: "echo_message",
  },
  {
    name: "credit",
    command_executer: `${PREFIX}c`,
    description: "נותן קרדיט על שימוש בתוכנה זאת",
    id: "credit_me",
  },
  {
    name: "test",
    command_executer: `${PREFIX}test`,
    description: "בדיקה",
    id: "test_command",
  },
];

export const ClientCategories: ClientCategory[] = [
  {
    hebrew: "קבוצות",
    english: "groups",
  },
  {
    hebrew: "פרטי",
    english: "private",
  },
  {
    hebrew: "שימושי",
    english: "util",
  },
];

export const ClientFunctions: ClientFunction[] = [
  {
    id: "private_send",
    label: "שליחת הודעה בפרטי",
    description: "שלח הודעה בצ'אט הפרטי למספר בווצאפ",
    catg: "private",
    formFields: {
      data: {
        numbers: FormTypes.Text,
        body: FormTypes.Textarea,
      },
      translatedLabels: [
        "המספרים לשלוח להם, הפרד כל מספר עם רווח",
        "גוף ההודעה",
      ],
    },
  },
  {
    id: "media_send",
    label: "שליחת מדיה בפרטי",
    description: "שלח הודעה עם תמונה מצורפת למספר בוצצאפ",
    catg: "private",
    formFields: {
      data: {
        number: FormTypes.Text,
        body: FormTypes.Textarea,
        file: FormTypes.Text,
      },
      translatedLabels: ["מספר טלפון ", "תוכן ההודעה", "קישור למדיה"],
    },
  },
  {
    id: "dup_group",
    label: "שיכפול קבוצה",
    description: "בחר קבוצה ושכפל את משתתפיה לקבוצה חדשה",
    catg: "groups",
    formFields: {
      data: {
        toDuplicate: FormTypes.Group,
        name: FormTypes.Text,
      },
      translatedLabels: ["הקבוצה המיועדת לשכפול", "שם הקבוצה החדשה"],
    },
  },
  {
    id: "export_chat",
    label: "ייצוא הודעות קבוצה",
    description: "ייצא את הצ'אט לאקסל או לקובץ טקסט",
    catg: "util",
    formFields: {
      data: {
        chatId: FormTypes.Group,
      },
      translatedLabels: ["הקבוצה המיועדת לייצוא"],
    },
  },
  {
    id: "group_send",
    label: "שליחת הודעה למשתתפים",
    description: "שליחה הודעה לבחירה לכל משתתפי הקבוצה בפרטי",
    catg: "groups",
    formFields: {
      data: {
        groupName: FormTypes.Group,
        body: FormTypes.Textarea,
      },
      translatedLabels: ["הקבוצה לשליחה", "תוכן ההודעה"],
    },
  },
  {
    id: "group_media",
    label: "שליחת מדיה למשתתפים",
    description: "שליחה מדיה לבחירה לכל משתתפי הקבוצה בפרטי, ניתן להוסיף טקסט.",
    catg: "groups",
    formFields: {
      data: {
        groupname: FormTypes.Group,
        body: FormTypes.Textarea,
        url: FormTypes.Text,
      },
      translatedLabels: ["הקבוצה לשליחה", "תוכן ההודעה", "קישור למדיה"],
    },
  },
];
