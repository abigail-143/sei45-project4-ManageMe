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
exports.addOneItemToOneDeliveryOrder = exports.getAllListItemsForOneDeliveryOrder = void 0;
const database_1 = require("../db/database");
// POST all list-items related to ONE Delivery Order
const getAllListItemsForOneDeliveryOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delivery_id = Number(req.params.doID);
        const allListItemsOneDO = yield database_1.pool.query("SELECT * FROM delivery_list WHERE delivery_id = ($1)", [delivery_id]);
        if (allListItemsOneDO.rows.length != 0) {
            res.json(allListItemsOneDO.rows);
        }
        else {
            res.json({ status: "error", message: "no such delivery" });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllListItemsForOneDeliveryOrder = getAllListItemsForOneDeliveryOrder;
// PUT add one product item to ONE Delivery Order
const addOneItemToOneDeliveryOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delivery_id = Number(req.body.deliveryID);
        const product_id = req.body.productID.toUpperCase();
        const delivery_quantity = Number(req.body.deliveryQuantity);
        // const addOneItemToDO = await pool.query(
        //   "INSERT INTO delivery_list (delivery_id, product_id, delivery_quantity) VALUES ($1, $2, $3) RETURNING *",
        //   [delivery_id, product_id, delivery_quantity]
        // );
        const firstCheck = yield database_1.pool.query("SELECT * FROM delivery_list WHERE delivery_id = ($1) AND product_id = ($2)", [delivery_id, product_id]);
        if (firstCheck.rows.length != 0) {
            res.json({
                status: "error",
                message: "product already added to this order",
            });
        }
        else {
            const addOneItemToDO = yield database_1.pool.query("INSERT INTO delivery_list (delivery_id, product_id, delivery_quantity) VALUES ($1, $2, $3) RETURNING *", [delivery_id, product_id, delivery_quantity]);
            res.json({
                status: "ok",
                message: "product added to delivery order",
                listItem: addOneItemToDO.rows[0],
            });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.addOneItemToOneDeliveryOrder = addOneItemToOneDeliveryOrder;
// how do i prevent a duplicate dataset i.e. same do_id and prod_id
