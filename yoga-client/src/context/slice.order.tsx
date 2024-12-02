import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderAdminList, OrderUser } from "./type_stores";

const initialState: { data: OrderUser[]; dataAdmin: OrderAdminList[] } = {
  data: [],
  dataAdmin: [],
};
const orderState = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrderUser: (state, action: PayloadAction<OrderUser>) => {
      state.data = [action.payload];
    },
    setOrderAdmin: (state, action: PayloadAction<OrderAdminList[]>) => {
      state.dataAdmin = action.payload;
    },
  },
});
export default orderState.reducer;
export const { setOrderUser, setOrderAdmin } = orderState.actions;
