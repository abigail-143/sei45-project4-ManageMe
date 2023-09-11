"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../controllers/products");
const inputValidators_1 = require("../validators/inputValidators");
const inputValidatorsCheck_1 = require("../middlewares/inputValidatorsCheck");
const authUsers_1 = require("../middlewares/authUsers");
const router = express_1.default.Router();
router.get("/all", authUsers_1.authManager, products_1.getAllProducts);
router.post("/:productID", authUsers_1.auth, inputValidators_1.checkProductIDParams, products_1.getOneProduct);
router.put("/new", authUsers_1.authManager, inputValidators_1.checkNewProductInput, inputValidatorsCheck_1.inputValidation, products_1.addOneProduct);
router.patch("/:productID", authUsers_1.authManager, inputValidators_1.checkProductIDParams, inputValidators_1.checkProductInUseInput, inputValidatorsCheck_1.inputValidation, products_1.updateIfProductInUse);
exports.default = router;
