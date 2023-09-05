import express from "express";
import {
  addNewStoreDeliveryOrder,
  getAllStoreDeliveryOrders,
  getOneStoreDeliveryOrder,
  updateOneStoreDeliveryOrder,
} from "../controllers/deliveryOrders";

const router = express.Router();

router.get("/all", getAllStoreDeliveryOrders);
router.post("/:doID", getOneStoreDeliveryOrder);
router.put("/new", addNewStoreDeliveryOrder);
router.patch("/:doID", updateOneStoreDeliveryOrder);

export default router;
