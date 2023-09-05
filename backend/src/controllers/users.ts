import { Request, Response } from "express";
import { pool } from "../db/database";

// GET all users registered to database
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

    // check for email duplicate
    const firstCheckEmail = await pool.query(
      "SELECT * FROM user_list WHERE email = ($1)",
      [email]
    );
    // check for username duplicate
    const secondCheckUsername = await pool.query(
      "SELECT * FROM user_list WHERE username = ($1)",
      [username]
    );

    if (firstCheckEmail.rows.length != 0) {
      res.json({ status: "error", message: "email already exists" });
    } else if (secondCheckUsername.rows.length != 0) {
      res.json({ status: "error", message: "username already exists" });
    } else {
      // create user if there's no email or username duplicate
      const newUser = await pool.query(
        "INSERT INTO user_list (username, email, user_password, company, user_status, account_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [username, email, user_password, company, user_status, account_type]
      );

      res.json({ status: "ok", message: "user added", user: newUser.rows[0] });
    }
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

// PATCH update user_status (true/false)
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
