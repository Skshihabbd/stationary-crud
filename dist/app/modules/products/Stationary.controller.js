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
exports.StationaryController = void 0;
const Stationary_service_1 = require("./Stationary.service");
const createProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stationary } = req.body;
        const result = yield Stationary_service_1.stationaryServices.makeStationaryProduct(stationary);
        res.status(200).json({
            success: true,
            message: "student created successfully",
            data: result,
        });
    }
    catch (err) {
        console.log(err.errors);
        res.status(500).json({
            success: false,
            message: err.message || "something went wrong",
            error: err.name || "Error",
            errors: err.errors,
            stack: err.stack,
        });
    }
});
//find or get all stationary product by searcing query name
const findAllStationaryProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (!searchTerm) {
            return res.status(404).json({ error: "query not found" });
        }
        const result = yield Stationary_service_1.stationaryServices.findStationaryProduct(searchTerm);
        if (result.length === 0) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({
            status: true,
            message: "Products retrieved successfully",
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
//find single product by specefic id
const findSingleProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield Stationary_service_1.stationaryServices.findSingleProductService(productId);
        res.status(200).json({
            message: "Product retrieved successfully",
            status: true,
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
const updatedProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const { updateData } = req.body;
        const { quantity, price } = updateData;
        if (quantity < 1 || price < 1) {
            throw new Error("quantity or price must be greater than zero");
        }
        const result = yield Stationary_service_1.stationaryServices.updateStationaryProduct(updateData, productId);
        res.status(200).json({
            status: true,
            message: "Product updated successfully",
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
//delete stationary product
const deleteStationaryProductController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield Stationary_service_1.stationaryServices.deleteStationaryProductService(productId);
        res.status(200).json({
            message: "Product deleted successfully",
            status: true,
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
exports.StationaryController = {
    createProductController,
    updatedProductController,
    findAllStationaryProduct,
    findSingleProductById,
    deleteStationaryProductController,
};
