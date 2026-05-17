import { TelegramClient } from "telegram";
interface User {
  client: TelegramClient;
  phoneCodeHash: string;
}
const activeLogins = new Map<string, User>();
