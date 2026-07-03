import { TelegramClient } from "telegram";

interface User {
  client: TelegramClient;
  phoneCodeHash: string;
}

class LoginRegistry {
  private activeLogins = new Map<string, User>();

  saveSession(
    phoneNumber: string,
    client: TelegramClient,
    phoneCodeHash: string,
  ): void {
    this.activeLogins.set(phoneNumber, { client, phoneCodeHash });
  }

  getSession(phoneNumber: string): User | undefined {
    return this.activeLogins.get(phoneNumber);
  }

  removeSession(phoneNumber: string): void {
    this.activeLogins.delete(phoneNumber);
  }
}

export const loginRegistry = new LoginRegistry();
