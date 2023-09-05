import { Request, Response } from "express";
import { pool } from "../db/database";

export const getAllStoreDeliveryOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const allStoreDelivery = await pool.query("SELECT * FROM store_delivery");

    res.json(allStoreDelivery.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const getOneStoreDeliveryOrder = async (req: Request, res: Response) => {
  try {
    const delivery_id: Number = Number(req.params.doID);
    const oneStoreDeliveryOrder = await pool.query(
      "SELECT * FROM store_delivery WHERE delivery_id = ($1)",
      [delivery_id]
    );

    if (oneStoreDeliveryOrder.rows.length != 0) {
      res.json(oneStoreDeliveryOrder.rows);
    } else {
      res.json({ status: "error", message: "no sure delivery" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
