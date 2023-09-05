import express from "express"
import { getAllStoreDeliveryOrders, getOneStoreDeliveryOrder } from "../controllers/deliveryOrders"

const router = express.Router()

router.get("/all", getAllStoreDeliveryOrders)
router.post("/:doID", getOneStoreDeliveryOrder)
// router.put("new")
// router.patch("/:doID")

export default router;