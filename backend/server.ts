import express, { Express, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// routers
import test from "./src/routers/test";
import users from "./src/routers/users";
import productInventory from "./src/routers/products";
import warehouse from "./src/routers/warehouse";
import store from "./src/routers/store";
import purchaseOrders from "./src/routers/purchaseOrder";
import deliveryOrders from "./src/routers/deliveryOrders";
import deliveryOrderList from "./src/routers/deliveryOrderList";

app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use("/test", test);
app.use("/user", users);
app.use("/products", productInventory);
app.use("/warehouse", warehouse);
app.use("/store", store);
app.use("/po", purchaseOrders);
app.use("/do", deliveryOrders);
app.use("/list", deliveryOrderList);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
