import "dotenv/config";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import input from "input";

const apiId = parseInt(process.env.TELEGRAM_API_ID || "0", 10);
const apiHash = process.env.TELEGRAM_API_HASH || "";
const sessionString = process.env.TELEGRAM_SESSION || ""; // Save this to .env after first login

// key words
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
  "on-site",
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
const stringSession = new StringSession(sessionString);
