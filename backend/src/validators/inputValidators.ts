import { body, param } from "express-validator";
import { format } from "path";

// PARAMS

export const checkProductIDParams = [
  param("productID", "Product ID is invalid").isLength({ min: 7, max: 7 }),
];

export const checkPurchaseOrderIDParams = [
  param("poID", "Purchase Order ID is invalid").isInt({ min: 1 }),
];

export const checkDeliveryOrderIDParams = [
  param("doID", "Delivery Order ID is invalid").isInt({ min: 1 }),
];

// BODY

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

export const checkProductInUseInput = [
  body("inUse", "In Use component must be boolean").isBoolean(),
];

// WAREHOUSE

export const checkAddProductToWarehouseInput = [
  // not.isEmpty checks for key
  body("productID", "Product ID is required").trim().not().isEmpty(),
  // isLength checks for value input
  body("productID", "invalid format for Product ID").trim().isLength({
    min: 7,
    max: 7,
  }),
  body("warehouseQuantity", "Warehouse Quantity is required")
    .notEmpty()
    .isInt({ min: 1 }),
];

export const checkUpdateProductInWarehouseInput = [
  body("warehouseQuantity", "Warehouse Quantity is required")
    .notEmpty()
    .isInt({ min: 1 }),
];

// STORE

export const checkAddProductToStoreInput = [
  // not.isEmpty checks for key
  body("productID", "Product ID is required").trim().not().isEmpty(),
  // isLength checks for value input
  body("productID", "invalid format for Product ID").trim().isLength({
    min: 7,
    max: 7,
  }),
  body("storeQuantity", "Store Quantity is required")
    .notEmpty()
    .isInt({ min: 1 }),
];

export const checkUpdateProductInStoreInput = [
  body("storeQuantity", "Store Quantity is required")
    .notEmpty()
    .isInt({ min: 1 }),
];

// PURCHASE ORDER

export const checkAddNewPurchaseOrderInput = [
  body("username", "username is required").trim().not().isEmpty(),
  body("username", "invalid username").trim().isLength({ min: 5, max: 25 }),
  body("productID", "Product ID is required").trim().not().isEmpty(),
  // isLength checks for value input
  body("productID", "invalid format for Product ID").trim().isLength({
    min: 7,
    max: 7,
  }),
  body("orderQuantity", "Order Quantity is required")
    .notEmpty()
    .isInt({ min: 1 }),
  // just check that the orderplaceddate is not empty cause in the controllers, we're converting it to a Date input alread
  body("orderPlacedDate", "order placed date required").notEmpty(),
];

export const checkUpdatePurchaseOrderInput = [
  // just check if the input is empty, cause on the controllers end, it will convert it to a date format
  body("receivedDate", "Received Date is required").notEmpty(),
  body("fulfilled", "invalid Fulfilled input").isBoolean(),
];

// DELIVERY ORDER

export const checkAddNewDeliveryOrderInput = [
  body("username", "username is required").trim().not().isEmpty(),
  body("username", "invalid username").trim().isLength({ min: 5, max: 25 }),
  // just check if the input is empty, cause on the controllers end, it will convert it to a date formats
  body(
    "deliveryPlacedDate",
    "Delivery Order placed date is required"
  ).notEmpty(),
  body("toDeliverDate", "Delivery Date is required").notEmpty(),
];

export const checkUpdateDeliveryOrderInput = [
  // just check if the input is empty, cause on the controllers end, it will convert it to a date format
  body("deliveredDate", "Order Delivered Date is required").notEmpty(),
  body("completed", "invalid Completed input").isBoolean(),
];

// DELIVERY ORDER LIST

export const checkAddNewProductToDeliveryOrderInput = [
  body("deliveryID", "Delivery ID is required").notEmpty().isInt(),
  body("productID", "Product ID is required").trim().not().isEmpty(),
  // isLength checks for value input
  body("productID", "invalid format for Product ID").trim().isLength({
    min: 7,
    max: 7,
  }),
  body("deliveryQuantity", "Delivery Quantity is required").isInt({ min: 1 }),
];

// MONTHLY USAGE

export const checkAddNewDataMonthlyUsage = [
  body("productID", "Product ID is required").trim().not().isEmpty(),
  // isLength checks for value input
  body("productID", "invalid format for Product ID").trim().isLength({
    min: 7,
    max: 7,
  }),
  // just check if the input is empty, cause on the controllers end, it will convert it to a date format
  body("monthYear", "Usage period is required").notEmpty(),
  body("totalOrderQuantity", "Total Order Quantity is required").isInt({
    min: 1,
  }),
];

export const checkPeriodForMonthlyUsage = [
  // just check if the input is empty, cause on the controllers end, it will convert it to a date format
  body("monthYear", "Usage period is required").notEmpty(),
];
