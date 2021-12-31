import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "./features/orders/orders.api";
import ordersReducer from "./features/orders/orders.store";
import { stockSymbolsApi } from "./features/stock-symbols/stock-symbols.api";
import stockSymbolsReducer from "./features/stock-symbols/stock-symbols.store";
import { exchangeRatesApi } from "./features/exchange-rates/exchange-rates.api";
import exchangeRatesReducer from "./features/exchange-rates/exchange-rates.store";

const reduxStore = configureStore({
  reducer: {
    stockSymbols: stockSymbolsReducer,
    [stockSymbolsApi.reducerPath]: stockSymbolsApi.reducer,
    orders: ordersReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    exchangeRates: exchangeRatesReducer,
    [exchangeRatesApi.reducerPath]: exchangeRatesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(stockSymbolsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(exchangeRatesApi.middleware),
});

export const { dispatch } = reduxStore;
export default reduxStore;
