import express from "express";
import { getAllUsers } from "../controllers/users";

const router = express.Router();

router.get("/all", getAllUsers);

export default router;
