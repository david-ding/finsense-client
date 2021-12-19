import type { OrderState } from "./features/orders/orders.store";
import type { StockSymbolState } from "./features/stock-symbols/stock-symbols.store";

export type RootState = {
  orders: OrderState;
  stockSymbols: StockSymbolState;
};
