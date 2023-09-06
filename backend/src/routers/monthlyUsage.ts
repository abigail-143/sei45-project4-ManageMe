import express from "express";
import {
  addNewDataSet,
  getAllData,
  getDataForOneProduct,
  getDataForSpecificPeriod,
} from "../controllers/monthlyUsage";
import {
  checkAddNewDataMonthlyUsage,
  checkPeriodForMonthlyUsage,
  checkProductIDParams,
} from "../validators/inputValidators";
import { inputValidation } from "../middlewares/inputValidatorsCheck";
import { authManager } from "../middlewares/authUsers";

const router = express.Router();

router.get("/all", authManager, getAllData);
router.put(
  "/add",
  authManager,
  checkAddNewDataMonthlyUsage,
  inputValidation,
  addNewDataSet
);
router.post(
  "/product/:productID",
  authManager,
  checkProductIDParams,
  inputValidation,
  getDataForOneProduct
);
router.post(
  "/period",
  authManager,
  checkPeriodForMonthlyUsage,
  inputValidation,
  getDataForSpecificPeriod
);

export default router;
