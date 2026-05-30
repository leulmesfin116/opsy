import "dotenv/config";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import input from "input";

const apiId = parseInt(process.env.TELEGRAM_API_ID || "0", 10);
const apiHash = process.env.TELEGRAM_API_HASH || "";

// Keywords for matching logic later
const remote = [
  "remote",
  "wfh",
  "work from home",
  "anywhere",
  " fully-remote",
  "distributed team",
  "work from anywhere",
];
const onsite = [
  "onsite",
  "on site",
  " office",
  "in-office",
  "in-person",
  "commute",
  "stationed",
];
const hybrid = [
  "hybrid",
  "partially remote",
  "flexible arrangement",
  "days a week in office",
  "remote option",
];

// Target channels
const targetChannels = [
  "@Maroset",
  "@freelance_ethio",
  "@effoyjobs",
  "@josad_software",
  "@hahujobs",
  "@zemenaycommunity",
  "@digitaljobs_et",
  "@ethiojobsofficial",
];

//  Turned this into an Immediately Invoked Function Expression (IIFE)
(async () => {
  // Initialize with an empty session to force the login prompt
  const stringSession = new StringSession("");

  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  //  Start the interactive login flow
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () =>
      await input.text("Please enter your password (if 2FA active): "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.error("Login Error:", err),
  });

  console.log("\n--- LOGIN SUCCESSFUL ---");
  console.log(
    "Copy this string and save it in your .env file as TELEGRAM_SESSION_STRING:\n",
  );
  console.log(stringSession.save()); // <--- THIS IS YOUR KEY
  console.log("\n------------------------\n");

  console.log("Resolving target channels...");

  // Resolve the string usernames to actual Entity IDs so GramJS can track them
  const resolvedIds: string[] = [];
  for (const channel of targetChannels) {
    try {
      const entity = await client.getEntity(channel);
      resolvedIds.push(entity.id.toString());
    } catch (e) {
      console.error(`Could not resolve entity for username: ${channel}`);
    }
  }

  console.log(
    "Actively listening for jobs on resolved channel IDs:",
    resolvedIds,
  );

  // FIX 3: Added the actual event listener using the NewMessage event class
  client.addEventHandler(async (event) => {
    const message = event.message;
    if (!message || !message.peerId) return;

    // Get the source channel ID

    if (!("channelId" in message.peerId)) return;
    const channelId = message.peerId.channelId?.toString();

    // Only process if it comes from one of our target channels
    if (resolvedIds.includes(channelId)) {
      const text = message.message || "";
      let normalizedText = text.toLowerCase();
      normalizedText = normalizedText.replace(/[-/.,!]/g, " ");
      normalizedText = normalizedText.replace(/\s+/g, " ");
      console.log(`\n[New Message from Tracked Channel ${channelId}]:`);
      console.log(normalizedText);
      // checking if one word passes from the array
      const isRemote = remote.some((keyword) =>
        normalizedText.includes(keyword.trim().toLocaleLowerCase()),
      );
      const isOnsite = onsite.some((keyword) =>
        normalizedText.includes(keyword.trim().toLocaleLowerCase()),
      );
      const isHybrid = hybrid.some((keyword) =>
        normalizedText.includes(keyword.trim().toLocaleLowerCase()),
      );

      const matchedCategories: string[] = [];
      if (isRemote) matchedCategories.push("remote");
      if (isOnsite) matchedCategories.push("onsite");
      if (isHybrid) matchedCategories.push("hybrid");
      if (matchedCategories.length > 0) {
        console.log(
          ` Match Found! Categories: ${matchedCategories.join(", ")}`,
        );
      } else {
        console.log(
          "⏭ No matching workplace keywords found. Skipping notification pipeline.",
        );
      }
    }
  }, new NewMessage({}));
})();
