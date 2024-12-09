"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stationaryRouter = void 0;
const express_1 = __importDefault(require("express"));
const Stationary_controller_1 = require("./Stationary.controller");
const router = express_1.default.Router();
//this is product post route
router.post("/products", Stationary_controller_1.StationaryController.createProductController);
router.put("/products/:productId", Stationary_controller_1.StationaryController.updatedProductController);
router.get("/products", Stationary_controller_1.StationaryController.findAllStationaryProduct);
router.get("/products/:productId", Stationary_controller_1.StationaryController.findSingleProductById);
router.delete("/products/:productId", Stationary_controller_1.StationaryController.deleteStationaryProductController);
exports.stationaryRouter = router;
