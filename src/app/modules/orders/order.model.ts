import { model, Schema } from "mongoose";
import { TstationaryOrder } from "./order.interface";
import validator from "validator";
const OrderSchema = new Schema<TstationaryOrder>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "email must be given to place a order"],

      validate: {
        validator: (value: string) => {
          return validator.isEmail(value);
        },
        message: `email must be a email type`,
      },
    },
    product: { type: String, required: [true, "product id must be required"] },
    quantity: {
      type: Schema.Types.Mixed,
      required: [true, "quantity must be required"],
      validate: [
        {
          validator: (value: any) => {
            return typeof value === "number";
          },

          message: "quantity must be a number",
        },
        {
          validator: (value: any) => Number.isInteger(value),
          message: "Quantity must be an integer",
        },
        {
          validator: (value: any) => {
            return value !== 0;
          },
          message: "quantity must be greater than zero 0",
        },
      ],
    },
    totalPrice: {
      type: Schema.Types.Mixed,
      required: [true, "quantity must be required"],
      validate: [
        {
          validator: (value: any) => {
            return typeof value === "number";
          },

          message: "total  must be a number",
        },
      ],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const orderModel = model<TstationaryOrder>("Order", OrderSchema);
