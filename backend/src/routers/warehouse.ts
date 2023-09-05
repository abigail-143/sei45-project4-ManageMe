import express from "express";
import {
  addOneProductToWarehouse,
  getAllProductsInWarehouse,
  getOneProductInWarehouse,
  updateOneProductInWarehouse,
} from "../controllers/warehouse";

const router = express.Router();

router.get("/all", getAllProductsInWarehouse);
router.post("/:productID", getOneProductInWarehouse);
router.put("/add", addOneProductToWarehouse);
router.patch("/:productID", updateOneProductInWarehouse);

export default router;
