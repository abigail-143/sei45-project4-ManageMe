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
exports.getOneProductInWarehouse = exports.getAllProductsInWarehouse = void 0;
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
        const product_id = req.params.productID;
        const oneProductFromWarehouse = yield database_1.pool.query("SELECT warehouse.product_id, warehouse.warehouse_quantity, warehouse.warehouse_stocklevel, product_inventory.unit_of_measurement FROM warehouse JOIN product_inventory ON warehouse.product_id = product_inventory.product_id WHERE warehouse.product_id = ($1)", [product_id]);
        if (oneProductFromWarehouse.rows.length != 0) {
            res.json(oneProductFromWarehouse.rows);
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
