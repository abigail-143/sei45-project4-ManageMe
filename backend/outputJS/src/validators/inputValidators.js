"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNewProductInput = void 0;
const express_validator_1 = require("express-validator");
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
