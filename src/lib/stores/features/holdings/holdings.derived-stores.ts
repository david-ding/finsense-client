import type { RootState } from "$lib/stores/root-state";
import { rootStore } from "$lib/stores/root-store";
import { add, multiply, percentageOf, subtract } from "$lib/utils/currency-amount.utils";
import { derived } from "svelte/store";

export const holdingsStore = derived(rootStore<RootState>(), ($rootStore) => $rootStore.holdings);

export const holdings = derived(holdingsStore, ($holdingsStore) =>
  $holdingsStore.ids.map((id) => $holdingsStore.entities[id]),
);

export const isLiveMode = derived(holdingsStore, ($holdingsStore) => $holdingsStore.isLiveMode);

export const isLoading = derived(holdingsStore, ($holdingsStore) => $holdingsStore.isLoading);

export const symbols = derived(holdingsStore, ($holdingsStore) => $holdingsStore.ids);

export const totalCost = derived(holdings, ($holdings) =>
  add(...$holdings.map((holding) => multiply(holding.avgPrice, holding.quantity))),
);

export const totalMarketValue = derived(holdings, ($holdings) =>
  add(...$holdings.map((holding) => multiply(holding.price, holding.quantity))),
);

const totalPrevMarketValue = derived(holdings, ($holdings) =>
  add(...$holdings.map((holding) => multiply(holding.prevPrice, holding.quantity))),
);

export const gain = derived([totalMarketValue, totalCost], ([$totalMarketValue, $totalCost]) =>
  subtract($totalMarketValue, $totalCost),
);

export const gainPercentage = derived([gain, totalCost], ([$gain, $totalCost]) =>
  percentageOf($gain, $totalCost),
);

export const dayGain = derived(
  [totalMarketValue, totalPrevMarketValue],
  ([$totalMarketValue, $totalPrevMarketValue]) =>
    subtract($totalMarketValue, $totalPrevMarketValue),
);

export const dayGainPercentage = derived(
  [dayGain, totalPrevMarketValue],
  ([$dayGain, $totalPrevMarketValue]) => percentageOf($dayGain, $totalPrevMarketValue),
);
