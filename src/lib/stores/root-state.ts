import type { ExchangeRatesState } from "$lib/stores/features/exchange-rates/exchange-rates.store";
import type { OrderState } from "$lib/stores/features/orders/orders.store";
import type { StockSymbolState } from "$lib/stores/features/stock-symbols/stock-symbols.store";
import type { HoldingsState } from "$lib/stores/features/holdings/holdings.store";
import type { DashboardState } from "$lib/stores/features/dashboard/dashboard.store";
import type { AuthState } from "$lib/stores/features/auth/auth.store";

export type RootState = {
  auth: AuthState;
  orders: OrderState;
  stockSymbols: StockSymbolState;
  exchangeRates: ExchangeRatesState;
  holdings: HoldingsState;
  dashboard: DashboardState;
};
