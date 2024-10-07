import { derived } from "svelte/store";
import { rootStore } from "$lib/stores/root-store";

export const exchangeRatesStore = derived(rootStore(), ($rootStore) => $rootStore.exchangeRates);

export const exchangeRates = derived(
  exchangeRatesStore,
  ($exchangeRatesStore) => $exchangeRatesStore.entities,
);

export const usdAudRate = derived(exchangeRates, ($exchangeRates) => $exchangeRates["USDAUD"]);

export const isLoading = derived(
  exchangeRatesStore,
  ($exchangeRatesStore) => $exchangeRatesStore.isLoading,
);
