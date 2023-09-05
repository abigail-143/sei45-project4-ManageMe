import { Request, Response } from "express";
import { pool } from "../db/database";

export const getAllProductsInWarehouse = async (
  req: Request,
  res: Response
) => {
  try {
    const warehouseProducts = await pool.query(
      "SELECT warehouse.product_id, warehouse.warehouse_quantity, warehouse.warehouse_stocklevel, product_inventory.unit_of_measurement FROM warehouse JOIN product_inventory ON warehouse.product_id = product_inventory.product_id"
    );
    res.json(warehouseProducts.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const getOneProductInWarehouse = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.params.productID.toUpperCase();
    const oneProductInWarehouse = await pool.query(
      "SELECT warehouse.product_id, warehouse.warehouse_quantity, warehouse.warehouse_stocklevel, product_inventory.unit_of_measurement FROM warehouse JOIN product_inventory ON warehouse.product_id = product_inventory.product_id WHERE warehouse.product_id = ($1)",
      [product_id]
    );

    if (oneProductInWarehouse.rows.length != 0) {
      res.json(oneProductInWarehouse.rows);
    } else {
      res.json({ status: "error", message: "no such product in warehouse" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const addOneProductToWarehouse = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.body.productID.toUpperCase();
    const warehouse_quantity: number = Number(req.body.warehouseQuantity);

    const firstCheck = await pool.query(
      "SELECT * FROM warehouse WHERE product_id = ($1)",
      [product_id]
    );

    if (firstCheck.rows.length != 0) {
      res.json({
        status: "error",
        message: "product already exists in warehouse",
      });
    } else {
      const addOneProductToWarehouse = await pool.query(
        "INSERT INTO warehouse (product_id, warehouse_quantity) VALUES ($1, $2) RETURNING *",
        [product_id, warehouse_quantity]
      );

      res.json({
        status: "ok",
        message: "product added to warehouse",
        warehouseItem: addOneProductToWarehouse.rows[0],
      });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
