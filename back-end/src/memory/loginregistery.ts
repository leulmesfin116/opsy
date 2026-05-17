import { TelegramClient } from "telegram";
interface User {
  client: TelegramClient;
  phoneCodeHash: string;
}
class loginregistery {
  private activeLogins = new Map<string, User>();
}
