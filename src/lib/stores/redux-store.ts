import authReducer from "$lib/stores/features/auth/auth.store";
import dashboardReducer from "$lib/stores/features/dashboard/dashboard.store";
import { exchangeRatesApi } from "$lib/stores/features/exchange-rates/exchange-rates.api";
import exchangeRatesReducer from "$lib/stores/features/exchange-rates/exchange-rates.store";
import { holdingsApi } from "$lib/stores/features/holdings/holdings.api";
import holdingsReducer from "$lib/stores/features/holdings/holdings.store";
import { ordersApi } from "$lib/stores/features/orders/orders.api";
import ordersReducer from "$lib/stores/features/orders/orders.store";
import { stockSplitsApi } from "$lib/stores/features/stock-splits/stock-splits.api";
import stockSplitsReducer from "$lib/stores/features/stock-splits/stock-splits.store";
import { stockSymbolsApi } from "$lib/stores/features/stock-symbols/stock-symbols.api";
import stockSymbolsReducer from "$lib/stores/features/stock-symbols/stock-symbols.store";
import { logout } from "$lib/utils/auth.utils";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import type { UnknownAction } from "redux";
import { Subject } from "rxjs";

const actions = new Subject<UnknownAction>();

const unauthenticatedHandlerMiddleware: Middleware = (api: MiddlewareAPI) => {
  return (next) => {
    return (action) => {
      if (action.payload?.status === 401) {
        logout(api.dispatch);
      }
      return next(action);
    };
  };
};

const actionsStreamMiddleware: Middleware = () => (next) => (action) => {
  actions.next(action);
  return next(action);
};

const reduxStore = configureStore({
  reducer: {
    stockSymbols: stockSymbolsReducer,
    [stockSymbolsApi.reducerPath]: stockSymbolsApi.reducer,
    orders: ordersReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    stockSplits: stockSplitsReducer,
    [stockSplitsApi.reducerPath]: stockSplitsApi.reducer,
    exchangeRates: exchangeRatesReducer,
    [exchangeRatesApi.reducerPath]: exchangeRatesApi.reducer,
    holdings: holdingsReducer,
    [holdingsApi.reducerPath]: holdingsApi.reducer,
    dashboard: dashboardReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(actionsStreamMiddleware)
      .concat(unauthenticatedHandlerMiddleware)
      .concat(stockSymbolsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(stockSplitsApi.middleware)
      .concat(exchangeRatesApi.middleware)
      .concat(holdingsApi.middleware),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export const { dispatch } = reduxStore;
export { actions };
export default reduxStore;
