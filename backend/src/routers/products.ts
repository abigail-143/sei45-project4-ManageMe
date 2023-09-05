import express from "express";
import {
  addOneProduct,
  getAllProducts,
  updateIfProductInUse,
} from "../controllers/products";

const router = express.Router();

router.get("/all", getAllProducts);
router.put("/new", addOneProduct);
router.patch("/:productID", updateIfProductInUse);

export default router;
