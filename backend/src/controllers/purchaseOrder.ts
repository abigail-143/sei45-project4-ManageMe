import { Request, Response } from "express";
import { pool } from "../db/database";

export const getAllPurchaseOrders = async (req: Request, res: Response) => {
  try {
    const allPurchaseOrders = await pool.query("SELECT * FROM purchase_order");

    res.json(allPurchaseOrders.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const getOnePurchaseOrder = async (req: Request, res: Response) => {
  try {
    const order_id: number = Number(req.params.poID);
    const onePurchaseOrder = await pool.query(
      "SELECT * FROM purchase_order WHERE order_id = ($1)",
      [order_id]
    );

    if (onePurchaseOrder.rows.length != 0) {
      res.json(onePurchaseOrder.rows);
    } else {
      res.json({ status: "error", message: "no such order" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const addNewPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const product_id: string = req.body.productID.toUpperCase();
    const order_quantity: number = req.body.orderQuantity;
    const order_placed_date: Date = new Date(req.body.orderPlacedDate);

    const leadtime = await pool.query(
      "SELECT supplier_leadtime FROM product_inventory WHERE product_id = ($1)",
      [product_id]
    );
    const leadtimeInDays: number = leadtime.rows[0].supplier_leadtime;

    // calculate new Date using the time (milliseconds)
    const estimated_receive_date: Date = new Date(
      order_placed_date.getTime() + leadtimeInDays * 24 * 60 * 60 * 1000
    );

    const placeNewPurchaseOrder = await pool.query(
      "INSERT INTO purchase_order(username, product_id, order_quantity, order_placed_date, estimated_receive_date) VALUES ($1, $2, $3, $4, $5) RETURNING order_id, username, product_id, order_quantity, order_placed_date, estimated_receive_date",
      [
        username,
        product_id,
        order_quantity,
        order_placed_date,
        estimated_receive_date,
      ]
    );

    res.json({
      status: "ok",
      message: "new purchase order created",
      order: placeNewPurchaseOrder.rows[0],
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// export const updatePurchaseOrderWhenReceived = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//   } catch (error) {
//     res.json({ status: "error", message: error });
//   }
// };
