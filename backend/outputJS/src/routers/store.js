"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stores_1 = require("../controllers/stores");
const inputValidators_1 = require("../validators/inputValidators");
const inputValidatorsCheck_1 = require("../middlewares/inputValidatorsCheck");
const authUsers_1 = require("../middlewares/authUsers");
const router = express_1.default.Router();
router.get("/all", authUsers_1.auth, stores_1.getAllProductsInStore);
router.post("/:productID", authUsers_1.auth, inputValidators_1.checkProductIDParams, inputValidatorsCheck_1.inputValidation, stores_1.getOneProductInStore);
router.put("/add", authUsers_1.auth, inputValidators_1.checkAddProductToStoreInput, inputValidatorsCheck_1.inputValidation, stores_1.addOneProductToStore);
router.patch("/:productID", authUsers_1.auth, inputValidators_1.checkProductIDParams, inputValidators_1.checkUpdateProductInStoreInput, inputValidatorsCheck_1.inputValidation, stores_1.amendOneProductInStore);
exports.default = router;
