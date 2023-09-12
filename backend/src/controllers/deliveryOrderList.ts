import { Request, Response } from "express";
import { pool } from "../db/database";

// POST all list-items related to ONE Delivery Order
export const getAllListItemsForOneDeliveryOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const delivery_id: Number = Number(req.params.doID);
    const allListItemsOneDO = await pool.query(
      "SELECT delivery_list.delivery_id, delivery_list.product_id, delivery_list.delivery_quantity, product_inventory.product_description, product_inventory.unit_of_measurement FROM delivery_list JOIN product_inventory on delivery_list.product_id = product_inventory.product_id WHERE delivery_id = ($1)",
      [delivery_id]
    );

    if (allListItemsOneDO.rows.length != 0) {
      res.json(allListItemsOneDO.rows);
    } else {
      res.json({ status: "error", message: "no such delivery" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// PUT add one product item to ONE Delivery Order
export const addOneItemToOneDeliveryOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const delivery_id: Number = Number(req.body.deliveryID);
    const product_id: String = req.body.productID.toUpperCase();
    const delivery_quantity: Number = Number(req.body.deliveryQuantity);

    // const addOneItemToDO = await pool.query(
    //   "INSERT INTO delivery_list (delivery_id, product_id, delivery_quantity) VALUES ($1, $2, $3) RETURNING *",
    //   [delivery_id, product_id, delivery_quantity]
    // );

    const firstCheck = await pool.query(
      "SELECT * FROM delivery_list WHERE delivery_id = ($1) AND product_id = ($2)",
      [delivery_id, product_id]
    );

    if (firstCheck.rows.length != 0) {
      res.json({
        status: "error",
        message: "product already added to this order",
      });
    } else {
      const addOneItemToDO = await pool.query(
        "INSERT INTO delivery_list (delivery_id, product_id, delivery_quantity) VALUES ($1, $2, $3) RETURNING *",
        [delivery_id, product_id, delivery_quantity]
      );

      res.json({
        status: "ok",
        message: "product added to delivery order",
        listItem: addOneItemToDO.rows[0],
      });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
