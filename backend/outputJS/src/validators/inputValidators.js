"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUpdatePurchaseOrderInput = exports.checkAddNewPurchaseOrderInput = exports.checkUpdateProductInStoreInput = exports.checkAddProductToStoreInput = exports.checkUpdateProductInWarehouseInput = exports.checkAddProductToWarehouseInput = exports.checkProductInUseInput = exports.checkNewProductInput = exports.checkDeliveryOrderIDParams = exports.checkPurchaseOrderIDParams = exports.checkProductIDParams = void 0;
const express_validator_1 = require("express-validator");
// PARAMS
exports.checkProductIDParams = [
    (0, express_validator_1.param)("productID", "Product ID is invalid").isLength({ min: 7, max: 7 }),
];
exports.checkPurchaseOrderIDParams = [
    (0, express_validator_1.param)("poID", "Purchase Order ID is invalid").isInt({ min: 1 }),
];
exports.checkDeliveryOrderIDParams = [
    (0, express_validator_1.param)("doID", "Delivery Order ID is invalid").isInt({ min: 1 }),
];
// BODY
// PRODUCTS
exports.checkNewProductInput = [
    // not.isEmpty checks for key
    (0, express_validator_1.body)("productID", "Product ID is required").trim().not().isEmpty(),
    // isLength checks for value input
    (0, express_validator_1.body)("productID", "invalid format for Product ID").trim().isLength({
        min: 7,
        max: 7,
    }),
    (0, express_validator_1.body)("productDescription", "Product Description is required.")
        .notEmpty()
        .isLength({ min: 1, max: 255 }),
    (0, express_validator_1.body)("unitOfMeasurement", "UOM required")
        .notEmpty()
        .isIn(["CTN", "BOX", "EA"]),
    (0, express_validator_1.body)("inUse", "set to active").isBoolean(),
    (0, express_validator_1.body)("supplier", "Supplier is required, max 255 characters")
        .notEmpty()
        .isLength({ min: 1, max: 255 }),
    (0, express_validator_1.body)("supplierLeadtime", "Supplier Lead Time is required")
        .notEmpty()
        .isInt({ min: 1 }),
    (0, express_validator_1.body)("piecePerUOM", "Piece Per UOM required").notEmpty().isInt({ min: 1 }),
    (0, express_validator_1.body)("costPerUOM", "Cost of Item is required.")
        .notEmpty()
        .isFloat({ min: 1 }),
];
exports.checkProductInUseInput = [
    (0, express_validator_1.body)("inUse", "In Use component must be boolean").isBoolean(),
];
// WAREHOUSE
exports.checkAddProductToWarehouseInput = [
    // not.isEmpty checks for key
    (0, express_validator_1.body)("productID", "Product ID is required").trim().not().isEmpty(),
    // isLength checks for value input
    (0, express_validator_1.body)("productID", "invalid format for Product ID").trim().isLength({
        min: 7,
        max: 7,
    }),
    (0, express_validator_1.body)("warehouseQuantity", "Warehouse Quantity is required")
        .notEmpty()
        .isInt({ min: 1 }),
];
exports.checkUpdateProductInWarehouseInput = [
    (0, express_validator_1.body)("warehouseQuantity", "Warehouse Quantity is required")
        .notEmpty()
        .isInt({ min: 1 }),
];
// STORE
exports.checkAddProductToStoreInput = [
    // not.isEmpty checks for key
    (0, express_validator_1.body)("productID", "Product ID is required").trim().not().isEmpty(),
    // isLength checks for value input
    (0, express_validator_1.body)("productID", "invalid format for Product ID").trim().isLength({
        min: 7,
        max: 7,
    }),
    (0, express_validator_1.body)("storeQuantity", "Store Quantity is required")
        .notEmpty()
        .isInt({ min: 1 }),
];
exports.checkUpdateProductInStoreInput = [
    (0, express_validator_1.body)("storeQuantity", "Store Quantity is required")
        .notEmpty()
        .isInt({ min: 1 }),
];
// PURCHASE ORDER
exports.checkAddNewPurchaseOrderInput = [
    (0, express_validator_1.body)("username", "username is required").trim().not().isEmpty(),
    (0, express_validator_1.body)("username", "invalid username").trim().isLength({ min: 5, max: 25 }),
    (0, express_validator_1.body)("productID", "Product ID is required").trim().not().isEmpty(),
    // isLength checks for value input
    (0, express_validator_1.body)("productID", "invalid format for Product ID").trim().isLength({
        min: 7,
        max: 7,
    }),
    (0, express_validator_1.body)("orderQuantity", "Order Quantity is required")
        .notEmpty()
        .isInt({ min: 1 }),
    // just check that the orderplaceddate is not empty cause in the controllers, we're converting it to a Date input alread
    (0, express_validator_1.body)("orderPlacedDate", "order placed date required").notEmpty(),
];
exports.checkUpdatePurchaseOrderInput = [
    (0, express_validator_1.body)("receivedDate", "Received Date is required").notEmpty(),
    (0, express_validator_1.body)("fulfilled", "invalid fulfilled response").isBoolean(),
];
