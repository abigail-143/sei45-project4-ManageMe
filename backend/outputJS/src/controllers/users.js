"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deactivateUser = exports.addUser = exports.getAllUsers = void 0;
const database_1 = require("../db/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
// GET all users registered to database
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield database_1.pool.query("SELECT * FROM user_list");
        res.json(users.rows);
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.getAllUsers = getAllUsers;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const company = req.body.company;
        const user_status = req.body.status;
        const account_type = req.body.account || "Staff";
        // check for email duplicate
        const firstCheckEmail = yield database_1.pool.query("SELECT * FROM user_list WHERE email = ($1)", [email]);
        // check for username duplicate
        const secondCheckUsername = yield database_1.pool.query("SELECT * FROM user_list WHERE username = ($1)", [username]);
        if (firstCheckEmail.rows.length != 0) {
            res.json({ status: "error", message: "email already exists" });
        }
        else if (secondCheckUsername.rows.length != 0) {
            res.json({ status: "error", message: "username already exists" });
        }
        else {
            // create user if there's no email or username duplicate
            // create hash password
            const hash = yield bcrypt_1.default.hash(req.body.password, 12);
            const newUser = yield database_1.pool.query("INSERT INTO user_list (username, email, user_password, company, user_status, account_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [username, email, hash, company, user_status, account_type]);
            res.json({ status: "ok", message: "user added", user: newUser.rows[0] });
        }
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.addUser = addUser;
// PATCH update user_status (true/false)
const deactivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const status = false;
        const deactivate = yield database_1.pool.query("UPDATE user_list SET user_status = ($1) WHERE username = ($2) RETURNING *", [status, username]);
        res.json({
            status: "ok",
            message: "user deactivated",
            user: deactivate.rows[0],
        });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.deactivateUser = deactivateUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const password = req.body.password;
        // find username in user table
        const auth = yield database_1.pool.query("SELECT * FROM user_list WHERE username = ($1)", [username]);
        // if username doesn't exists
        if (auth.rows.length == 0) {
            res.json({ status: "error", message: "invalid username" });
            return;
        }
        // check if password is correct
        const comparePW = yield bcrypt_1.default.compare(password, auth.rows[0].user_password);
        if (!comparePW) {
            res.json({ status: "error", message: "incorrect password" });
            return;
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
        const access = jsonwebtoken_1.default.sign(payload, String(process.env.ACCESS_SECRET), {
            expiresIn: "60m",
            jwtid: (0, uuid_1.v4)(),
        });
        // create refresh token
        const refresh = jsonwebtoken_1.default.sign(payload, String(process.env.REFRESH_SECRET), {
            expiresIn: "30d",
            jwtid: (0, uuid_1.v4)(),
        });
        // send back payload (which contains a lot of things), access token and refresh token
        res.json({ access, refresh });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.loginUser = loginUser;
