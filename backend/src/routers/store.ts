import express from "express";
import {
  addOneProductToStore,
  amendOneProductInStore,
  getAllProductsInStore,
  getOneProductInStore,
} from "../controllers/stores";
import {
  checkAddProductToStoreInput,
  checkProductIDParams,
  checkUpdateProductInStoreInput,
} from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";

const router = express.Router();

router.get("/all", getAllProductsInStore);
router.post(
  "/:productID",
  checkProductIDParams,
  inputValidation,
  getOneProductInStore
);
router.put(
  "/add",
  checkAddProductToStoreInput,
  inputValidation,
  addOneProductToStore
);
router.patch(
  "/:productID",
  checkProductIDParams,
  checkUpdateProductInStoreInput,
  inputValidation,
  amendOneProductInStore
);

export default router;
