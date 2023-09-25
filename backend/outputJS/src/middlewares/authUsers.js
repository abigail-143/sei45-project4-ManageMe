"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authManager = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// general authentication to site (can be staff/manager)
const auth = (req, res, next) => {
    if (!("authorization" in req.headers)) {
        return res.status(400).json({ status: "error", message: "no token found" });
    }
    const token = req.headers["authorization"].replace("Bearer ", "");
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_SECRET));
            req.decoded = decoded;
            next();
        }
        catch (error) {
            return res.status(401).json({ status: "error", message: "unauthorised" });
        }
    }
    else {
        return res
            .status(402)
            .json({ status: "error", message: "forbidden error" });
    }
};
exports.auth = auth;
// authentication to site/endpoint only if user is a Manager
const authManager = (req, res, next) => {
    if (!("authorization" in req.headers)) {
        return res.status(400).json({ status: "error", message: "no token found" });
    }
    const token = req.headers["authorization"].replace("Bearer ", "");
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_SECRET));
            if (decoded.account_type == "Manager") {
                req.decoded = decoded;
                next();
            }
            else {
                throw new Error();
            }
        }
        catch (error) {
            return res.status(401).json({ status: "error", message: "unauthorised for Staff" });
        }
    }
    else {
        return res.status(402).json({ status: "error", message: "no token found" });
    }
};
exports.authManager = authManager;
