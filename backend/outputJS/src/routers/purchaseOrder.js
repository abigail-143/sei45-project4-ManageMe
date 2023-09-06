"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseOrder_1 = require("../controllers/purchaseOrder");
const inputValidators_1 = require("../validators/inputValidators");
const inputValidatorsCheck_1 = require("../middlewares/inputValidatorsCheck");
const router = express_1.default.Router();
router.get("/all", purchaseOrder_1.getAllPurchaseOrders);
router.post("/:poID", inputValidators_1.checkPurchaseOrderIDParams, inputValidatorsCheck_1.inputValidation, purchaseOrder_1.getOnePurchaseOrder);
router.put("/new", inputValidators_1.checkAddNewPurchaseOrderInput, inputValidatorsCheck_1.inputValidation, purchaseOrder_1.addNewPurchaseOrder);
router.patch("/:poID", inputValidators_1.checkPurchaseOrderIDParams, inputValidators_1.checkUpdatePurchaseOrderInput, inputValidatorsCheck_1.inputValidation, purchaseOrder_1.updatePurchaseOrderWhenReceived);
exports.default = router;
