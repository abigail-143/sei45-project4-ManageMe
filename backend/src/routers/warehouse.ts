import express from "express";
import {
  addOneProductToWarehouse,
  getAllProductsInWarehouse,
  getOneProductInWarehouse,
} from "../controllers/warehouse";

const router = express.Router();

router.get("/all", getAllProductsInWarehouse);
router.post("/:productID", getOneProductInWarehouse);
router.put("/add", addOneProductToWarehouse);
router.patch("/:productID");

export default router;
