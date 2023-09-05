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
const getAllProductsInStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const storeProducts = yield database_1.pool.query("SELECT store.store_id, store.product_id, store.store_quantity, product_inventory.unit_of_measurement, product_inventory.product_description FROM store JOIN product_inventory ON store.product_id = product_inventory.product_id");
        res.json(storeProducts.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllProductsInStore = getAllProductsInStore;
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
const addOneProductToStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.body.productID.toUpperCase();
        const store_quantity = req.body.storeQuantity;
        const addNewProduct = yield database_1.pool.query("INSERT INTO store (product_id, store_quantity) VALUES ($1, $2)", [product_id, store_quantity]);
        res.json({ status: "ok", message: "new product added to store" });
    }
    catch (error) {
        res.json({ status: "error", message: "unable to add product to store" });
    }
});
exports.addOneProductToStore = addOneProductToStore;
const amendOneProductInStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.productID.toUpperCase();
        const store_quantity = req.body.storeQuantity;
        const amendProduct = yield database_1.pool.query("UPDATE store SET store_quantity = ($1) WHERE product_id = ($2)", [store_quantity, product_id]);
        res.json({ status: "ok", message: "product quantity updated" });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.amendOneProductInStore = amendOneProductInStore;
