import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { ExchangeRate } from "../../../entities/exchange-rate";
import { exchangeRatesApi } from "./exchange-rates.api";

export type ExchangeRatesState = {
  isLoading: boolean;
} & EntityState<ExchangeRate>;

const exchangeRatesAdapter = createEntityAdapter<ExchangeRate>({
  selectId: (exchangeRate) => exchangeRate.key,
});

const initialState: ExchangeRatesState = {
  ...exchangeRatesAdapter.getInitialState(),
  isLoading: false,
};

const pendingAction = isAnyOf(
  exchangeRatesApi.endpoints.index.matchPending,
  exchangeRatesApi.endpoints.update.matchPending,
);

const fulfilledAction = isAnyOf(
  exchangeRatesApi.endpoints.index.matchFulfilled,
  exchangeRatesApi.endpoints.update.matchFulfilled,
);

const exchangeRatesSlice = createSlice({
  name: "exchangeRates",
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
    builder.addMatcher(fulfilledAction, (state, { payload }) =>
      exchangeRatesAdapter.setAll(
        {
          ...state,
          isLoading: false,
        },
        payload,
      ),
    );
  },
});

export const exchangeRatesActions = exchangeRatesSlice.actions;
export default exchangeRatesSlice.reducer;
