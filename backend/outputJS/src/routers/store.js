"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stores_1 = require("../controllers/stores");
const router = express_1.default.Router();
router.get("/all", stores_1.getAllProductsInStore);
router.post("/:productID", stores_1.getOneProductInStore);
router.put("/add", stores_1.addOneProductToStore);
router.patch("/:productID", stores_1.amendOneProductInStore);
exports.default = router;
