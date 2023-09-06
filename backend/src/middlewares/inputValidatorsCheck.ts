import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const inputValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    res.json({ error: errors.array() });
  }
};
