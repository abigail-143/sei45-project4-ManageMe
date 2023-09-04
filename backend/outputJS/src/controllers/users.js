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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivateUser = exports.addUser = exports.getAllUsers = void 0;
const database_1 = require("../db/database");
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
        const user_password = req.body.password;
        const company = req.body.company;
        const user_status = req.body.status;
        const account_type = req.body.account;
        const newUser = yield database_1.pool.query("INSERT INTO user_list (username, email, user_password, company, user_status, account_type) VALUES ($1, $2, $3, $4, $5, $6)", [username, email, user_password, company, user_status, account_type]);
        res.json({ status: "ok", message: "user added" });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.addUser = addUser;
const deactivateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const status = false;
        const deactivate = yield database_1.pool.query("UPDATE user_list SET user_status = ($1) WHERE username = ($2)", [status, username]);
        res.json({ status: "ok", message: "user deactivated" });
    }
    catch (error) {
        res.json({ status: "error", message: error });
    }
});
exports.deactivateUser = deactivateUser;
