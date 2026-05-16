import "dotenv/config";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import input from "input";

const apiId = parseInt(process.env.TELEGRAM_API_ID || "0", 10);
const apiHash = process.env.TELEGRAM_API_HASH || "";
const sessionString = process.env.TELEGRAM_SESSION || ""; // Save this to .env after first login

const stringSession = new StringSession(sessionString);

(async () => {
  if (!apiId || !apiHash) {
    console.error("Error: TELEGRAM_API_ID and TELEGRAM_API_HASH must be defined in your .env file.");
    process.exit(1);
  }

  console.log("Connecting to Telegram...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () => await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });

  console.log("Connected successfully!");
  
  if (!sessionString) {
      const savedSession = client.session.save() as unknown as string;
      console.log("\n--- SESSION STRING ---");
      console.log(savedSession);
      console.log("Copy this string and save it as TELEGRAM_SESSION in your .env file to avoid logging in every time.\n");
  }

  // --- CONFIGURATION ---
  // Add your target channel usernames (e.g., "techcrunch") or IDs here
  // You can leave it as an empty array [] to listen to ALL channels/chats you are in
  const targetChannels: string[] = []; 
  // ---------------------

  console.log("Listening for incoming messages...");

  // Handle incoming messages from channels
  client.addEventHandler(async (event) => {
    const message = event.message;
    
    // Get chat info (Channels are a type of Chat)
    const chat = await message.getChat();
    const channelTitle = (chat as any)?.title || "Unknown Channel";

    console.log(`\n--- New Channel Post ---`);
    console.log(`Channel: ${channelTitle} (ID: ${message.chatId})`);
    console.log(`Date: ${new Date(message.date * 1000).toLocaleString()}`);
    console.log(`Message: ${message.text}`);
    
    // Check if there are any media/files
    if (message.media) {
        console.log(`Attachment: [Media present]`);
    }

  }, new NewMessage({ chats: targetChannels.length > 0 ? targetChannels : undefined }));
})();