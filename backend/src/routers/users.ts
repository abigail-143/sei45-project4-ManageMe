import express from "express";
import {
  addUser,
  deactivateUser,
  getAllUsers,
  loginUser,
} from "../controllers/users";
import { auth, authManager } from "../middlewares/authUsers";
import {
  addNewUserInput,
  checkUserLoginInput,
  checkUsernameParams,
} from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";

const router = express.Router();

router.get("/all", authManager, getAllUsers);
router.put("/register", authManager, addNewUserInput, inputValidation, addUser);
router.patch(
  "/deactivate/:username",
  authManager,
  checkUsernameParams,
  inputValidation,
  deactivateUser
);
router.post("/login", checkUserLoginInput, inputValidation, loginUser);

export default router;
