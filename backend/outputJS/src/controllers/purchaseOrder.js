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
exports.addNewPurchaseOrder = exports.getOnePurchaseOrder = exports.getAllPurchaseOrders = void 0;
const database_1 = require("../db/database");
const getAllPurchaseOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPurchaseOrders = yield database_1.pool.query("SELECT * FROM purchase_order");
        res.json(allPurchaseOrders.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllPurchaseOrders = getAllPurchaseOrders;
const getOnePurchaseOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = Number(req.params.poID);
        const onePurchaseOrder = yield database_1.pool.query("SELECT * FROM purchase_order WHERE order_id = ($1)", [order_id]);
        if (onePurchaseOrder.rows.length != 0) {
            res.json(onePurchaseOrder.rows);
        }
        else {
            res.json({ status: "error", message: "no such order" });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getOnePurchaseOrder = getOnePurchaseOrder;
const addNewPurchaseOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const product_id = req.body.productID.toUpperCase();
        const order_quantity = req.body.orderQuantity;
        const order_placed_date = new Date(req.body.orderPlacedDate);
        const leadtime = yield database_1.pool.query("SELECT supplier_leadtime FROM product_inventory WHERE product_id = ($1)", [product_id]);
        const leadtimeInDays = leadtime.rows[0].supplier_leadtime;
        // calculate new Date using the time (milliseconds)
        const estimated_receive_date = new Date(order_placed_date.getTime() + leadtimeInDays * 24 * 60 * 60 * 1000);
        const placeNewPurchaseOrder = yield database_1.pool.query("INSERT INTO purchase_order(username, product_id, order_quantity, order_placed_date, estimated_receive_date) VALUES ($1, $2, $3, $4, $5) RETURNING order_id, username, product_id, order_quantity, order_placed_date, estimated_receive_date", [
            username,
            product_id,
            order_quantity,
            order_placed_date,
            estimated_receive_date,
        ]);
        res.json({
            status: "ok",
            message: "new purchase order created",
            order: placeNewPurchaseOrder.rows[0],
        });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.addNewPurchaseOrder = addNewPurchaseOrder;
// export const updatePurchaseOrderWhenReceived = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//   } catch (error) {
//     res.json({ status: "error", message: error });
//   }
// };
