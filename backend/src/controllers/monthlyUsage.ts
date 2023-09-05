import { Request, Response } from "express";
import { pool } from "../db/database";

// GET all data
export const getAllData = async (req: Request, res: Response) => {
  try {
    const allMonthlyUsageData = await pool.query(
      "SELECT * FROM monthly_store_usage"
    );

    res.json(allMonthlyUsageData.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// POST get all monthYear data related to ONE productID
export const getDataForOneProduct = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.params.productID.toUpperCase();

    const allDataForOneProduct = await pool.query(
      "SELECT * FROM monthly_store_usage WHERE product_id = ($1)",
      [product_id]
    );

    if (allDataForOneProduct.rows.length != 0) {
      res.json(allDataForOneProduct.rows);
    } else {
      res.json({
        status: "error",
        message: "no data found for this product!!",
        my: "hi",
      });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// POST get all productID data related to ONE period
export const getDataForSpecificPeriod = async (req: Request, res: Response) => {
  try {
    const month_year: Date = new Date(req.body.monthYear);

    const allDataForSpecificPeriod = await pool.query(
      "SELECT * FROM monthly_store_usage WHERE month_year = ($1)",
      [month_year]
    );

    if (allDataForSpecificPeriod.rows.length != 0) {
      res.json(allDataForSpecificPeriod.rows);
    } else {
      res.json({
        status: "error",
        message: "no data found for this period"
      });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

