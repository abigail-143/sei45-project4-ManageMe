"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveryOrders_1 = require("../controllers/deliveryOrders");
const router = express_1.default.Router();
router.get("/all", deliveryOrders_1.getAllStoreDeliveryOrders);
router.post("/:doID", deliveryOrders_1.getOneStoreDeliveryOrder);
// router.put("new")
// router.patch("/:doID")
exports.default = router;
