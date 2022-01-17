import { createSlice } from "@reduxjs/toolkit";
import { authApiEndpoints } from "./auth.api";

export type AuthState = {
  isLoading: boolean;
  token: string;
  validationErrors: Record<string, string>;
  loginFailed: boolean;
};

const initialState: AuthState = {
  isLoading: false,
  token: null,
  validationErrors: null,
  loginFailed: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
    setToken: (state, { payload: token }) => {
      state.token = token;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApiEndpoints.login.matchPending, (state) => {
      state.isLoading = true;
      state.validationErrors = null;
      state.loginFailed = false;
    });
    builder.addMatcher(
      authApiEndpoints.login.matchFulfilled,
      (state: AuthState, { payload: { token } }) => {
        state.isLoading = false;
        state.token = token;
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
