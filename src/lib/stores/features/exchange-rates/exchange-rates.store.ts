import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import type { EntityState } from "@reduxjs/toolkit";
import type { ExchangeRate } from "$lib/entities/exchange-rate";
import { exchangeRatesApiEndpoints } from "$lib/stores/features/exchange-rates/exchange-rates.api";

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
  exchangeRatesApiEndpoints.index.matchPending,
  exchangeRatesApiEndpoints.update.matchPending,
);

const fulfilledAction = isAnyOf(
  exchangeRatesApiEndpoints.index.matchFulfilled,
  exchangeRatesApiEndpoints.update.matchFulfilled,
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
