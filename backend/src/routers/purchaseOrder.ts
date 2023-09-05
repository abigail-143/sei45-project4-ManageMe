import express from "express";
import {
  addNewPurchaseOrder,
  getAllPurchaseOrders,
  getOnePurchaseOrder,
} from "../controllers/purchaseOrder";

const router = express.Router();

router.get("/all", getAllPurchaseOrders);
router.post("/:poID", getOnePurchaseOrder);
router.put("/new", addNewPurchaseOrder);

export default router;
