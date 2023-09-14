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
import { auth } from "../middlewares/authUsers";

const router = express.Router();

router.get("/all", auth, getAllProductsInStore);
router.post(
  "/:productID",
  auth,
  checkProductIDParams,
  inputValidation,
  getOneProductInStore
);
router.put(
  "/add",
  auth,
  checkAddProductToStoreInput,
  inputValidation,
  addOneProductToStore
);
router.patch(
  "/:productID",
  auth,
  checkProductIDParams,
  checkUpdateProductInStoreInput,
  inputValidation,
  amendOneProductInStore
);

export default router;
