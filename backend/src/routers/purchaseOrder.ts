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

const router = express.Router();

router.get("/all", getAllPurchaseOrders);
router.post(
  "/:poID",
  checkPurchaseOrderIDParams,
  inputValidation,
  getOnePurchaseOrder
);
router.put(
  "/new",
  checkAddNewPurchaseOrderInput,
  inputValidation,
  addNewPurchaseOrder
);
router.patch(
  "/:poID",
  checkPurchaseOrderIDParams,
  checkUpdatePurchaseOrderInput,
  inputValidation,
  updatePurchaseOrderWhenReceived
);

export default router;
