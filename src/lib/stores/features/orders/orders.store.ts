import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { Order } from "$lib/entities/order";
import { ordersApiEndpoints } from "$lib/stores/features/orders/orders.api";

export type OrderState = {
  orderModalDisplayed: { id: string };
  isLoading: boolean;
  validationErrors: Record<string, string>;
} & EntityState<Order>;

const ordersAdapter = createEntityAdapter<Order>();

const initialState: OrderState = {
  ...ordersAdapter.getInitialState(),
  orderModalDisplayed: null,
  isLoading: false,
  validationErrors: null,
};

const { matchPending: indexMatchPending, matchFulfilled: indexMatchFulfilled } =
  ordersApiEndpoints.index;

const {
  matchPending: createMatchPending,
  matchFulfilled: createMatchFulfilled,
  matchRejected: createMatchRejected,
} = ordersApiEndpoints.create;

const {
  matchPending: updateMatchPending,
  matchFulfilled: updateMatchFulfilled,
  matchRejected: updateMatchRejected,
} = ordersApiEndpoints.update;

const {
  matchPending: deleteMatchPending,
  matchFulfilled: deleteMatchFulfilled,
  matchRejected: deleteMatchRejected,
} = ordersApiEndpoints.delete;

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

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    showOrderModal: (state, { payload: id }) => {
      state.orderModalDisplayed = { id };
    },
    hideOrderModal: (state) => {
      state.orderModalDisplayed = null;
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
      state.orderModalDisplayed = null;
    });
    builder.addMatcher(indexMatchFulfilled, (state, { payload }) =>
      ordersAdapter.setAll(state, payload),
    );
    builder.addMatcher(createMatchFulfilled, (state, { payload }) =>
      ordersAdapter.addOne(state, payload),
    );
    builder.addMatcher(createMatchRejected, (state, { payload }) => {
      state.validationErrors = payload.data.validationErrors;
    });
    builder.addMatcher(updateMatchFulfilled, (state, { payload }) =>
      ordersAdapter.updateOne(state, {
        id: payload.id,
        changes: payload,
      }),
    );
    builder.addMatcher(updateMatchRejected, (state, { payload }) => {
      state.validationErrors = payload.data.validationErrors;
    });
    builder.addMatcher(deleteMatchFulfilled, (state, { payload }) =>
      ordersAdapter.removeOne(state, payload.id),
    );
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
