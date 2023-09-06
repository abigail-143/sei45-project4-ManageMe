import express from "express";
import {
  addOneProductToWarehouse,
  getAllProductsInWarehouse,
  getOneProductInWarehouse,
  updateOneProductInWarehouse,
} from "../controllers/warehouse";
import {
  checkAddProductToWarehouseInput,
  checkProductIDParams,
  checkUpdateProductInWarehouseInput,
} from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";

const router = express.Router();

router.get("/all", getAllProductsInWarehouse);
router.post(
  "/:productID",
  checkProductIDParams,
  inputValidation,
  getOneProductInWarehouse
);
router.put(
  "/add",
  checkAddProductToWarehouseInput,
  inputValidation,
  addOneProductToWarehouse
);
router.patch(
  "/:productID",
  checkProductIDParams,
  checkUpdateProductInWarehouseInput,
  inputValidation,
  updateOneProductInWarehouse
);

export default router;
