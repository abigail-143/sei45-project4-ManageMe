import express from "express";
import { addUser, deactivateUser, getAllUsers } from "../controllers/users";

const router = express.Router();

router.get("/all", getAllUsers);
router.put("/register", addUser);
router.patch("/deactivate/:username", deactivateUser)

export default router;
