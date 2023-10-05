declare module 'bcrypt';
declare module 'jsonwebtoken';
declare module 'uuid';

import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
      interface Request {
        decoded: string | JwtPayload;
      }
    }
  }