import { ProductModel } from "src/app/core/models/cart.model";

export interface AddOn {
  category: AddOnCategory;
  products: AddOnProduct[];
}

export interface AddOnCategory {
  name: string;
  id: string;
}

export type AddOnProduct = ProductModel
