"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const authUsers_1 = require("../middlewares/authUsers");
const router = express_1.default.Router();
router.get("/all", authUsers_1.authManager, users_1.getAllUsers);
router.put("/register", authUsers_1.authManager, users_1.addUser);
router.patch("/deactivate/:username", authUsers_1.authManager, users_1.deactivateUser);
router.post("/login", users_1.loginUser);
exports.default = router;
