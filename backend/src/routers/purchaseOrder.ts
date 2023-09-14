import express from "express";
import {
  addNewPurchaseOrder,
  getAllCompletedPurchaseOrders,
  getAllPendingPurchaseOrders,
  getAllPurchaseOrders,
  getChartDataPO,
  getOnePurchaseOrder,
  updatePurchaseOrderWhenReceived,
} from "../controllers/purchaseOrder";
import {
  checkAddNewPurchaseOrderInput,
  checkProductIDParams,
  checkPurchaseOrderIDParams,
  checkUpdatePurchaseOrderInput,
} from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";
import { authManager } from "../middlewares/authUsers";

const router = express.Router();

router.get("/all", authManager, getAllPurchaseOrders);
router.get("/all/completed", authManager, getAllCompletedPurchaseOrders);
router.get("/all/pending", authManager, getAllPendingPurchaseOrders);
router.post(
  "/:poID",
  authManager,
  checkPurchaseOrderIDParams,
  inputValidation,
  getOnePurchaseOrder
);
router.put(
  "/new",
  authManager,
  checkAddNewPurchaseOrderInput,
  inputValidation,
  addNewPurchaseOrder
);
router.patch(
  "/:poID",
  authManager,
  checkPurchaseOrderIDParams,
  checkUpdatePurchaseOrderInput,
  inputValidation,
  updatePurchaseOrderWhenReceived
);
router.post(
  "/chart/:productID",
  authManager,
  checkProductIDParams,
  inputValidation,
  getChartDataPO
);

export default router;
