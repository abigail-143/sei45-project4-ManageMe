"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const warehouse_1 = require("../controllers/warehouse");
const inputValidators_1 = require("../validators/inputValidators");
const inputValidatorsCheck_1 = require("../middlewares/inputValidatorsCheck");
const authUsers_1 = require("../middlewares/authUsers");
const router = express_1.default.Router();
router.get("/all", authUsers_1.authManager, warehouse_1.getAllProductsInWarehouse);
router.post("/:productID", authUsers_1.authManager, inputValidators_1.checkProductIDParams, inputValidatorsCheck_1.inputValidation, warehouse_1.getOneProductInWarehouse);
router.put("/add", authUsers_1.authManager, inputValidators_1.checkAddProductToWarehouseInput, inputValidatorsCheck_1.inputValidation, warehouse_1.addOneProductToWarehouse);
router.patch("/:productID", authUsers_1.authManager, inputValidators_1.checkProductIDParams, inputValidators_1.checkUpdateProductInWarehouseInput, inputValidatorsCheck_1.inputValidation, warehouse_1.updateOneProductInWarehouse);
exports.default = router;
