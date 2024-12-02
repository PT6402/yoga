import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProductsItem,
  ProductItem,
  ProductUser,
  FilterProduct,
} from "./type_stores";

const initialState: ProductItem & {
  products: ProductUser[];
  products_admin: ProductsItem[];
  isFilter: boolean;
  filterProduct: FilterProduct;
  currentPage: number;
  totalPage: number;
  newArrival: ProductUser[];
} = {
  product: null,
  product_image: [],
  product_variant: [],
  products_admin: [],
  // --------
  newArrival: [],
  products: [],
  isFilter: false,
  filterProduct: {
    category: undefined,
    brand: undefined,
    price: undefined,
  },
  currentPage: 1,
  totalPage: 0,
};
const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setProductDetail: (state, action: PayloadAction<ProductItem>) => {
      state.product = action.payload.product;
      state.product_image = action.payload.product_image;
      state.product_variant = action.payload.product_variant;
    },
    setProductsStore: (
      state,
      action: PayloadAction<{ product: ProductUser[]; totalPage: number }>
    ) => {
      state.products = action.payload.product;
      state.totalPage = action.payload.totalPage;
    },
    setProductsAdminStore: (state, action: PayloadAction<ProductsItem[]>) => {
      state.products_admin = action.payload;
    },
    setFilterStore: (
      state,
      action: PayloadAction<FilterProduct | undefined>
    ) => {
      if (action.payload) {
        state.filterProduct = action.payload;
        state.isFilter = true;
        state.currentPage = 1;
      } else {
        state.isFilter = false;
        state.currentPage = 1;
        state.filterProduct = {
          category: undefined,
          brand: undefined,
          price: undefined,
        };
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },

    setNewArrivalStore: (state, action: PayloadAction<ProductUser[]>) => {
      state.newArrival = action.payload;
    },
  },
});
export const {
  setProductDetail,
  setProductsStore,
  setProductsAdminStore,
  setFilterStore,
  setCurrentPage,
  setNewArrivalStore,
} = productSlice.actions;
export default productSlice.reducer;
