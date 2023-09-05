"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchaseOrder_1 = require("../controllers/purchaseOrder");
const router = express_1.default.Router();
router.get("/all", purchaseOrder_1.getAllPurchaseOrders);
router.post("/:poID", purchaseOrder_1.getOnePurchaseOrder);
router.put("/new", purchaseOrder_1.addNewPurchaseOrder);
router.patch("/:poID", purchaseOrder_1.updatePurchaseOrderWhenReceived);
exports.default = router;
