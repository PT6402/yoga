import {
  Category,
  Variant,
  VariantItem,
} from "../../../../../context/type_stores";

export interface DataInfo {
  name: string;
  price: number;
  category: Category;
  brand: string;
}
export interface VariantItemProduct {
  variantItem: VariantItem;
  priceModifier: number;
}
export interface DataVariant {
  variantType: Variant;
  variantItems: VariantItemProduct[];
}
export interface DataImage {
  nameImage: string;
  file: File;
  urlImage: string;
}
export interface FormCreateState {
  currentStep: number;
  dataInfo: DataInfo | null;
  dataVariant: DataVariant[];
  dataImage: DataImage[];
  dataDescription: string;
}
