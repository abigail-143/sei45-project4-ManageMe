import express from "express";
import {
  addNewPurchaseOrder,
  getAllPurchaseOrders,
  getOnePurchaseOrder,
  updatePurchaseOrderWhenReceived,
} from "../controllers/purchaseOrder";

const router = express.Router();

router.get("/all", getAllPurchaseOrders);
router.post("/:poID", getOnePurchaseOrder);
router.put("/new", addNewPurchaseOrder);
router.patch("/:poID", updatePurchaseOrderWhenReceived)

export default router;
