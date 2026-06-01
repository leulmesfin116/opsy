import { Request, Response } from "express";
export const preference = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "somthing went wrong" });
  }
};
