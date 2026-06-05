import { Router } from "express";
import { preference } from "../controller/preferenceController";

const router = Router();
router.post("register", preference);
export default router;
