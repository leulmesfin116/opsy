import { Request, Response } from "express";
import { loginRegistry } from "../memory/loginregistery";
import { TelegramClient, Api } from "telegram";

interface User {
  client: TelegramClient;
  phoneCodeHash: string;
}

export const tgauthController = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, code } = req.body;

    const session = loginRegistry.getSession(phoneNumber) as User | undefined;

    if (!session) {
      return res.status(400).json({ message: "session expired" });
    }

    const { client, phoneCodeHash } = session;

    await client.invoke(
      new Api.auth.SignIn({
        phoneNumber,
        phoneCodeHash,
        phoneCode: code,
      }),
    );
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
