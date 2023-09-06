import { body, param } from "express-validator";

// PRODUCTS

export const checkNewProductInput = [
  // not.isEmpty checks for key
  body("productID", "Product ID is required").trim().not().isEmpty(),
  // isLength checks for value input
  body("productID", "invalid format for Product ID").trim().isLength({
    min: 7,
    max: 7,
  }),
  body("productDescription", "Product Description is required.")
    .notEmpty()
    .isLength({ min: 1, max: 255 }),
  body("unitOfMeasurement", "UOM required")
    .notEmpty()
    .isIn(["CTN", "BOX", "EA"]),
  body("inUse", "set to active").isBoolean(),
  body("supplier", "Supplier is required, max 255 characters")
    .notEmpty()
    .isLength({ min: 1, max: 255 }),
  body("supplierLeadtime", "Supplier Lead Time is required")
    .notEmpty()
    .isInt({ min: 1 }),
  body("piecePerUOM", "Piece Per UOM required").notEmpty().isInt({ min: 1 }),
  body("costPerUOM", "Cost of Item is required.")
    .notEmpty()
    .isFloat({ min: 1 }),
];
