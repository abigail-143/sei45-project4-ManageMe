import { Request, Response } from "express";
import { pool } from "../db/database";

// GET all products in store
export const getAllProductsInStore = async (req: Request, res: Response) => {
  try {
    const storeProducts = await pool.query(
      "SELECT store.store_id, store.product_id, store.store_quantity, product_inventory.unit_of_measurement, product_inventory.product_description, product_inventory.in_use, product_inventory.piece_per_uom FROM store JOIN product_inventory ON store.product_id = product_inventory.product_id"
    );

    res.json(storeProducts.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// GET one product in store
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

// PUT adding a product to store (if it doesn't already exists)
export const addOneProductToStore = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.body.productID.toUpperCase();
    const store_quantity: number = req.body.storeQuantity;

    // check if product already exists in store
    const firstCheck = await pool.query(
      "SELECT * FROM store WHERE product_id = ($1)",
      [product_id]
    );

    // check if product exists in warehouse
    const secondCheck = await pool.query(
      "SELECT * FROM warehouse WHERE product_id = ($1)",
      [product_id]
    );

    if (firstCheck.rows.length != 0) {
      res.json({ status: "error", message: "product already exists in store" });
    } else if (secondCheck.rows.length == 0) {
      res.json({
        status: "error",
        message: "no such product in warehouse, unable to add to store",
      });
    } else {
      // adding new item (since it doesn't exists in store)
      const addNewProduct = await pool.query(
        "INSERT INTO store (product_id, store_quantity) VALUES ($1, $2) RETURNING *",
        [product_id, store_quantity]
      );

      res.json({
        status: "ok",
        message: "new product added to store",
        product: addNewProduct.rows[0],
      });
    }
  } catch (error) {
    res.json({ status: "error", message: "unable to add product to store" });
  }
};

// PATCH amend an existing product
export const amendOneProductInStore = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.params.productID.toUpperCase();
    const store_quantity: number = req.body.storeQuantity;
    const amendProduct = await pool.query(
      "UPDATE store SET store_quantity = ($1) WHERE product_id = ($2)",
      [store_quantity, product_id]
    );

    res.json({
      status: "ok",
      message: "product quantity updated",
      product: amendProduct.rows[0],
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
