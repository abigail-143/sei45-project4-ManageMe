"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const router = express_1.default.Router();
router.get("/all", users_1.getAllUsers);
router.put("/register", users_1.addUser);
router.patch("/deactivate/:username", users_1.deactivateUser);
exports.default = router;
