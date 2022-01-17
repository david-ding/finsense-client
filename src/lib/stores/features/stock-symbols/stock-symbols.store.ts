import { createSlice } from "@reduxjs/toolkit";
import type { StockSymbol } from "$lib/entities/stock-symbol";
import { stockSymbolsApiEndpoints } from "$lib/stores/features/stock-symbols/stock-symbols.api";

export type StockSymbolState = {
  entities: Array<StockSymbol>;
  isLoading: boolean;
};

const initialState: StockSymbolState = {
  entities: [],
  isLoading: false,
};

const { matchPending, matchFulfilled } = stockSymbolsApiEndpoints.search;

const stockSymbolsSlice = createSlice({
  name: "stockSymbols",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(matchPending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addMatcher(matchFulfilled, (state, { payload }) => ({
      ...state,
      isLoading: false,
      entities: payload,
    }));
  },
});

export const stockSymbolsActions = stockSymbolsSlice.actions;
export default stockSymbolsSlice.reducer;
