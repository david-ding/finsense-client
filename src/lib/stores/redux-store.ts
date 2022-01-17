import { configureStore } from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import type { AnyAction } from "redux";
import { Subject } from "rxjs";
import { authActions } from "$lib/stores/features/auth/auth.store";
import { exchangeRatesApi } from "$lib/stores/features/exchange-rates/exchange-rates.api";
import { holdingsApi } from "$lib/stores/features/holdings/holdings.api";
import { ordersApi } from "$lib/stores/features/orders/orders.api";
import { stockSymbolsApi } from "$lib/stores/features/stock-symbols/stock-symbols.api";
import stockSymbolsReducer from "$lib/stores/features/stock-symbols/stock-symbols.store";
import exchangeRatesReducer from "$lib/stores/features/exchange-rates/exchange-rates.store";
import ordersReducer from "$lib/stores/features/orders/orders.store";
import holdingsReducer from "$lib/stores/features/holdings/holdings.store";
import dashboardReducer from "$lib/stores/features/dashboard/dashboard.store";
import authReducer from "$lib/stores/features/auth/auth.store";

const actions = new Subject<AnyAction>();

const unauthenticatedHandlerMiddleware: Middleware = (api: MiddlewareAPI) => {
  return (next) => {
    return (action) => {
      if (action.payload?.status === 401) {
        api.dispatch(authActions.logout());
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
      .concat(exchangeRatesApi.middleware)
      .concat(holdingsApi.middleware),
});

export const { dispatch } = reduxStore;
export { actions };
export default reduxStore;
