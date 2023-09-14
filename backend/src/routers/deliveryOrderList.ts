import express from "express";
import {
  addOneItemToOneDeliveryOrder,
  getAllListItemsForOneDeliveryOrder,
} from "../controllers/deliveryOrderList";
import {
  checkAddNewProductToDeliveryOrderInput,
  checkDeliveryOrderIDParams,
} from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";
import { auth } from "../middlewares/authUsers";

const router = express.Router();

router.post(
  "/:doID",
  auth,
  checkDeliveryOrderIDParams,
  inputValidation,
  getAllListItemsForOneDeliveryOrder
);
router.put(
  "/add",
  auth,
  checkAddNewProductToDeliveryOrderInput,
  inputValidation,
  addOneItemToOneDeliveryOrder
);

export default router;
