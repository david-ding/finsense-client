import type { CurrencyAmount } from "./currency-amount";
import type { Identifiable } from "./identifiable";

export type Holding = {
  symbol?: string;
  avgPrice?: CurrencyAmount;
  quantity?: number;
  price?: CurrencyAmount;
  prevPrice?: CurrencyAmount;
} & Identifiable;
