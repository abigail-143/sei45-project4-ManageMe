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
exports.getOneStoreDeliveryOrder = exports.getAllStoreDeliveryOrders = void 0;
const database_1 = require("../db/database");
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
const getOneStoreDeliveryOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delivery_id = Number(req.params.doID);
        const oneStoreDeliveryOrder = yield database_1.pool.query("SELECT * FROM store_delivery WHERE delivery_id = ($1)", [delivery_id]);
        if (oneStoreDeliveryOrder.rows.length != 0) {
            res.json(oneStoreDeliveryOrder.rows);
        }
        else {
            res.json({ status: "error", message: "no sure delivery" });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getOneStoreDeliveryOrder = getOneStoreDeliveryOrder;
