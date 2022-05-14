import { createSlice } from "@reduxjs/toolkit";
import { authApiEndpoints } from "./auth.api";

export type AuthState = {
  isLoading: boolean;
  validationErrors: Record<string, string>;
  loginFailed: boolean;
};

const initialState: AuthState = {
  isLoading: false,
  validationErrors: null,
  loginFailed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApiEndpoints.login.matchPending, (state) => {
      state.isLoading = true;
      state.validationErrors = null;
      state.loginFailed = false;
    });
    builder.addMatcher(
      authApiEndpoints.login.matchFulfilled,
      (state) => {
        state.isLoading = false;
      },
    );
    builder.addMatcher(authApiEndpoints.login.matchRejected, (state, { payload }) => {
      state.isLoading = false;
      switch (payload.status) {
        case 401: {
          state.loginFailed = true;
          break;
        }
        case 422: {
          state.validationErrors = payload.data.validationErrors;
          break;
        }
      }
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
