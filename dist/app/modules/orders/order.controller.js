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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const stationary_model_1 = require("../products/stationary.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order } = req.body;
        const { product, quantity, email, totalPrice } = order;
        const findProduct = yield stationary_model_1.StationaryModel.findOne({
            _id: product,
        });
        if (!findProduct) {
            throw new Error("Product not found id not matching ");
        }
        const isStock = findProduct.inStock;
        if (isStock === false) {
            throw new Error("this product is out of stock");
        }
        const Quantity = findProduct.quantity;
        const updatedQuantity = Quantity - quantity;
        if (Quantity < quantity) {
            throw new Error("quantity must be lessthan or equal to product stock");
        }
        if (updatedQuantity === 0) {
            const stationaryUpdateData = yield stationary_model_1.StationaryModel.updateOne({ _id: product }, {
                $set: {
                    updatedAt: new Date().toISOString().replace("Z", "+00:00"),
                    quantity: updatedQuantity,
                    inStock: false,
                },
            });
        }
        const result = yield order_service_1.stationaryOrder.makeStationaryOrder(order);
        const stationaryUpdateData = yield stationary_model_1.StationaryModel.updateOne({ _id: product }, {
            $set: {
                updatedAt: new Date().toISOString().replace("Z", "+00:00"),
                quantity: updatedQuantity,
            },
        });
        res.status(200).json({
            success: true,
            message: "Order created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err.name || "Error",
            errors: err.errors,
            stack: err.stack,
        });
    }
});
const calculateOrderTotalValue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.stationaryOrder.getAllOrderTotalValue();
        res.status(200).json({
            status: true,
            message: "Revenue calculated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err.name || "Error",
            errors: err.errors,
            stack: err.stack,
        });
    }
});
exports.orderController = {
    createOrder,
    calculateOrderTotalValue,
};
