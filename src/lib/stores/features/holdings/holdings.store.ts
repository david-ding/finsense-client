import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { Holding } from "$lib/entities/holding";
import { holdingsApiEndpoints } from "$lib/stores/features/holdings/holdings.api";

export type HoldingsState = {
  isLiveMode: boolean;
  isLoading: boolean;
} & EntityState<Holding>;

const holdingsAdapter = createEntityAdapter<Holding>({
  selectId: (holding) => holding.symbol,
});

const initialState: HoldingsState = {
  ...holdingsAdapter.getInitialState(),
  isLiveMode: false,
  isLoading: false,
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
