import { Request, Response } from "express";
import { loginRegistry } from "../memory/loginregistery";
import { TelegramClient } from "telegram";

export const tgauthController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, code } = req.body;
    const session = loginRegistry.getSession(phoneNumber);
  } catch (erro) {
    res.status(500).json({ message: "something went wrong" });
  }
};
