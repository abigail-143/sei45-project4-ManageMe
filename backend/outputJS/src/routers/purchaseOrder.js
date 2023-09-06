"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseOrder_1 = require("../controllers/purchaseOrder");
const inputValidators_1 = require("../validators/inputValidators");
const inputValidatorsCheck_1 = require("../middlewares/inputValidatorsCheck");
const authUsers_1 = require("../middlewares/authUsers");
const router = express_1.default.Router();
router.get("/all", authUsers_1.authManager, purchaseOrder_1.getAllPurchaseOrders);
router.post("/:poID", authUsers_1.authManager, inputValidators_1.checkPurchaseOrderIDParams, inputValidatorsCheck_1.inputValidation, purchaseOrder_1.getOnePurchaseOrder);
router.put("/new", authUsers_1.authManager, inputValidators_1.checkAddNewPurchaseOrderInput, inputValidatorsCheck_1.inputValidation, purchaseOrder_1.addNewPurchaseOrder);
router.patch("/:poID", authUsers_1.authManager, inputValidators_1.checkPurchaseOrderIDParams, inputValidators_1.checkUpdatePurchaseOrderInput, inputValidatorsCheck_1.inputValidation, purchaseOrder_1.updatePurchaseOrderWhenReceived);
exports.default = router;
