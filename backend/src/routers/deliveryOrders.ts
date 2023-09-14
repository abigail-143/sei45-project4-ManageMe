import express from "express";
import {
  addNewStoreDeliveryOrder,
  getAllCompletedStoreDeliveryOrders,
  getAllPendingStoreDeliveryOrders,
  getAllStoreDeliveryOrders,
  getOneStoreDeliveryOrder,
  updateOneStoreDeliveryOrder,
} from "../controllers/deliveryOrders";
import {
  checkAddNewDeliveryOrderInput,
  checkDeliveryOrderIDParams,
  checkUpdateDeliveryOrderInput,
} from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";
import { auth } from "../middlewares/authUsers";

const router = express.Router();

router.get("/all", auth, getAllStoreDeliveryOrders);
router.get("/all/completed", auth, getAllCompletedStoreDeliveryOrders);
router.get("/all/pending", auth, getAllPendingStoreDeliveryOrders);
router.post(
  "/:doID",
  auth,
  checkDeliveryOrderIDParams,
  inputValidation,
  getOneStoreDeliveryOrder
);
router.put(
  "/new",
  auth,
  checkAddNewDeliveryOrderInput,
  inputValidation,
  addNewStoreDeliveryOrder
);
router.patch(
  "/:doID",
  auth,
  checkDeliveryOrderIDParams,
  checkUpdateDeliveryOrderInput,
  inputValidation,
  updateOneStoreDeliveryOrder
);

export default router;
