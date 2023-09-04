import express, { Express, Request, Response } from "express";

const PORT = 8000;
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello world!!!!!");
});

app.get("/bye", (req: Request, res: Response) => {
  res.send("byebye world");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
