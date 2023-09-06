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

const router = express.Router();

router.get("/all", getAllData);
router.put("/add", checkAddNewDataMonthlyUsage, inputValidation, addNewDataSet);
router.post(
  "/product/:productID",
  checkProductIDParams,
  inputValidation,
  getDataForOneProduct
);
router.post(
  "/period",
  checkPeriodForMonthlyUsage,
  inputValidation,
  getDataForSpecificPeriod
);

export default router;
