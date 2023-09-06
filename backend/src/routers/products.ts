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

const router = express.Router();

router.get("/all", getAllProducts);
router.put("/new", checkNewProductInput, inputValidation, addOneProduct);
router.patch(
  "/:productID",
  checkProductIDParams,
  checkProductInUseInput,
  inputValidation,
  updateIfProductInUse
);

export default router;
