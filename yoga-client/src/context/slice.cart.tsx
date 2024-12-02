import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItemCart } from "./type_stores";

const initialState: { data: ProductItemCart[] } = {
  data: [],
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCartStore: (state, action: PayloadAction<ProductItemCart>) => {
      if (state.data.length > 0) {
        const list = state.data;
        let checkExist = false;
        list.forEach((item) => {
          const itemToAdd = JSON.stringify(action.payload.variants);
          const itemToCompare = JSON.stringify(item.variants);
          if (itemToAdd == itemToCompare) {
            item.quantity = action.payload.quantity + item.quantity;
            state.data = [...list];
            checkExist = true;
          }
        });
        if (!checkExist) {
          state.data = [...state.data, action.payload];
        }
      } else {
        state.data = [...state.data, action.payload];
      }
    },
    removeItemCartStore: (state, action: PayloadAction<string[]>) => {
      const list = state.data;
      const newList = list.filter((item) => {
        const itemToAdd = JSON.stringify(action.payload);
        const itemToCompare = JSON.stringify(item.variants);
        return itemToAdd != itemToCompare;
      });
      state.data = newList;
    },
    updateQuantityCartStore: (
      state,
      action: PayloadAction<{ variants: string[]; quantity: number }>
    ) => {
      const list = state.data;
      list.forEach((item) => {
        const itemToAdd = JSON.stringify(action.payload.variants);
        const itemToCompare = JSON.stringify(item.variants);
        if (itemToAdd == itemToCompare) {
          item.quantity = action.payload.quantity;
          state.data = [...list];
        }
      });
      state.data = list;
    },
    clearCart: (state) => {
      state.data = [];
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCartStore,
  removeItemCartStore,
  updateQuantityCartStore,
  clearCart,
} = cartSlice.actions;
