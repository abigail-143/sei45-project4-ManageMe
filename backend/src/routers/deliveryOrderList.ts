import express from "express";
import {
  addOneItemToOneDeliveryOrder,
  getAllListItemsForOneDeliveryOrder,
} from "../controllers/deliveryOrderList";

const router = express.Router();

router.post("/:doID", getAllListItemsForOneDeliveryOrder);
router.put("/add", addOneItemToOneDeliveryOrder);

export default router;
