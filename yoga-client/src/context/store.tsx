import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slice.ui";
import userSlice from "./slice.user";
import categorySlice from "./slice.category";
import variantSlice from "./slice.variant";
import productSlice from "./slice.product";
import cartSlice from "./slice.cart";
import orderSlice from "./slice.order";
export const store = configureStore({
  reducer: {
    uiApp: uiSlice,
    user: userSlice,
    category: categorySlice,
    variant: variantSlice,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
