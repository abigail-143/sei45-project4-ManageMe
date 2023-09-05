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
exports.updateOneStoreDeliveryOrder = exports.addNewStoreDeliveryOrder = exports.getOneStoreDeliveryOrder = exports.getAllStoreDeliveryOrders = void 0;
const database_1 = require("../db/database");
// GET all Delivery Orders
const getAllStoreDeliveryOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allStoreDelivery = yield database_1.pool.query("SELECT * FROM store_delivery");
        res.json(allStoreDelivery.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllStoreDeliveryOrders = getAllStoreDeliveryOrders;
// GET one Delivery Order using delivery_id
const getOneStoreDeliveryOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delivery_id = Number(req.params.doID);
        const oneStoreDeliveryOrder = yield database_1.pool.query("SELECT * FROM store_delivery WHERE delivery_id = ($1)", [delivery_id]);
        if (oneStoreDeliveryOrder.rows.length != 0) {
            res.json(oneStoreDeliveryOrder.rows);
        }
        else {
            res.json({ status: "error", message: "no such delivery" });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getOneStoreDeliveryOrder = getOneStoreDeliveryOrder;
// PUT adding a new Delivery Order
const addNewStoreDeliveryOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const delivery_placed_date = new Date(req.body.deliveryPlacedDate);
        const to_deliver_date = new Date(req.body.toDeliverDate);
        const addNewDeliveryOrder = yield database_1.pool.query("INSERT INTO store_delivery (username, delivery_placed_date, to_deliver_date) VALUES ($1, $2, $3) RETURNING delivery_id, username, delivery_placed_date, to_deliver_date", [username, delivery_placed_date, to_deliver_date]);
        res.json({
            status: "ok",
            message: "new store delivery order created",
            order: addNewDeliveryOrder.rows[0],
        });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.addNewStoreDeliveryOrder = addNewStoreDeliveryOrder;
// PATCH update one Delivery Order with delivered_date and completed
const updateOneStoreDeliveryOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delivered_date = new Date(req.body.deliveredDate);
        const completed = req.body.completed;
        const delivery_id = Number(req.params.doID);
        const updateOneDeliveryOrder = yield database_1.pool.query("UPDATE store_delivery SET delivered_date = ($1), completed = ($2) WHERE delivery_id = ($3) RETURNING *", [delivered_date, completed, delivery_id]);
        res.json({
            status: "ok",
            message: "DO updated",
            order: updateOneDeliveryOrder.rows[0],
        });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.updateOneStoreDeliveryOrder = updateOneStoreDeliveryOrder;
