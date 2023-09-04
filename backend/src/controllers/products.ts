import { Request, Response } from "express";
import { pool } from "../db/database";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await pool.query("SELECT * FROM product_inventory");

    res.json(products.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const addOneProduct = async (req: Request, res: Response) => {
  try {
    const product_id: string = req.body.productID;
    const product_description: string = req.body.productDescription;
    const unit_of_measurement: string = req.body.unitOfMeasurement;
    const in_use: boolean = req.body.inUse;
    const supplier: string = req.body.supplier;
    const supplier_leadtime: number = req.body.supplierLeadtime;
    const piece_per_uom: number = req.body.piecePerUOM;
    const cost_per_uom: number = req.body.costPerUOM;

    const newProduct = await pool.query(
      "INSERT INTO product_inventory (product_id, product_description, unit_of_measurement, in_use, supplier, supplier_leadtime, piece_per_uom, cost_per_uom) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
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

    res.json({ status: "ok", message: "product added to inventory" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
