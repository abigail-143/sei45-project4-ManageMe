import { Request, Response } from "express";
import { pool } from "../db/database";

export const getAllProductsInStore = async (req: Request, res: Response) => {
  try {
    const storeProducts = await pool.query(
      "SELECT store.store_id, store.product_id, store.store_quantity, product_inventory.unit_of_measurement, product_inventory.product_description FROM store JOIN product_inventory ON store.product_id = product_inventory.product_id"
    );

    res.json(storeProducts.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const getOneProductInStore = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.params.productID.toUpperCase();
    const oneProductInStore = await pool.query(
      "SELECT store.product_id, store.store_quantity, product_inventory.unit_of_measurement, product_inventory.product_description FROM store JOIN product_inventory ON store.product_id = product_inventory.product_id WHERE store.product_id = ($1)",
      [product_id]
    );

    if (oneProductInStore.rows.length != 0) {
      res.json(oneProductInStore.rows);
    } else {
      res.json({ status: "error", message: "no such product in store" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const addOneProductToStore = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.body.productID.toUpperCase();
    const store_quantity: number = req.body.storeQuantity;
    const addNewProduct = await pool.query(
      "INSERT INTO store (product_id, store_quantity) VALUES ($1, $2)",
      [product_id, store_quantity]
    );

    res.json({ status: "ok", message: "new product added to store" });
  } catch (error) {
    res.json({ status: "error", message: "unable to add product to store" });
  }
};

export const amendOneProductInStore = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.params.productID.toUpperCase();
    const store_quantity: number = req.body.storeQuantity;
    const amendProduct = await pool.query(
      "UPDATE store SET store_quantity = ($1) WHERE product_id = ($2)",
      [store_quantity, product_id]
    );

    res.json({ status: "ok", message: "product quantity updated" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
