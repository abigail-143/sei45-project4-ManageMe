"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOneProduct = exports.getAllProducts = void 0;
const database_1 = require("../db/database");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield database_1.pool.query("SELECT * FROM product_inventory");
        res.json(products.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllProducts = getAllProducts;
const addOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.body.productID;
        const product_description = req.body.productDescription;
        const unit_of_measurement = req.body.unitOfMeasurement;
        const in_use = req.body.inUse;
        const supplier = req.body.supplier;
        const supplier_leadtime = req.body.supplierLeadtime;
        const piece_per_uom = req.body.piecePerUOM;
        const cost_per_uom = req.body.costPerUOM;
        const newProduct = yield database_1.pool.query("INSERT INTO product_inventory (product_id, product_description, unit_of_measurement, in_use, supplier, supplier_leadtime, piece_per_uom, cost_per_uom) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)", [
            product_id,
            product_description,
            unit_of_measurement,
            in_use,
            supplier,
            supplier_leadtime,
            piece_per_uom,
            cost_per_uom,
        ]);
        res.json({ status: "ok", message: "product added to inventory" });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.addOneProduct = addOneProduct;
