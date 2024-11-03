import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { StockSplit } from "$lib/entities/stock-split";
import { stockSplitsApiEndpoints } from "$lib/stores/features/stock-splits/stock-splits.api";

export type StockSplitState = {
  stockSplitModalDisplayed: { id: string };
  isLoading: boolean;
  validationErrors: Record<string, string>;
} & EntityState<StockSplit, string>;

const stockSplitsAdapter = createEntityAdapter<StockSplit>();

const initialState: StockSplitState = {
  ...stockSplitsAdapter.getInitialState(),
  stockSplitModalDisplayed: null,
  isLoading: false,
  validationErrors: null,
};

const { matchPending: indexMatchPending, matchFulfilled: indexMatchFulfilled } =
  stockSplitsApiEndpoints.index;

const {
  matchPending: createMatchPending,
  matchFulfilled: createMatchFulfilled,
  matchRejected: createMatchRejected,
} = stockSplitsApiEndpoints.create;

const {
  matchPending: updateMatchPending,
  matchFulfilled: updateMatchFulfilled,
  matchRejected: updateMatchRejected,
} = stockSplitsApiEndpoints.update;

const {
  matchPending: deleteMatchPending,
  matchFulfilled: deleteMatchFulfilled,
  matchRejected: deleteMatchRejected,
} = stockSplitsApiEndpoints.delete;

const pendingAction = isAnyOf(
  indexMatchPending,
  createMatchPending,
  updateMatchPending,
  deleteMatchPending,
);

const completedAction = isAnyOf(
  indexMatchFulfilled,
  createMatchFulfilled,
  createMatchRejected,
  updateMatchFulfilled,
  updateMatchRejected,
  deleteMatchFulfilled,
  deleteMatchRejected,
);

const modalClosingAction = isAnyOf(createMatchFulfilled, updateMatchFulfilled);

const stockSplitsSlice = createSlice({
  name: "stockSplits",
  initialState,
  reducers: {
    showStockSplitModal: (state, { payload: id }) => {
      state.stockSplitModalDisplayed = { id };
    },
    hideStockSplitModal: (state) => {
      state.stockSplitModalDisplayed = null;
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(pendingAction, (state) => {
      state.isLoading = true;
      state.validationErrors = null;
    });
    builder.addMatcher(completedAction, (state) => {
      state.isLoading = false;
    });
    builder.addMatcher(modalClosingAction, (state) => {
      state.validationErrors = null;
      state.stockSplitModalDisplayed = null;
    });
    builder.addMatcher(indexMatchFulfilled, (state, { payload }) =>
      stockSplitsAdapter.setAll(state, payload),
    );
    builder.addMatcher(createMatchFulfilled, (state, { payload }) =>
      stockSplitsAdapter.addOne(state, payload),
    );
    builder.addMatcher(createMatchRejected, (state, { payload }) => {
      state.validationErrors = payload.data.validationErrors;
    });
    builder.addMatcher(updateMatchFulfilled, (state, { payload }) =>
      stockSplitsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload,
      }),
    );
    builder.addMatcher(updateMatchRejected, (state, { payload }) => {
      state.validationErrors = payload.data.validationErrors;
    });
    builder.addMatcher(deleteMatchFulfilled, (state, { payload }) =>
      stockSplitsAdapter.removeOne(state, payload.id),
    );
  },
});

export const stockSplitsActions = stockSplitsSlice.actions;
export default stockSplitsSlice.reducer;
