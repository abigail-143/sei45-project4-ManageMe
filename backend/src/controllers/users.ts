import { Request, Response } from "express";
import { pool } from "../db/database";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await pool.query("SELECT * FROM user_list");
    res.json(users.rows);
  } catch (error) {
    res.json({status: "error", message: error})
  }
};
