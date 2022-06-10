import { Router } from "express";
import { getQuestion } from "../controllers/database.js";

const router = Router();

router.get("/question", getQuestion);

export default router;
