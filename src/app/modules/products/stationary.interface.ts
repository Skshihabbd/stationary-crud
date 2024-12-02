export type TstationaryProdcuts = {
  name: string;
  brand: string;
  price: number;
  category:
    | "Writing"
    | "Office Supplies"
    | "Art Supplies"
    | "Educational|"
    | "Technology";
  description: string;
  quantity: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TUpdateData = {
  price: number;
  quantity: number;
};
