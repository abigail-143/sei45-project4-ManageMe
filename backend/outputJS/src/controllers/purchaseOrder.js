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
exports.getChartDataPO = exports.updatePurchaseOrderWhenReceived = exports.addNewPurchaseOrder = exports.getOnePurchaseOrder = exports.getAllPendingPurchaseOrders = exports.getAllCompletedPurchaseOrders = exports.getAllPurchaseOrders = void 0;
const database_1 = require("../db/database");
// GET all purchase orders
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
// GET all COMPLETED purchase orders
const getAllCompletedPurchaseOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCompletedPO = yield database_1.pool.query("SELECT * FROM purchase_order WHERE fulfilled = TRUE");
        res.json(allCompletedPO.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllCompletedPurchaseOrders = getAllCompletedPurchaseOrders;
// GET all PENDING purchase orders
const getAllPendingPurchaseOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPendingPO = yield database_1.pool.query("SELECT * FROM purchase_order WHERE fulfilled IS NULL OR fulfilled = FALSE");
        res.json(allPendingPO.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllPendingPurchaseOrders = getAllPendingPurchaseOrders;
// POST one purchase order
const getOnePurchaseOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order_id = Number(req.params.poID);
        // check if purchase order exists
        const onePurchaseOrder = yield database_1.pool.query("SELECT purchase_order.order_id, purchase_order.username, purchase_order.product_id, purchase_order.order_quantity, purchase_order.order_placed_date, purchase_order.estimated_receive_date, purchase_order.received_date, purchase_order.fulfilled, product_inventory.product_description, product_inventory.supplier, product_inventory.supplier_leadtime, product_inventory.unit_of_measurement FROM purchase_order JOIN product_inventory ON purchase_order.product_id = product_inventory.product_id WHERE purchase_order.order_id = ($1);", [order_id]);
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
// PUT adding a new purchase order
const addNewPurchaseOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const product_id = req.body.productID.toUpperCase();
        const order_quantity = req.body.orderQuantity;
        const order_placed_date = new Date(req.body.orderPlacedDate);
        // getting leadtime duration in days from product_inventory table
        const leadtime = yield database_1.pool.query("SELECT supplier_leadtime FROM product_inventory WHERE product_id = ($1)", [product_id]);
        const leadtimeInDays = leadtime.rows[0].supplier_leadtime;
        // calculate new Date using the time (milliseconds)
        const estimated_receive_date = new Date(order_placed_date.getTime() + leadtimeInDays * 24 * 60 * 60 * 1000);
        // adding a new purchase order
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
// PATCH updating purchase order
const updatePurchaseOrderWhenReceived = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // take from req
    const received_date = new Date(req.body.receivedDate);
    const fulfilled = req.body.fulfilled;
    const order_id = Number(req.params.poID);
    // retrieve estimated date for the order to compare with received date
    const estimated_receive_date = yield database_1.pool.query("SELECT estimated_receive_date FROM purchase_order WHERE order_id = ($1)", [order_id]);
    const estimated = estimated_receive_date.rows[0].estimated_receive_date;
    // function to compare 2 dates
    const compareDates = (estimated, received) => {
        if (estimated > received) {
            return true;
        }
        else if (received > estimated) {
            return false;
        }
        else {
            return true;
        }
    };
    // the function will determine if the order was on_time or late
    const on_time = compareDates(estimated, received_date);
    const updateOnePurchaseOrder = yield database_1.pool.query("UPDATE purchase_order SET received_date = ($1), fulfilled = ($2), on_time = ($3) WHERE order_id = ($4) RETURNING *", [received_date, fulfilled, on_time, order_id]);
    res.json({
        status: "ok",
        message: "PO updated",
        order: updateOnePurchaseOrder.rows[0],
    });
    try {
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.updatePurchaseOrderWhenReceived = updatePurchaseOrderWhenReceived;
// POST data for chart
const getChartDataPO = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.productID.toUpperCase();
        const chartDataPO = yield database_1.pool.query("SELECT product_id, date_trunc('month', order_placed_date) AS month, SUM(order_quantity) AS total_order_quantity FROM purchase_order WHERE product_id=($1) GROUP BY product_id, month ORDER BY product_id, month;", [product_id]);
        if (chartDataPO.rows.length != 0) {
            res.json(chartDataPO.rows);
        }
        else {
            res.json({ status: "error", message: "no data for product" });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getChartDataPO = getChartDataPO;
