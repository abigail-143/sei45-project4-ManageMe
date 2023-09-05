"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const warehouse_1 = require("../controllers/warehouse");
const router = express_1.default.Router();
router.get("/all", warehouse_1.getAllProductsInWarehouse);
router.post("/:productID", warehouse_1.getOneProductInWarehouse);
router.put("/add", warehouse_1.addOneProductToWarehouse);
router.patch("/:productID");
exports.default = router;
