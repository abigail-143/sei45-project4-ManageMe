import express from "express";
import {
  addOneProductToStore,
  amendOneProductInStore,
  getAllProductsInStore,
  getOneProductInStore,
} from "../controllers/stores";

const router = express.Router();

router.get("/all", getAllProductsInStore);
router.post("/:productID", getOneProductInStore);
router.put("/add", addOneProductToStore);
router.patch("/:productID", amendOneProductInStore);

export default router;
