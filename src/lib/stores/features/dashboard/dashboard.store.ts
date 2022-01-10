import { createSlice } from "@reduxjs/toolkit";

export type DashboardState = {
  targetCurrencyCode: string;
};

const initialState: DashboardState = {
  targetCurrencyCode: "USD",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTargetCurrencyCode: (state, { payload: targetCurrencyCode }) => {
      state.targetCurrencyCode = targetCurrencyCode;
    },
  },
});

export const dashboardActions = dashboardSlice.actions;
export default dashboardSlice.reducer;
