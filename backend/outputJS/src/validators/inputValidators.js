"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPeriodForMonthlyUsage = exports.checkAddNewDataMonthlyUsage = exports.checkAddNewProductToDeliveryOrderInput = exports.checkUpdateDeliveryOrderInput = exports.checkAddNewDeliveryOrderInput = exports.checkUpdatePurchaseOrderInput = exports.checkAddNewPurchaseOrderInput = exports.checkUpdateProductInStoreInput = exports.checkAddProductToStoreInput = exports.checkUpdateProductInWarehouseInput = exports.checkAddProductToWarehouseInput = exports.checkProductInUseInput = exports.checkNewProductInput = exports.addNewUserInput = exports.checkUserLoginInput = exports.checkUsernameParams = exports.checkDeliveryOrderIDParams = exports.checkPurchaseOrderIDParams = exports.checkProductIDParams = void 0;
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
exports.checkUsernameParams = [
    (0, express_validator_1.param)("username", "invalid username input").isLength({ min: 5, max: 25 }),
];
// BODY
// USERS
exports.checkUserLoginInput = [
    (0, express_validator_1.body)("username", "username is required").trim().not().isEmpty(),
    (0, express_validator_1.body)("username", "invalid username input")
        .trim()
        .isLength({ min: 5, max: 25 }),
];
exports.addNewUserInput = [
    (0, express_validator_1.body)("username", "username is required").trim().not().isEmpty(),
    (0, express_validator_1.body)("username", "invalid username input")
        .trim()
        .isLength({ min: 5, max: 25 }),
    (0, express_validator_1.body)("password", "password is required").trim().not().isEmpty(),
    (0, express_validator_1.body)("password", "invalid password input")
        .trim()
        .isLength({ min: 8, max: 25 }),
    (0, express_validator_1.body)("email", "email is required").trim().not().isEmpty(),
    (0, express_validator_1.body)("email", "invalid email input").isEmail(),
    (0, express_validator_1.body)("company", "company is required").notEmpty(),
    (0, express_validator_1.body)("status", "invalid user status input").isBoolean(),
    (0, express_validator_1.body)("account", "invalid account type input").isIn(["Manager", "Staff"]),
];
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
    // just check if the input is empty, cause on the controllers end, it will convert it to a date format
    (0, express_validator_1.body)("receivedDate", "Received Date is required").notEmpty(),
    (0, express_validator_1.body)("fulfilled", "invalid Fulfilled input").isBoolean(),
];
// DELIVERY ORDER
exports.checkAddNewDeliveryOrderInput = [
    (0, express_validator_1.body)("username", "username is required").trim().not().isEmpty(),
    (0, express_validator_1.body)("username", "invalid username").trim().isLength({ min: 5, max: 25 }),
    // just check if the input is empty, cause on the controllers end, it will convert it to a date formats
    (0, express_validator_1.body)("deliveryPlacedDate", "Delivery Order placed date is required").notEmpty(),
    (0, express_validator_1.body)("toDeliverDate", "Delivery Date is required").notEmpty(),
];
exports.checkUpdateDeliveryOrderInput = [
    // just check if the input is empty, cause on the controllers end, it will convert it to a date format
    (0, express_validator_1.body)("deliveredDate", "Order Delivered Date is required").notEmpty(),
    (0, express_validator_1.body)("completed", "invalid Completed input").isBoolean(),
];
// DELIVERY ORDER LIST
exports.checkAddNewProductToDeliveryOrderInput = [
    (0, express_validator_1.body)("deliveryID", "Delivery ID is required").notEmpty().isInt(),
    (0, express_validator_1.body)("productID", "Product ID is required").trim().not().isEmpty(),
    // isLength checks for value input
    (0, express_validator_1.body)("productID", "invalid format for Product ID").trim().isLength({
        min: 7,
        max: 7,
    }),
    (0, express_validator_1.body)("deliveryQuantity", "Delivery Quantity is required").isInt({ min: 1 }),
];
// MONTHLY USAGE
exports.checkAddNewDataMonthlyUsage = [
    (0, express_validator_1.body)("productID", "Product ID is required").trim().not().isEmpty(),
    // isLength checks for value input
    (0, express_validator_1.body)("productID", "invalid format for Product ID").trim().isLength({
        min: 7,
        max: 7,
    }),
    // just check if the input is empty, cause on the controllers end, it will convert it to a date format
    (0, express_validator_1.body)("monthYear", "Usage period is required").notEmpty(),
    (0, express_validator_1.body)("totalOrderQuantity", "Total Order Quantity is required").isInt({
        min: 1,
    }),
];
exports.checkPeriodForMonthlyUsage = [
    // just check if the input is empty, cause on the controllers end, it will convert it to a date format
    (0, express_validator_1.body)("monthYear", "Usage period is required").notEmpty(),
];
