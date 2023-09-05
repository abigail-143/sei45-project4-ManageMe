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
exports.getDataForSpecificPeriod = exports.getDataForOneProduct = exports.getAllData = void 0;
const database_1 = require("../db/database");
// GET all data
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allMonthlyUsageData = yield database_1.pool.query("SELECT * FROM monthly_store_usage");
        res.json(allMonthlyUsageData.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllData = getAllData;
// POST get all monthYear data related to ONE productID
const getDataForOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product_id = req.params.productID.toUpperCase();
        const allDataForOneProduct = yield database_1.pool.query("SELECT * FROM monthly_store_usage WHERE product_id = ($1)", [product_id]);
        if (allDataForOneProduct.rows.length != 0) {
            res.json(allDataForOneProduct.rows);
        }
        else {
            res.json({
                status: "error",
                message: "no data found for this product!!",
                my: "hi",
            });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getDataForOneProduct = getDataForOneProduct;
// POST get all productID data related to ONE period
const getDataForSpecificPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const month_year = new Date(req.body.monthYear);
        const allDataForSpecificPeriod = yield database_1.pool.query("SELECT * FROM monthly_store_usage WHERE month_year = ($1)", [month_year]);
        if (allDataForSpecificPeriod.rows.length != 0) {
            res.json(allDataForSpecificPeriod.rows);
        }
        else {
            res.json({
                status: "error",
                message: "no data found for this period"
            });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getDataForSpecificPeriod = getDataForSpecificPeriod;
