import type { CurrencyAmount } from "$lib/entities/currency-amount";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { priceHistoryApiEndpoints } from "./price-history.api";

export type PriceHistory = {
  symbol: string;
  date: string;
  adjustedClose: CurrencyAmount;
};

export type PriceHistoryStore = {
  isLoading: boolean;
  priceHistory: Record<string, PriceHistory[]>;
};

const initialState: PriceHistoryStore = {
  priceHistory: {},
  isLoading: false,
};

const { matchPending: indexMatchPending, matchFulfilled: indexMatchFulfilled } =
  priceHistoryApiEndpoints.symbolPriceHistory;

const pendingAction = isAnyOf(indexMatchPending);

const completedAction = isAnyOf(indexMatchFulfilled);

const priceHistorySlice = createSlice({
  name: "priceHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(pendingAction, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(completedAction, (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(indexMatchFulfilled, (state, { payload: priceHistory }) => {
      if (priceHistory.length === 0) {
        return;
      }
      const symbol = priceHistory[0].symbol;
      state.priceHistory[symbol] = priceHistory;
    });
  },
});

export const priceHistoryActions = priceHistorySlice.actions;
export default priceHistorySlice.reducer;
