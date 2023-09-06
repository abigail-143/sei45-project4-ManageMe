import express from "express";
import {
  addOneProduct,
  getAllProducts,
  updateIfProductInUse,
} from "../controllers/products";
import { checkNewProductInput } from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";

const router = express.Router();

router.get("/all", getAllProducts);
router.put("/new", checkNewProductInput, inputValidation, addOneProduct);
router.patch("/:productID", updateIfProductInUse);

export default router;
