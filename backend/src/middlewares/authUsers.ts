import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

type JwtPayload = typeof JwtPayload;

declare global {
  namespace Express {
    interface Request {
      decoded: string | JwtPayload;
    }
  }
}

// general authentication to site (can be staff/manager)
export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", message: "no token found" });
  }

  const token = (req.headers["authorization"] as any).replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, String(process.env.ACCESS_SECRET));

      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ status: "error", message: "unauthorised" });
    }
  } else {
    return res
      .status(402)
      .json({ status: "error", message: "forbidden error" });
  }
};

// authentication to site/endpoint only if user is a Manager
export const authManager = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!("authorization" in req.headers)) {
    return res.status(400).json({ status: "error", message: "no token found" });
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
      return res
        .status(401)
        .json({ status: "error", message: "unauthorised for Staff" });
    }
  } else {
    return res.status(402).json({ status: "error", message: "no token found" });
  }
};
