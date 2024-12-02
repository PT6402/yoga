import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./type_stores";

const initialState: User = {
  isSigned: false,
  accessToken: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStore: (state, action: PayloadAction<User>) => {
      state.isSigned = action.payload.isSigned;
      state.accessToken = action.payload.accessToken;
    },
    logoutStore: (state) => {
      state.accessToken = null;
      state.isSigned = false;
    },

    setAccessTokenStore: (state, action: PayloadAction<string>) => {
      state.isSigned = true;
      state.accessToken = action.payload;
    },
  },
});

export const { loginStore, logoutStore, setAccessTokenStore } =
  userSlice.actions;
export default userSlice.reducer;
