import { TelegramClient } from "telegram";

interface User {
  client: TelegramClient;
  phoneCodeHash: string;
}

class LoginRegistry {
  private activeLogins = new Map<string, User>();

  // 1. Save the session when a code is requested
  saveSession(
    phoneNumber: string,
    client: TelegramClient,
    phoneCodeHash: string,
  ): void {
    this.activeLogins.set(phoneNumber, { client, phoneCodeHash });
  }

  // 2. Retrieve the session to verify the OTP code
  getSession(phoneNumber: string): User | undefined {
    return this.activeLogins.get(phoneNumber);
  }

  // 3. Wipe the session after successful login to clean up RAM
  removeSession(phoneNumber: string): void {
    this.activeLogins.delete(phoneNumber);
  }
}

// Export a single instance for your entire server to share
export const loginRegistry = new LoginRegistry();
