"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monthlyUsage_1 = require("../controllers/monthlyUsage");
const router = express_1.default.Router();
router.get("/all", monthlyUsage_1.getAllData);
router.put("/add");
router.post("/product/:productID", monthlyUsage_1.getDataForOneProduct);
router.post("/period", monthlyUsage_1.getDataForSpecificPeriod);
exports.default = router;
