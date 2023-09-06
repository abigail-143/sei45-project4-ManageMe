import express from "express";
import {
  addNewPurchaseOrder,
  getAllPurchaseOrders,
  getOnePurchaseOrder,
  updatePurchaseOrderWhenReceived,
} from "../controllers/purchaseOrder";
import {
  checkAddNewPurchaseOrderInput,
  checkPurchaseOrderIDParams,
  checkUpdatePurchaseOrderInput,
} from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";
import { authManager } from "../middlewares/authUsers";

const router = express.Router();

router.get("/all", authManager, getAllPurchaseOrders);
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

export default router;
