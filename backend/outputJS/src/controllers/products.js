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
exports.updateIfProductInUse = exports.addOneProduct = exports.getAllProducts = void 0;
const database_1 = require("../db/database");
// GET all products in inventory list
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
// PUT one product into inventory list
const addOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.body.productID.toUpperCase();
        const product_description = req.body.productDescription;
        const unit_of_measurement = req.body.unitOfMeasurement;
        const in_use = req.body.inUse;
        const supplier = req.body.supplier;
        const supplier_leadtime = Number(req.body.supplierLeadtime);
        const piece_per_uom = Number(req.body.piecePerUOM);
        const cost_per_uom = Number(req.body.costPerUOM);
        // check for duplicate product_id name
        const firstCheck = yield database_1.pool.query("SELECT * FROM product_inventory WHERE product_id = ($1)", [product_id]);
        if (firstCheck.rows.length != 0) {
            res.json({ status: "error", message: "product id already taken" });
        }
        else {
            // add new product
            const newProduct = yield database_1.pool.query("INSERT INTO product_inventory (product_id, product_description, unit_of_measurement, in_use, supplier, supplier_leadtime, piece_per_uom, cost_per_uom) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [
                product_id,
                product_description,
                unit_of_measurement,
                in_use,
                supplier,
                supplier_leadtime,
                piece_per_uom,
                cost_per_uom,
            ]);
            res.json({
                status: "ok",
                message: "product added to inventory",
                product: newProduct.rows[0],
            });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.addOneProduct = addOneProduct;
// PATCH update an existing product
const updateIfProductInUse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.productID.toUpperCase();
        const in_use = req.body.inUse;
        const updateProduct = yield database_1.pool.query("UPDATE product_inventory SET in_use = ($1) WHERE product_id = ($2) RETURNING inventory_id, product_id, in_use", [in_use, product_id]);
        res.json({
            status: "ok",
            message: "product updated in warehouse",
            product: updateProduct.rows[0],
        });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.updateIfProductInUse = updateIfProductInUse;
