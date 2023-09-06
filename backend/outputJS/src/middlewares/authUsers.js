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
        res.json({ status: "error", message: "no token found" });
    }
    const token = req.headers["authorization"].replace("Bearer ", "");
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_SECRET));
            req.decoded = decoded;
            console.log(decoded);
            next();
        }
        catch (error) {
            res.json({ status: "error", message: "unauthorised" });
        }
    }
};
exports.auth = auth;
const authManager = (req, res, next) => {
    if (!("authorization" in req.headers)) {
        res.json({ status: "error", message: "no token found" });
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
            res.json({ status: "error", message: "unauthorised for Staff" });
        }
    }
    else {
        res.json({ status: "error", message: "no token found" });
    }
};
exports.authManager = authManager;
