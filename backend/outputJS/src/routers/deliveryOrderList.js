"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deliveryOrderList_1 = require("../controllers/deliveryOrderList");
const inputValidators_1 = require("../validators/inputValidators");
const inputValidatorsCheck_1 = require("../middlewares/inputValidatorsCheck");
const router = express_1.default.Router();
router.post("/:doID", inputValidators_1.checkDeliveryOrderIDParams, inputValidatorsCheck_1.inputValidation, deliveryOrderList_1.getAllListItemsForOneDeliveryOrder);
router.put("/add", inputValidators_1.checkAddNewProductToDeliveryOrderInput, inputValidatorsCheck_1.inputValidation, deliveryOrderList_1.addOneItemToOneDeliveryOrder);
exports.default = router;
