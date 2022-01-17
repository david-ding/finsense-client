import { derived } from "svelte/store";
import type { RootState } from "$lib/stores/root-state";
import { rootStore } from "$lib/stores/root-store";

export const stockSymbolsStore = derived(
  rootStore<RootState>(),
  ($rootStore) => $rootStore.stockSymbols,
);

export const stockSymbols = derived(
  stockSymbolsStore,
  ($stockSymbolsStore) => $stockSymbolsStore.entities,
);

export const stockSymbolOptions = derived(stockSymbols, ($stockSymbols) =>
  $stockSymbols.map(({ symbol, description }) => ({
    label: `${description} (${symbol})`,
    value: symbol,
  })),
);
