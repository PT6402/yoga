import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Variant } from "./type_stores";

const initialState: { data: Variant[] } = {
  data: [],
};
const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {
    setVariants: (state, action: PayloadAction<Variant[]>) => {
      state.data = action.payload;
    },
  },
});
export const { setVariants } = variantSlice.actions;
export default variantSlice.reducer;
