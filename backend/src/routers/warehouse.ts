import express from "express";
import {
  getAllProductsInWarehouse,
  getOneProductInWarehouse,
} from "../controllers/warehouse";

const router = express.Router();

router.get("/all", getAllProductsInWarehouse);
router.post("/:productID", getOneProductInWarehouse);

export default router;
