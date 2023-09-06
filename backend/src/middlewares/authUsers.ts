import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      decoded?: any;
    }
  }
}

// general authentication to site (can be staff/manager)
export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!("authorization" in req.headers)) {
    res.json({ status: "error", message: "no token found" });
  }

  const token = (req.headers["authorization"] as any).replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, String(process.env.ACCESS_SECRET));

      req.decoded = decoded;
      console.log(decoded);
      next();
    } catch (error) {
      res.json({ status: "error", message: "unauthorised" });
    }
  }
};

// authentication to site/endpoint only if user is a Manager
export const authManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!("authorization" in req.headers)) {
    res.json({ status: "error", message: "no token found" });
  }

  const token = (req.headers["authorization"] as any).replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        String(process.env.ACCESS_SECRET)
      ) as any;

      if (decoded.account_type == "Manager") {
        req.decoded = decoded;
        next();
      } else {
        throw new Error();
      }
    } catch (error) {
      res.json({ status: "error", message: "unauthorised for Staff" });
    }
  } else {
    res.json({ status: "error", message: "no token found" });
  }
};
