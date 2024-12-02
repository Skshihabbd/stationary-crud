import express from "express";
import { StationaryController } from "./Stationary.controller";
const router = express.Router();
//this is product post route
router.post("/products", StationaryController.createProductController);
router.put(
  "/products/:productId",
  StationaryController.updatedProductController
);
router.get("/products", StationaryController.findAllStationaryProduct);
router.get("/products/:productId", StationaryController.findSingleProductById);
router.delete(
  "/products/:productId",
  StationaryController.deleteStationaryProductController
);

export const stationaryRouter = router;
