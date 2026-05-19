import { Request, Response } from "express";
import { loginRegistry } from "../memory/loginregistery";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
const apiId = parseInt(process.env.TELEGRAM_API_ID || "0", 10);
const apiHash = process.env.TELEGRAM_API_HASH || "";

export const requestCodecontroller = async (req: Request, res: Response) => {
  try {
    const stringSession = new StringSession();
    const number = req.body.PhoneNumber;
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.connect();
    const { phoneCodeHash } = await client.sendCode(
      {
        apiId: apiId,
        apiHash: apiHash,
      },
      number,
    );
    loginRegistry.saveSession(number, client, phoneCodeHash);
    res.status(200).json({ message: "Code sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
