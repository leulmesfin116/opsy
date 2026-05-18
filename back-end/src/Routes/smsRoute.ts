import { Router } from "express";
import { requestCodecontroller } from "../controller/smsController";

const router = Router();

router.post("request", requestCodecontroller);
export default router;
