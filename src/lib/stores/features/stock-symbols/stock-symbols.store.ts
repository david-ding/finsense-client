import { createSlice, isAnyOf } from "@reduxjs/toolkit";
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

const { matchPending: searchMatchPending, matchFulfilled: searchMatchFulfilled } =
  stockSymbolsApiEndpoints.search;

const { matchPending: updateMatchPending, matchFulfilled: updateMatchFulfilled } =
  stockSymbolsApiEndpoints.update;

const pendingAction = isAnyOf(searchMatchPending, updateMatchPending);

const completedAction = isAnyOf(searchMatchFulfilled, updateMatchFulfilled);

const stockSymbolsSlice = createSlice({
  name: "stockSymbols",
  initialState,
  reducers: {
    reset: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(pendingAction, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addMatcher(completedAction, (state) => ({
      ...state,
      isLoading: false,
    }));
    builder.addMatcher(searchMatchFulfilled, (state, { payload }) => ({
      ...state,
      entities: payload,
    }));
  },
});

export const stockSymbolsActions = stockSymbolsSlice.actions;
export default stockSymbolsSlice.reducer;
