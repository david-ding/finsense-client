import type { CurrencyAmount } from "./currency-amount";
import type { Identifiable } from "./identifiable";

export type OrderType = "buy" | "sell";

export type Order = {
  symbol?: string;
  type?: OrderType;
  date?: Date;
  price?: CurrencyAmount;
  quantity?: number;
  fee?: CurrencyAmount;
} & Identifiable;
