import express, { Application, Request, Response } from "express";
const app: Application = express();

import cors from "cors";
import { stationaryRouter } from "./app/modules/products/Stationary.route";
import { orderRouter } from "./app/modules/orders/order.route";
app.use(cors());
app.use(express.json());
app.use("/api", stationaryRouter);
app.use("/api", orderRouter);
const getBaseController = (req: Request, res: Response) => {
  res.send("Hellow world");
};
app.get("/", getBaseController);
export default app;
