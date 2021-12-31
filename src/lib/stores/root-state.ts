import type { ExchangeRatesState } from "./features/exchange-rates/exchange-rates.store";
import type { OrderState } from "./features/orders/orders.store";
import type { StockSymbolState } from "./features/stock-symbols/stock-symbols.store";

export type RootState = {
  orders: OrderState;
  stockSymbols: StockSymbolState;
  exchangeRates: ExchangeRatesState;
};
