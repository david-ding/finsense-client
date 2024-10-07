import { derived } from "svelte/store";
import { rootStore } from "$lib/stores/root-store";

export const stockSymbolsStore = derived(rootStore(), ($rootStore) => $rootStore.stockSymbols);

export const isLoading = derived(
  stockSymbolsStore,
  ($stockSymbolsStore) => $stockSymbolsStore.isLoading,
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
