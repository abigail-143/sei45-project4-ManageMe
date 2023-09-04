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

app.use(cors());
app.use(helmet());
app.use(limit);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello world!!!!!");
});

app.get("/bye", (req: Request, res: Response) => {
  res.send("byebye world");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
