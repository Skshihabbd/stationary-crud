import { Request, Response } from "express";
import { stationaryOrder } from "./order.service";
import { TstationaryProdcuts } from "../products/stationary.interface";
import { StationaryModel } from "../products/stationary.model";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const { product, quantity, email, totalPrice } = order;

    const findProduct: TstationaryProdcuts | null =
      await StationaryModel.findOne({
        _id: product,
      });
    if (!findProduct) {
      throw new Error("Product not found id not matching ");
    }

    const isStock = findProduct.inStock;

    if (isStock === false) {
      throw new Error("this product is out of stock");
    }

    const Quantity: number = findProduct.quantity;
    const updatedQuantity = Quantity - quantity;
    if (Quantity < quantity) {
      throw new Error("quantity must be lessthan or equal to product stock");
    }

    if (updatedQuantity === 0) {
      const stationaryUpdateData = await StationaryModel.updateOne(
        { _id: product },
        {
          $set: {
            updatedAt: new Date().toISOString().replace("Z", "+00:00"),
            quantity: updatedQuantity,
            inStock: false,
          },
        }
      );
    }

    const result = await stationaryOrder.makeStationaryOrder(order);
    const stationaryUpdateData = await StationaryModel.updateOne(
      { _id: product },
      {
        $set: {
          updatedAt: new Date().toISOString().replace("Z", "+00:00"),
          quantity: updatedQuantity,
        },
      }
    );
    res.status(200).json({
      success: true,
      message: "Order created successfully",
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

const calculateOrderTotalValue = async (req: Request, res: Response) => {
  try {
    const result = await stationaryOrder.getAllOrderTotalValue();
    res.status(200).json({
      status: true,
      message: "Revenue calculated successfully",
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

export const orderController = {
  createOrder,
  calculateOrderTotalValue,
};
