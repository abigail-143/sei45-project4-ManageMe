import express from "express";
import {
  addOneProduct,
  getAllProducts,
  updateIfProductInUse,
} from "../controllers/products";
import {
  checkNewProductInput,
  checkProductIDParams,
  checkProductInUseInput,
} from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";
import { authManager } from "../middlewares/authUsers";

const router = express.Router();

router.get("/all", authManager, getAllProducts);
router.put(
  "/new",
  authManager,
  checkNewProductInput,
  inputValidation,
  addOneProduct
);
router.patch(
  "/:productID",
  authManager,
  checkProductIDParams,
  checkProductInUseInput,
  inputValidation,
  updateIfProductInUse
);

export default router;
