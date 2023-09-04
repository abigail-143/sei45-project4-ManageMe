import { Request, Response } from "express";

export const sayHi = async (req: Request, res: Response) => {
  try {
    res.json({ message: "hi" });
  } catch (error) {
    res.json({status: "error", message: "sayHi error"})
  }
};

export const sayBye = async (req: Request, res: Response) => {
  try {
    res.json({ message: "bye" });
  } catch (error) {
    res.json({status: "error", message: "sayBye error"})
  }
};

