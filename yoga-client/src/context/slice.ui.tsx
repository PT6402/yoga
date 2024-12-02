import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InfoApp, UIApp } from "./type_stores";

const initialState: UIApp = {
  fixedNavbar: true,
  openSidenav: false,
  infoApp: null,
};
const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setOpenSideNav: (state, action: PayloadAction<boolean>) => {
      state.openSidenav = action.payload;
    },
    setFixedNavbar: (state, action: PayloadAction<boolean>) => {
      state.fixedNavbar = action.payload;
    },

    setInfoAppStore: (state, action: PayloadAction<InfoApp>) => {
      state.infoApp = action.payload;
    },
  },
});
export const { setFixedNavbar, setOpenSideNav, setInfoAppStore } =
  uiSlice.actions;
export default uiSlice.reducer;
