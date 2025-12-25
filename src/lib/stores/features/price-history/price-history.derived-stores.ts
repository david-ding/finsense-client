import { orderBy } from "lodash-es";
import { derived } from "svelte/store";
import { rootStore } from "$lib/stores/root-store";

export const priceHistoryStore = derived(rootStore(), ($rootStore) => $rootStore.priceHistory);

export const getPriceHistory = derived(
  priceHistoryStore,
  ($priceHistoryStore) => (symbol: string) =>
    orderBy($priceHistoryStore.priceHistory[symbol] || [], "date"),
);

export const isLoading = derived(
  priceHistoryStore,
  ($priceHistoryStore) => $priceHistoryStore.isLoading,
);
