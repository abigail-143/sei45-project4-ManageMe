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
exports.addOneProductToWarehouse = exports.getOneProductInWarehouse = exports.getAllProductsInWarehouse = void 0;
const database_1 = require("../db/database");
const getAllProductsInWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseProducts = yield database_1.pool.query("SELECT warehouse.product_id, warehouse.warehouse_quantity, warehouse.warehouse_stocklevel, product_inventory.unit_of_measurement FROM warehouse JOIN product_inventory ON warehouse.product_id = product_inventory.product_id");
        res.json(warehouseProducts.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllProductsInWarehouse = getAllProductsInWarehouse;
const getOneProductInWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.productID.toUpperCase();
        const oneProductInWarehouse = yield database_1.pool.query("SELECT warehouse.product_id, warehouse.warehouse_quantity, warehouse.warehouse_stocklevel, product_inventory.unit_of_measurement FROM warehouse JOIN product_inventory ON warehouse.product_id = product_inventory.product_id WHERE warehouse.product_id = ($1)", [product_id]);
        if (oneProductInWarehouse.rows.length != 0) {
            res.json(oneProductInWarehouse.rows);
        }
        else {
            res.json({ status: "error", message: "no such product in warehouse" });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getOneProductInWarehouse = getOneProductInWarehouse;
const addOneProductToWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.body.productID.toUpperCase();
        const warehouse_quantity = Number(req.body.warehouseQuantity);
        const firstCheck = yield database_1.pool.query("SELECT * FROM warehouse WHERE product_id = ($1)", [product_id]);
        if (firstCheck.rows.length != 0) {
            res.json({
                status: "error",
                message: "product already exists in warehouse",
            });
        }
        else {
            const addOneProductToWarehouse = yield database_1.pool.query("INSERT INTO warehouse (product_id, warehouse_quantity) VALUES ($1, $2) RETURNING *", [product_id, warehouse_quantity]);
            res.json({
                status: "ok",
                message: "product added to warehouse",
                warehouseItem: addOneProductToWarehouse.rows[0],
            });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.addOneProductToWarehouse = addOneProductToWarehouse;
