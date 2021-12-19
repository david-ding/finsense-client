import { createSlice } from "@reduxjs/toolkit";
import type { Order } from "../../../entities/order";
import { ordersApiEndpoints } from "./orders.api";

export type OrderState = {
  createOrderModalDisplayed: boolean;
  entities: Array<Order>;
  isLoading: boolean;
  validationErrors: Record<string, string>;
};

const initialState: OrderState = {
  createOrderModalDisplayed: false,
  entities: [],
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

const matchPending = (action: unknown) => {
  return indexMatchPending(action) || createMatchPending(action);
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    showCreateOrderModal: (state) => {
      state.createOrderModalDisplayed = true;
    },
    hideCreateOrderModal: (state) => {
      state.createOrderModalDisplayed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(matchPending, (state) => {
      state.isLoading = true;
      state.validationErrors = null;
    });
    builder.addMatcher(indexMatchFulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.entities = payload;
    });
    builder.addMatcher(createMatchFulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.entities = [...state.entities, payload];
      state.validationErrors = null;
      state.createOrderModalDisplayed = false;
    });
    builder.addMatcher(createMatchRejected, (state, { payload }) => {
      state.isLoading = false;
      state.validationErrors = payload.data.validationErrors;
    });
  },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
