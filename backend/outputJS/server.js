"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
const limit = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
// routers
const test_1 = __importDefault(require("./src/routers/test"));
const users_1 = __importDefault(require("./src/routers/users"));
const products_1 = __importDefault(require("./src/routers/products"));
const warehouse_1 = __importDefault(require("./src/routers/warehouse"));
const store_1 = __importDefault(require("./src/routers/store"));
const purchaseOrder_1 = __importDefault(require("./src/routers/purchaseOrder"));
const deliveryOrders_1 = __importDefault(require("./src/routers/deliveryOrders"));
const deliveryOrderList_1 = __importDefault(require("./src/routers/deliveryOrderList"));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(limit);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// routers
app.use("/test", test_1.default);
app.use("/user", users_1.default);
app.use("/products", products_1.default);
app.use("/warehouse", warehouse_1.default);
app.use("/store", store_1.default);
app.use("/po", purchaseOrder_1.default);
app.use("/do", deliveryOrders_1.default);
app.use("/list", deliveryOrderList_1.default);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
