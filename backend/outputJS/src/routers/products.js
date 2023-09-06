"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const inputValidators_1 = require("../validators/inputValidators");
const inputValidatorsCheck_1 = require("../middlewares/inputValidatorsCheck");
const router = express_1.default.Router();
router.get("/all", products_1.getAllProducts);
router.put("/new", inputValidators_1.checkNewProductInput, inputValidatorsCheck_1.inputValidation, products_1.addOneProduct);
router.patch("/:productID", inputValidators_1.checkProductIDParams, inputValidators_1.checkProductInUseInput, inputValidatorsCheck_1.inputValidation, products_1.updateIfProductInUse);
exports.default = router;
