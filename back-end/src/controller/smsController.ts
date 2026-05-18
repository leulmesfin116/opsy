import { Request, Response } from "express";
import { loginRegistry } from "../memory/loginregistery";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
const apiId = parseInt(process.env.TELEGRAM_API_ID || "0", 10);
const apiHash = process.env.TELEGRAM_API_HASH || "";
const stringSession = new StringSession(sessionString);

export const requestCodecontroller = (req: Request, res: Response) => {
  try {
    const number = req.body.PhoneNumber;
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
  } catch (error) {
    res.status(501).json({ message: "something went wrong" });
  }
};
