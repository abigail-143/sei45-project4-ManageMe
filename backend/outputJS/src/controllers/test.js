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
exports.sayBye = exports.sayHi = void 0;
const sayHi = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "hi" });
    }
    catch (error) {
        res.json({ status: "error", message: "sayHi error" });
    }
});
exports.sayHi = sayHi;
const sayBye = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ message: "bye" });
    }
    catch (error) {
        res.json({ status: "error", message: "sayBye error" });
    }
});
exports.sayBye = sayBye;
