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
exports.stationaryServices = void 0;
const stationary_model_1 = require("./stationary.model");
const makeStationaryProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stationary_model_1.StationaryModel.create(product);
    return result;
});
const findStationaryProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(query);
    const categories = [
        "Technology",
        "Art Supplies",
        "Writing",
        "Educational",
        "Office Supplies",
    ];
    const brands = ["Faber-Castell", "Moleskine", "Pilot"];
    const name = ["Pen", "Notebook", "Eraser"];
    if (categories.includes(query.trim())) {
        const result = yield stationary_model_1.StationaryModel.find({ category: query });
        return result;
    }
    else if (brands.includes(query.trim())) {
        const result = yield stationary_model_1.StationaryModel.find({ brand: query });
        return result;
    }
    else if (name.includes(query.trim())) {
        const result = yield stationary_model_1.StationaryModel.find({
            name: query,
        });
        return result;
    }
    else {
        return [];
    }
});
//find single product by id
const findSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stationary_model_1.StationaryModel.findOne({ _id: id });
    return result;
});
const updateStationaryProduct = (updatedData, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stationary_model_1.StationaryModel.updateOne({ _id: id }, {
        $set: {
            price: updatedData.price,
            quantity: updatedData.quantity,
            inStock: true,
            updatedAt: new Date().toISOString().replace("Z", "+00:00"),
        },
    });
    const finalUpdatedData = yield stationary_model_1.StationaryModel.findOne({ _id: id });
    return finalUpdatedData;
});
//delete a stationary product
const deleteStationaryProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stationary_model_1.StationaryModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
        throw new Error("product not found for deleted");
    }
    else {
        return result;
    }
});
exports.stationaryServices = {
    makeStationaryProduct,
    updateStationaryProduct,
    findStationaryProduct,
    findSingleProductService,
    deleteStationaryProductService,
};
