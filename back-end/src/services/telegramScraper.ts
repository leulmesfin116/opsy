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

  // --- PARSING LOGIC ---
  const parseMessage = (message: any, chat: any) => {
    const rawText = message.text || "";
    const cleanText = rawText.trim();
    
    // Extract Links (Telegram stores these in 'entities')
    const links: string[] = [];
    if (message.entities) {
      for (const entity of message.entities) {
        if (entity.className === 'MessageEntityTextUrl') {
          links.push(entity.url);
        } else if (entity.className === 'MessageEntityUrl') {
          const offset = entity.offset;
          const length = entity.length;
          links.push(rawText.substring(offset, offset + length));
        }
      }
    }

    return {
      content: cleanText,
      searchableText: cleanText.toLowerCase(),
      links,
      source: (chat as any)?.title || "Unknown Channel",
      sourceId: message.chatId?.toString(),
      msgId: message.id,
      date: new Date(message.date * 1000)
    };
  };

  console.log("Listening for incoming messages...");

  // Handle incoming messages from channels
  client.addEventHandler(async (event) => {
    const message = event.message;
    const chat = await message.getChat();
    
    // Use the parser
    const parsedData = parseMessage(message, chat);

    console.log(`\n--- Parsed Channel Post ---`);
    console.log(`Channel: ${parsedData.source}`);
    console.log(`Date: ${parsedData.date.toLocaleString()}`);
    console.log(`Content: ${parsedData.content.substring(0, 100)}...`);
    if (parsedData.links.length > 0) {
        console.log(`Links found: ${parsedData.links.join(", ")}`);
    }
    
    // TODO: Phase 3.3 - Trigger Keyword Matching Engine
    // matchKeywords(parsedData);

  }, new NewMessage({ chats: targetChannels.length > 0 ? targetChannels : undefined }));
})();