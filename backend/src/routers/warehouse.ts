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
import { authManager } from "../middlewares/authUsers";

const router = express.Router();

router.get("/all", authManager, getAllProductsInWarehouse);
router.post(
  "/:productID",
  authManager,
  checkProductIDParams,
  inputValidation,
  getOneProductInWarehouse
);
router.put(
  "/add",
  authManager,
  checkAddProductToWarehouseInput,
  inputValidation,
  addOneProductToWarehouse
);
router.patch(
  "/:productID",
  authManager,
  checkProductIDParams,
  checkUpdateProductInWarehouseInput,
  inputValidation,
  updateOneProductInWarehouse
);

export default router;
