import { Request, Response } from "express";
import { pool } from "../db/database";

// GET all products in inventory list
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await pool.query("SELECT * FROM product_inventory");

    res.json(products.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// POST get 1 product from inventory list
export const getOneProduct = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.params.productID.toUpperCase();

    const oneProduct = await pool.query(
      "SELECT inventory_id, product_id, product_description, unit_of_measurement, supplier, supplier_leadtime FROM product_inventory WHERE product_id = ($1)",
      [product_id]
    );

    if (oneProduct.rows.length != 0) {
      res.json(oneProduct.rows);
    } else {
      res.json({ status: "error", message: "no such product" });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// PUT one product into inventory list
export const addOneProduct = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.body.productID.toUpperCase();
    const product_description: string = req.body.productDescription;
    const unit_of_measurement: string = req.body.unitOfMeasurement;
    const in_use: boolean = req.body.inUse;
    const supplier: string = req.body.supplier;
    const supplier_leadtime: number = Number(req.body.supplierLeadtime);
    const piece_per_uom: number = Number(req.body.piecePerUOM);
    const cost_per_uom: number = Number(req.body.costPerUOM);

    // check for duplicate product_id name
    const firstCheck = await pool.query(
      "SELECT * FROM product_inventory WHERE product_id = ($1)",
      [product_id]
    );

    if (firstCheck.rows.length != 0) {
      res.json({ status: "error", message: "product id already taken" });
    } else {
      // add new product
      const newProduct = await pool.query(
        "INSERT INTO product_inventory (product_id, product_description, unit_of_measurement, in_use, supplier, supplier_leadtime, piece_per_uom, cost_per_uom) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          product_id,
          product_description,
          unit_of_measurement,
          in_use,
          supplier,
          supplier_leadtime,
          piece_per_uom,
          cost_per_uom,
        ]
      );

      res.json({
        status: "ok",
        message: "product added to inventory",
        product: newProduct.rows[0],
      });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// PATCH update an existing product
export const updateIfProductInUse = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.params.productID.toUpperCase();
    const in_use: boolean = req.body.inUse;

    const updateProduct = await pool.query(
      "UPDATE product_inventory SET in_use = ($1) WHERE product_id = ($2) RETURNING inventory_id, product_id, in_use",
      [in_use, product_id]
    );

    res.json({
      status: "ok",
      message: "product updated in warehouse",
      product: updateProduct.rows[0],
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
