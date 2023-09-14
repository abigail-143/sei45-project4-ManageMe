import { Request, Response } from "express";
import { pool } from "../db/database";

// GET all Delivery Orders
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

// GET all COMPLETED Delivery Orders
export const getAllCompletedStoreDeliveryOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const allCompletedStoreDelivery = await pool.query(
      "SELECT * FROM store_delivery WHERE completed = TRUE"
    );

    res.json(allCompletedStoreDelivery.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// GET all PENDING / INCOMPLETE Delivery Orders
export const getAllPendingStoreDeliveryOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const allPendingStoreDelivery = await pool.query(
      "SELECT * FROM store_delivery WHERE completed IS NULL or completed = False"
    );

    res.json(allPendingStoreDelivery.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// GET one Delivery Order using delivery_id
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
      res.json({ status: "error", message: "no such delivery" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// PUT adding a new Delivery Order
export const addNewStoreDeliveryOrder = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const delivery_placed_date: Date = new Date(req.body.deliveryPlacedDate);
    const to_deliver_date: Date = new Date(req.body.toDeliverDate);

    const addNewDeliveryOrder = await pool.query(
      "INSERT INTO store_delivery (username, delivery_placed_date, to_deliver_date) VALUES ($1, $2, $3) RETURNING delivery_id, username, delivery_placed_date, to_deliver_date",
      [username, delivery_placed_date, to_deliver_date]
    );

    res.json({
      status: "ok",
      message: "new store delivery order created",
      order: addNewDeliveryOrder.rows[0],
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// PATCH update one Delivery Order with delivered_date and completed
export const updateOneStoreDeliveryOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const delivered_date: Date = new Date(req.body.deliveredDate);
    const completed: boolean = req.body.completed;
    const delivery_id: Number = Number(req.params.doID);

    // check if delivery order is valid/existing
    const firstCheck = await pool.query(
      "SELECT * FROM store_delivery WHERE delivery_id = ($1)",
      [delivery_id]
    );

    if (firstCheck.rows.length != 0) {
      const updateOneDeliveryOrder = await pool.query(
        "UPDATE store_delivery SET delivered_date = ($1), completed = ($2) WHERE delivery_id = ($3) RETURNING *",
        [delivered_date, completed, delivery_id]
      );

      res.json({
        status: "ok",
        message: "DO updated",
        order: updateOneDeliveryOrder.rows[0],
      });
    } else {
      res.json({ status: "error", message: "Delivery Order does not exist" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
