import { Router } from "express";
import { tgauthController } from "../controller/tgauthController";

const router = Router();

router.get("verify", tgauthController);

export default router;
