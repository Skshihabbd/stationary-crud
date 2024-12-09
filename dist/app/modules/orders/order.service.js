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
exports.stationaryOrder = void 0;
const order_model_1 = require("./order.model");
const makeStationaryOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity, email, totalPrice } = order;
    console.log(product);
    const newSendData = {
        email: email,
        product: product,
        quantity: quantity,
        totalPrice: totalPrice,
    };
    const orderSaved = yield order_model_1.orderModel.create(newSendData);
    return orderSaved;
});
const getAllOrderTotalValue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.orderModel.aggregate([
        //stage-1
        { $group: { _id: "$totalPrice", totalRevenue: { $sum: "$totalPrice" } } },
        //stage-2
        { $project: { totalRevenue: 1, _id: 0 } },
    ]);
    console.log(result);
    return result[0];
});
exports.stationaryOrder = {
    makeStationaryOrder,
    getAllOrderTotalValue,
};
