import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { Holding } from "../../../entities/holding";
import { holdingsApiEndpoints } from "./holdings.api";

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

const { matchPending, matchFulfilled } = holdingsApiEndpoints.index;

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
    builder.addMatcher(matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(matchFulfilled, (state, { payload }) =>
      holdingsAdapter.setAll(
        {
          ...state,
          isLoading: false,
        },
        payload,
      ),
    );
  },
});

export const holdingsActions = holdingsSlice.actions;
export default holdingsSlice.reducer;
