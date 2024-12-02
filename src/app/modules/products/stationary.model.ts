import mongoose, { model, Schema } from "mongoose";
import { TstationaryProdcuts } from "./stationary.interface";

const stationarySchema = new Schema<TstationaryProdcuts>(
  {
    name: {
      type: String,
      required: [true, "name is required"],

      enum: {
        values: ["Pen", "Notebook", "Eraser"],
        message:
          "{VALUE} is not supported .value would be Pen | Notebook | Eraser ",
      },
    },
    brand: {
      type: String,
      enum: {
        values: ["Pilot", "Moleskine", "Faber-Castell"],
        message: "{VALUE} is not supported",
      },
      required: [true, "brand is required and must be given "],
    },
    price: {
      type: Schema.Types.Mixed,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
      validate: {
        validator: function (value: any) {
          return typeof value === "number";
        },

        message: "price must be a number",
      },
    },
    category: {
      type: String,
      enum: {
        values: [
          "Writing",
          "Office Supplies",
          "Art Supplies",
          "Educational",
          "Technology",
        ],
        message:
          "{VALUE} is not supported .value is type of  Writing | Office Supplies |Art Supplies |Educational|Technology",
      },
      required: [true, "category is required"],
    },
    description: { type: String, required: [true, "Description is required"] },
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
            return value >= 0;
          },
          message: "quantity must be a positive number",
        },
      ],
    },
    inStock: {
      type: Schema.Types.Mixed,
      required: [true, "inStock field is must be required"],
      validate: [
        {
          validator: (value: any) => {
            if (typeof value !== "boolean") {
              throw new Error("value must be true or false");
            }
            //return typeof value === "boolean";
            return true;
          },
          message:
            "prodcut stock value must be a boolean value 'true' |'false' ",
        },
      ],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const StationaryModel = model<TstationaryProdcuts>(
  "Product",
  stationarySchema
);
