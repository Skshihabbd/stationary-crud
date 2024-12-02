import { TstationaryProdcuts, TUpdateData } from "./stationary.interface";
import { StationaryModel } from "./stationary.model";

const makeStationaryProduct = async (product: TstationaryProdcuts) => {
  const result = await StationaryModel.create(product);
  return result;
};
const findStationaryProduct = async (query: string) => {
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
    const result = await StationaryModel.find({ category: query });
    return result;
  } else if (brands.includes(query.trim())) {
    const result = await StationaryModel.find({ brand: query });
    return result;
  } else if (name.includes(query.trim())) {
    const result = await StationaryModel.find({
      name: query,
    });
    return result;
  } else {
    return [];
  }
};
//find single product by id
const findSingleProductService = async (id: string) => {
  const result = await StationaryModel.findOne({ _id: id });
  return result;
};
const updateStationaryProduct = async (
  updatedData: TUpdateData,
  id: string
) => {
  const result = await StationaryModel.updateOne(
    { _id: id },
    {
      $set: {
        price: updatedData.price,
        quantity: updatedData.quantity,
        inStock: true,
        updatedAt: new Date().toISOString().replace("Z", "+00:00"),
      },
    }
  );
  const finalUpdatedData = await StationaryModel.findOne({ _id: id });
  return finalUpdatedData;
};

//delete a stationary product
const deleteStationaryProductService = async (id: string) => {
  const result = await StationaryModel.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    throw new Error("product not found for deleted");
  } else {
    return result;
  }
};

export const stationaryServices = {
  makeStationaryProduct,
  updateStationaryProduct,
  findStationaryProduct,
  findSingleProductService,
  deleteStationaryProductService,
};
