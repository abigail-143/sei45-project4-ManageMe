import express from "express";
import {
  addNewStoreDeliveryOrder,
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

const router = express.Router();

router.get("/all", getAllStoreDeliveryOrders);
router.post(
  "/:doID",
  checkDeliveryOrderIDParams,
  inputValidation,
  getOneStoreDeliveryOrder
);
router.put(
  "/new",
  checkAddNewDeliveryOrderInput,
  inputValidation,
  addNewStoreDeliveryOrder
);
router.patch(
  "/:doID",
  checkDeliveryOrderIDParams,
  checkUpdateDeliveryOrderInput,
  inputValidation,
  updateOneStoreDeliveryOrder
);

export default router;
