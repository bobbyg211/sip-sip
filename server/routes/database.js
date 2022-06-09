import { Router } from "express";
import { getQuestions } from "../controllers/database.js";

const router = Router();

router.get("/questions", getQuestions);

export default router;
