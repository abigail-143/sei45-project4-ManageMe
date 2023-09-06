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

const router = express.Router();

router.post(
  "/:doID",
  checkDeliveryOrderIDParams,
  inputValidation,
  getAllListItemsForOneDeliveryOrder
);
router.put(
  "/add",
  checkAddNewProductToDeliveryOrderInput,
  inputValidation,
  addOneItemToOneDeliveryOrder
);

export default router;
