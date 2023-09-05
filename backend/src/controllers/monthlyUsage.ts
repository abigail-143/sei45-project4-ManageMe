import { Request, Response } from "express";
import { pool } from "../db/database";

export const getAllData = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
