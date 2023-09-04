import { Request, Response } from "express";
import { pool } from "../db/database";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await pool.query("SELECT * FROM user_list");
    res.json(users.rows);
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const email: string = req.body.email;
    const user_password: string = req.body.password;
    const company: string = req.body.company;
    const user_status: boolean = req.body.status;
    const account_type: string = req.body.account;
    const newUser = await pool.query(
      "INSERT INTO user_list (username, email, user_password, company, user_status, account_type) VALUES ($1, $2, $3, $4, $5, $6)",
      [username, email, user_password, company, user_status, account_type]
    );

    res.json({ status: "ok", message: "user added" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const username: string = req.params.username;
    const status: boolean = false;
    const deactivate = await pool.query(
      "UPDATE user_list SET user_status = ($1) WHERE username = ($2)",
      [status, username]
    );

    res.json({ status: "ok", message: "user deactivated" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
