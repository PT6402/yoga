import { Product as IProduct } from "../data_app/products";
export interface UIApp {
  openSidenav: boolean;
  fixedNavbar: boolean;
  infoApp: InfoApp | null;
}

export interface User {
  isSigned?: boolean;
  accessToken?: string | null;
}

export interface Category {
  id?: number;
  name?: string;
  status?: boolean;
  referenceProduct?: number | null;
  image?: string;
}
export interface VariantItem {
  id?: number;
  value?: string | null;
  referenceProduct?: number;
}
export interface Variant {
  id?: number;
  name?: string | null;
  values?: VariantItem[];
  referenceProduct: number | null;
}

export interface ProductsItem {
  id: number;
  name: string;
  price: string;
  brand: string;
  status: boolean;
  image: string;
}
export interface ProductImage {
  id: number;
  src: string;
}
export interface ProductVariantItem {
  id: number;
  price_modifier: number;
  value: string;
}
export interface ProductVariant {
  id: number;
  name: string;
  variants: ProductVariantItem[];
}
export interface Product {
  id: number;
  name: string;
  price_base: string;
  brand: string;
  category: Category;
  description?: string;
  newArrival?: boolean;
}
export interface ProductUser {
  id: number;
  name: string;
  price: number;
  brand: string;
  categoryId: number;
  image: string;
}
export interface ProductItem {
  //
  product: Product | null;
  product_image: ProductImage[];
  product_variant: ProductVariant[];
}

export interface ProductItemCart {
  product: IProduct;
  variants: string[];
  price: number;
  quantity: number;
}

export interface FilterProduct {
  category: Category | undefined;
  brand: string | undefined;
  price: number[] | undefined;
}

export interface InforUser {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}
export interface OrderUser {
  info: InforUser;
  cart: ProductItemCart[];
}
export interface ProductItemCartAdmin {
  name: string;
  image: string;
  quantity: number;
  price: number;
  id: number;
  variants: string[];
  errors: string[];
  productId: number;
}
export interface InfoUserByAdmin extends InforUser {
  id: number;
  totalPrice: number;
  createAt: string;
}

export interface OrderAdmin {
  info: InfoUserByAdmin;
  item: ProductItemCartAdmin[];
}

export interface OrderAdminList {
  id: number;
  phone: string;
  fullname: string;
  totalPrice: number;
  time: number;
  readStatus: boolean;
  confirmStatus: boolean;
}

export interface InfoApp {
  phone: string;
  email: string;
  address: string;
  linkFanPage: string[];
  logoApp: string;
  sloganApp: string;
  bankStk: string;
  bankName: string;
  bankOwnerName: string;
  bankQRCode: string;
}
