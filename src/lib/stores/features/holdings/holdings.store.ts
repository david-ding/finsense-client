import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { Holding } from "$lib/entities/holding";
import { holdingsApiEndpoints } from "$lib/stores/features/holdings/holdings.api";
import { Exchange } from "$lib/entities/exchange";

export type HoldingsState = {
  isLiveMode: boolean;
  isLoading: boolean;
  exchangeFilter: Exchange;
} & EntityState<Holding, string>;

const holdingsAdapter = createEntityAdapter({
  selectId: (holding: Holding) => holding.symbol,
});

const initialState: HoldingsState = {
  ...holdingsAdapter.getInitialState(),
  isLiveMode: false,
  isLoading: false,
  exchangeFilter: undefined,
};

const { matchPending: indexMatchPending, matchFulfilled: indexMatchFulfilled } =
  holdingsApiEndpoints.index;
const { matchPending: updateEodQuotesMatchPending, matchFulfilled: updateEodQuotesMatchFulfilled } =
  holdingsApiEndpoints.updateEodQuotes;

const holdingsSlice = createSlice({
  name: "holdings",
  initialState,
  reducers: {
    setLiveMode: (state, { payload: isLiveMode }) => {
      state.isLiveMode = isLiveMode;
    },
    updateLiveQuote: (state, { payload }) => {
      holdingsAdapter.updateOne(state, {
        id: payload.symbol,
        changes: payload,
      });
    },
    setExchangeFilter: (state, { payload }) => {
      state.exchangeFilter = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(indexMatchPending, updateEodQuotesMatchPending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(indexMatchFulfilled, (state, { payload }) =>
      holdingsAdapter.setAll(
        {
          ...state,
          isLoading: false,
        },
        payload,
      ),
    );
    builder.addMatcher(updateEodQuotesMatchFulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const holdingsActions = holdingsSlice.actions;
export default holdingsSlice.reducer;
