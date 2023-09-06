"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveryOrders_1 = require("../controllers/deliveryOrders");
const inputValidators_1 = require("../validators/inputValidators");
const inputValidatorsCheck_1 = require("../middlewares/inputValidatorsCheck");
const authUsers_1 = require("../middlewares/authUsers");
const router = express_1.default.Router();
router.get("/all", authUsers_1.auth, deliveryOrders_1.getAllStoreDeliveryOrders);
router.post("/:doID", authUsers_1.auth, inputValidators_1.checkDeliveryOrderIDParams, inputValidatorsCheck_1.inputValidation, deliveryOrders_1.getOneStoreDeliveryOrder);
router.put("/new", authUsers_1.auth, inputValidators_1.checkAddNewDeliveryOrderInput, inputValidatorsCheck_1.inputValidation, deliveryOrders_1.addNewStoreDeliveryOrder);
router.patch("/:doID", authUsers_1.auth, inputValidators_1.checkDeliveryOrderIDParams, inputValidators_1.checkUpdateDeliveryOrderInput, inputValidatorsCheck_1.inputValidation, deliveryOrders_1.updateOneStoreDeliveryOrder);
exports.default = router;
