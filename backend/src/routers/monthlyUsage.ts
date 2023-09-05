import express from "express";
import {
  getAllData,
  getDataForOneProduct,
  getDataForSpecificPeriod,
} from "../controllers/monthlyUsage";

const router = express.Router();

router.get("/all", getAllData);
router.put("/add");
router.post("/product/:productID", getDataForOneProduct);
router.post("/period", getDataForSpecificPeriod);

export default router;
