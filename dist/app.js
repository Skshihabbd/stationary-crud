"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const Stationary_route_1 = require("./app/modules/products/Stationary.route");
const order_route_1 = require("./app/modules/orders/order.route");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", Stationary_route_1.stationaryRouter);
app.use("/api", order_route_1.orderRouter);
const getBaseController = (req, res) => {
    res.send("Hellow world");
};
app.get("/", getBaseController);
exports.default = app;
