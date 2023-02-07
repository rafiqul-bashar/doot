// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "../reducers/authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.success = true; // registration successful
      }),
      builder.addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
    builder.addCase(userLogin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(userLogin.fulfilled, (state, { payload }) => {
        console.log(payload);

        state.loading = false;
        state.userInfo = payload.user;
        state.userToken = payload.token;
      }),
      builder.addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export default authSlice.reducer;
