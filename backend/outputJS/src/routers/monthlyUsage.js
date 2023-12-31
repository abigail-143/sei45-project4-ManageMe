"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monthlyUsage_1 = require("../controllers/monthlyUsage");
const inputValidators_1 = require("../validators/inputValidators");
const inputValidatorsCheck_1 = require("../middlewares/inputValidatorsCheck");
const authUsers_1 = require("../middlewares/authUsers");
const router = express_1.default.Router();
router.get("/all", authUsers_1.authManager, monthlyUsage_1.getAllData);
router.put("/add", authUsers_1.authManager, inputValidators_1.checkAddNewDataMonthlyUsage, inputValidatorsCheck_1.inputValidation, monthlyUsage_1.addNewDataSet);
router.post("/product/:productID", authUsers_1.authManager, inputValidators_1.checkProductIDParams, inputValidatorsCheck_1.inputValidation, monthlyUsage_1.getDataForOneProduct);
router.post("/period", authUsers_1.authManager, inputValidators_1.checkPeriodForMonthlyUsage, inputValidatorsCheck_1.inputValidation, monthlyUsage_1.getDataForSpecificPeriod);
exports.default = router;
