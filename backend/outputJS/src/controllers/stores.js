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
exports.amendOneProductInStore = exports.addOneProductToStore = exports.getOneProductInStore = exports.getAllProductsInStore = void 0;
const database_1 = require("../db/database");
// GET all products in store
const getAllProductsInStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeProducts = yield database_1.pool.query("SELECT store.store_id, store.product_id, store.store_quantity, product_inventory.unit_of_measurement, product_inventory.product_description, product_inventory.in_use, product_inventory.piece_per_uom FROM store JOIN product_inventory ON store.product_id = product_inventory.product_id");
        res.json(storeProducts.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllProductsInStore = getAllProductsInStore;
// GET one product in store
const getOneProductInStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.productID.toUpperCase();
        const oneProductInStore = yield database_1.pool.query("SELECT store.product_id, store.store_quantity, product_inventory.unit_of_measurement, product_inventory.product_description FROM store JOIN product_inventory ON store.product_id = product_inventory.product_id WHERE store.product_id = ($1)", [product_id]);
        if (oneProductInStore.rows.length != 0) {
            res.json(oneProductInStore.rows);
        }
        else {
            res.json({ status: "error", message: "no such product in store" });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getOneProductInStore = getOneProductInStore;
// PUT adding a product to store (if it doesn't already exists)
const addOneProductToStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.body.productID.toUpperCase();
        const store_quantity = req.body.storeQuantity;
        // check if product already exists in store
        const firstCheck = yield database_1.pool.query("SELECT * FROM store WHERE product_id = ($1)", [product_id]);
        // check if product exists in warehouse
        const secondCheck = yield database_1.pool.query("SELECT * FROM warehouse WHERE product_id = ($1)", [product_id]);
        if (firstCheck.rows.length != 0) {
            res.json({ status: "error", message: "product already exists in store" });
        }
        else if (secondCheck.rows.length == 0) {
            res.json({
                status: "error",
                message: "no such product in warehouse, unable to add to store",
            });
        }
        else {
            // adding new item (since it doesn't exists in store)
            const addNewProduct = yield database_1.pool.query("INSERT INTO store (product_id, store_quantity) VALUES ($1, $2) RETURNING *", [product_id, store_quantity]);
            res.json({
                status: "ok",
                message: "new product added to store",
                product: addNewProduct.rows[0],
            });
        }
    }
    catch (error) {
        res.json({ status: "error", message: "unable to add product to store" });
    }
});
exports.addOneProductToStore = addOneProductToStore;
// PATCH amend an existing product
const amendOneProductInStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.productID.toUpperCase();
        const store_quantity = req.body.storeQuantity;
        const amendProduct = yield database_1.pool.query("UPDATE store SET store_quantity = ($1) WHERE product_id = ($2)", [store_quantity, product_id]);
        res.json({
            status: "ok",
            message: "product quantity updated",
            product: amendProduct.rows[0],
        });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.amendOneProductInStore = amendOneProductInStore;
