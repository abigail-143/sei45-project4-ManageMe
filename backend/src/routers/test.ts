import express from "express";
import { sayBye, sayHi } from "../controllers/test";

const router = express.Router();

router.get("/hi", sayHi);
router.get("/bye", sayBye);

export default router;
