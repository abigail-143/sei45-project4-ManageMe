"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_1 = require("../controllers/test");
const router = express_1.default.Router();
router.get("/hi", test_1.sayHi);
router.get("/bye", test_1.sayBye);
exports.default = router;
