"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "email must be given to place a order"],
        validate: {
            validator: (value) => {
                return validator_1.default.isEmail(value);
            },
            message: `email must be a email type`,
        },
    },
    product: { type: String, required: [true, "product id must be required"] },
    quantity: {
        type: mongoose_1.Schema.Types.Mixed,
        required: [true, "quantity must be required"],
        validate: [
            {
                validator: (value) => {
                    return typeof value === "number";
                },
                message: "quantity must be a number",
            },
            {
                validator: (value) => Number.isInteger(value),
                message: "Quantity must be an integer",
            },
            {
                validator: (value) => {
                    return value !== 0;
                },
                message: "quantity must be greater than zero 0",
            },
        ],
    },
    totalPrice: {
        type: mongoose_1.Schema.Types.Mixed,
        required: [true, "quantity must be required"],
        validate: [
            {
                validator: (value) => {
                    return typeof value === "number";
                },
                message: "total  must be a number",
            },
        ],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { versionKey: false });
exports.orderModel = (0, mongoose_1.model)("Order", OrderSchema);
