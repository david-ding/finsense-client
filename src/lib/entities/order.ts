import type { CurrencyAmount } from "./currency-amount";

export type OrderType = "buy" | "sell";

export type Order = {
  id?: string;
  symbol?: string;
  type?: OrderType;
  date?: Date;
  price?: CurrencyAmount;
  quantity?: number;
  fee?: CurrencyAmount;
};
