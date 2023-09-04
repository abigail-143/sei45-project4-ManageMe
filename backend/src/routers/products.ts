import express from "express";
import { addOneProduct, getAllProducts } from "../controllers/products";

const router = express.Router();

router.get("/all", getAllProducts);
router.put("/new", addOneProduct);

export default router;
