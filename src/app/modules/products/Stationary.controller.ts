import { Request, Response } from "express";
import { stationaryServices } from "./Stationary.service";
import { StationaryModel } from "./stationary.model";
import { ParsedQs } from "qs";
const createProductController = async (req: Request, res: Response) => {
  try {
    const { stationary } = req.body;
    const result = await stationaryServices.makeStationaryProduct(stationary);
    res.status(200).json({
      success: true,
      message: "student created successfully",
      data: result,
    });
  } catch (err: any) {
    console.log(err.errors);
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err.name || "Error",
      errors: err.errors,

      stack: err.stack,
    });
  }
};
//find or get all stationary product by searcing query name
const findAllStationaryProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { searchTerm } = req.query;
    if (!searchTerm) {
      return res.status(404).json({ error: "query not found" });
    }

    const result = await stationaryServices.findStationaryProduct(
      searchTerm as string
    );
    if (result.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({
      status: true,
      message: "Products retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err.name || "Error",
      errors: err.errors,

      stack: err.stack,
    });
  }
};

//find single product by specefic id
const findSingleProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await stationaryServices.findSingleProductService(productId);
    res.status(200).json({
      message: "Product retrieved successfully",
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err.name || "Error",
      errors: err.errors,

      stack: err.stack,
    });
  }
};

const updatedProductController = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const { updateData } = req.body;

    const { quantity, price } = updateData;
    if (quantity < 1 || price < 1) {
      throw new Error("quantity or price must be greater than zero");
    }

    const result = await stationaryServices.updateStationaryProduct(
      updateData,
      productId
    );

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err.name || "Error",
      errors: err.errors,

      stack: err.stack,
    });
  }
};
//delete stationary product
const deleteStationaryProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const { productId } = req.params;
    const result = await stationaryServices.deleteStationaryProductService(
      productId
    );
    res.status(200).json({
      message: "Product deleted successfully",
      status: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err.name || "Error",
      errors: err.errors,

      stack: err.stack,
    });
  }
};
export const StationaryController = {
  createProductController,
  updatedProductController,
  findAllStationaryProduct,
  findSingleProductById,
  deleteStationaryProductController,
};
