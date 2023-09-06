import { Request, Response } from "express";
import { pool } from "../db/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

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
    const company: string = req.body.company;
    const user_status: boolean = req.body.status;
    const account_type: string = req.body.account || "Staff";

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

      // create hash password
      const hash: string = await bcrypt.hash(req.body.password, 12);

      const newUser = await pool.query(
        "INSERT INTO user_list (username, email, user_password, company, user_status, account_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [username, email, hash, company, user_status, account_type]
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
      "UPDATE user_list SET user_status = ($1) WHERE username = ($2) RETURNING *",
      [status, username]
    );

    res.json({
      status: "ok",
      message: "user deactivated",
      user: deactivate.rows[0],
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;

    // find username in user table
    const auth = await pool.query(
      "SELECT * FROM user_list WHERE username = ($1)",
      [username]
    );

    // if username doesn't exists
    if (auth.rows.length == 0) {
      res.json({ status: "error", message: "invalid username" });
    }

    // check if password is correct
    const comparePW = await bcrypt.compare(password, auth.rows[0].user_password);

    if (!comparePW) {
      res.json({ status: "error", message: "incorrect password" });
    }

    // create payload to be passed to headers
    const payload = {
      user_id: auth.rows[0].user_id,
      username: auth.rows[0].username,
      email: auth.rows[0].email,
      company: auth.rows[0].company,
      user_status: auth.rows[0].user_status,
      account_type: auth.rows[0].account_type,
    };

    // create access token
    const access = jwt.sign(payload, String(process.env.ACCESS_SECRET), {
      expiresIn: "60m",
      jwtid: uuidv4(),
    });

    // create refresh token
    const refresh = jwt.sign(payload, String(process.env.REFRESH_SECRET), {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    // send back payload (which contains a lot of things), access token and refresh token
    res.json({ access, refresh });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
