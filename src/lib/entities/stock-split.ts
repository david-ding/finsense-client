import type { Ratio } from "$lib/entities/ratio";
import type { Identifiable } from "./identifiable";

export type StockSplit = {
  symbol?: string;
  date?: Date;
  ratio?: Ratio;
} & Identifiable;
