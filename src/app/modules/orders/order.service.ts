import { TstationaryProdcuts } from "../products/stationary.interface";
import { StationaryModel } from "../products/stationary.model";
import { TstationaryOrder } from "./order.interface";
import { orderModel } from "./order.model";

const makeStationaryOrder = async (order: TstationaryOrder) => {
  const { product, quantity, email, totalPrice } = order;
  console.log(product);

  const newSendData = {
    email: email,
    product: product,
    quantity: quantity,
    totalPrice: totalPrice,
  };

  const orderSaved = await orderModel.create(newSendData);
  return orderSaved;
};

const getAllOrderTotalValue = async () => {
  const result = await orderModel.aggregate([
    //stage-1
    { $group: { _id: "$totalPrice", totalRevenue: { $sum: "$totalPrice" } } },
    //stage-2
    { $project: { totalRevenue: 1, _id: 0 } },
  ]);

  console.log(result);
  return result[0];
};

export const stationaryOrder = {
  makeStationaryOrder,
  getAllOrderTotalValue,
};
