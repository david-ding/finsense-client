import type { CurrencyAmount } from "./currency-amount";
import type { Identifiable } from "./identifiable";
import type { Trackable } from "./trackable";

export type Holding = {
  symbol?: string;
  avgPrice?: CurrencyAmount;
  quantity?: number;
  price?: CurrencyAmount;
  prevPrice?: CurrencyAmount;
} & Identifiable & Trackable;
