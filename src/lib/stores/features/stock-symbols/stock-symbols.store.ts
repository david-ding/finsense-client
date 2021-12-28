import { createSlice } from "@reduxjs/toolkit";
import type { StockSymbol } from "../../../entities/stock-symbol";
import { stockSymbolsApi } from "./stock-symbols.api";

export type StockSymbolState = {
  entities: Array<StockSymbol>;
  isLoading: boolean;
};

const initialState: StockSymbolState = {
  entities: [],
  isLoading: false,
};

const { matchPending, matchFulfilled } = stockSymbolsApi.endpoints.search;

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