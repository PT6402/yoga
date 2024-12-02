import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "./type_stores";

const initialState: {
  data_admin: Category[];
  data: Category[];
  brands: string[];
  price: number[];
} = {
  data: [],
  data_admin: [],
  brands: [],
  price: [],
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryStore: (
      state,
      action: PayloadAction<{
        categorys: Category[];
        brands: string[];
        price: number[];
      }>
    ) => {
      state.data = action.payload.categorys;
      state.brands = action.payload.brands;
      state.price = action.payload.price;
    },
    setCategoryAdminStore: (state, action: PayloadAction<Category[]>) => {
      state.data_admin = action.payload;
    },
  },
});

export const { setCategoryStore, setCategoryAdminStore } =
  categorySlice.actions;
export default categorySlice.reducer;
