import { derived } from "svelte/store";
import type { RootState } from "../../root-state";
import { rootStore } from "../../root-store";

export const exchangeRatesStore = derived(
  rootStore<RootState>(),
  ($rootStore) => $rootStore.exchangeRates,
);

export const exchangeRates = derived(
  exchangeRatesStore,
  ($exchangeRatesStore) => $exchangeRatesStore.entities,
);

export const usdAudRate = derived(
  exchangeRates,
  ($exchangeRates) => $exchangeRates["USDAUD"],
);

export const isLoading = derived(
  exchangeRatesStore,
  ($exchangeRatesStore) => $exchangeRatesStore.isLoading,
);
