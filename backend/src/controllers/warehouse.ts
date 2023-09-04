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
    const product_id: string = req.params.productID;
    const oneProductFromWarehouse = await pool.query(
      "SELECT warehouse.product_id, warehouse.warehouse_quantity, warehouse.warehouse_stocklevel, product_inventory.unit_of_measurement FROM warehouse JOIN product_inventory ON warehouse.product_id = product_inventory.product_id WHERE warehouse.product_id = ($1)",
      [product_id]
    );

    if (oneProductFromWarehouse.rows.length != 0) {
      res.json(oneProductFromWarehouse.rows);
    } else {
      res.json({ status: "error", message: "no such product in warehouse" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
