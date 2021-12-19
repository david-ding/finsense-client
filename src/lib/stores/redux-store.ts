import { configureStore } from "@reduxjs/toolkit";
import { ordersApi } from "./features/orders/orders.api";
import ordersReducer from "./features/orders/orders.store";
import { stockSymbolsApi } from "./features/stock-symbols/stock-symbols.api";
import stockSymbolsReducer from "./features/stock-symbols/stock-symbols.store";

const reduxStore = configureStore({
  reducer: {
    stockSymbols: stockSymbolsReducer,
    [stockSymbolsApi.reducerPath]: stockSymbolsApi.reducer,
    orders: ordersReducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stockSymbolsApi.middleware).concat(ordersApi.middleware),
});

export const { dispatch } = reduxStore;
export default reduxStore;
