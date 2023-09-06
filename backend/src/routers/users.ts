import express from "express";
import {
  addUser,
  deactivateUser,
  getAllUsers,
  loginUser,
} from "../controllers/users";
import { auth, authManager } from "../middlewares/authUsers";

const router = express.Router();

router.get("/all", authManager, getAllUsers);
router.put("/register", authManager, addUser);
router.patch("/deactivate/:username", authManager, deactivateUser);
router.post("/login", loginUser);

export default router;
