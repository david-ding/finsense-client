import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { Order } from "../../../entities/order";
import { ordersApiEndpoints } from "./orders.api";

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

const matchPending = (action: unknown) => {
  return (
    indexMatchPending(action) ||
    createMatchPending(action) ||
    updateMatchPending(action) ||
    deleteMatchPending(action)
  );
};

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
    builder.addMatcher(matchPending, (state) => {
      state.isLoading = true;
      state.validationErrors = null;
    });
    builder.addMatcher(indexMatchFulfilled, (state, { payload }) =>
      ordersAdapter.setAll(
        {
          ...state,
          isLoading: false,
        },
        payload,
      ),
    );
    builder.addMatcher(createMatchFulfilled, (state, { payload }) =>
      ordersAdapter.addOne(
        {
          ...state,
          isLoading: false,
          validationErrors: null,
          orderModalDisplayed: null,
        },
        payload,
      ),
    );
    builder.addMatcher(createMatchRejected, (state, { payload }) => {
      state.isLoading = false;
      state.validationErrors = payload.data.validationErrors;
    });
    builder.addMatcher(updateMatchFulfilled, (state, { payload }) =>
      ordersAdapter.updateOne(
        {
          ...state,
          isLoading: false,
          validationErrors: null,
          orderModalDisplayed: null,
        },
        {
          id: payload.id,
          changes: payload,
        },
      ),
    );
    builder.addMatcher(updateMatchRejected, (state, { payload }) => {
      state.isLoading = false;
      state.validationErrors = payload.data.validationErrors;
    });
    builder.addMatcher(deleteMatchFulfilled, (state, { payload }) =>
      ordersAdapter.removeOne(
        {
          ...state,
          isLoading: false,
        },
        payload.id,
      ),
    );
    builder.addMatcher(deleteMatchRejected, (state) => {
      state.isLoading = false;
      // todo: add toast
    });
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
