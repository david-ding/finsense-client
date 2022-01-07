import { derived } from "svelte/store";
import {
  add,
  convertToForeign,
  isNegative,
  multiply,
  percentageOf,
  subtract,
} from "../../../utils/currency-amount.utils";
import type { RootState } from "../../root-state";
import { rootStore } from "../../root-store";
import { usdAudRate } from "../exchange-rates/exchange-rates.derived-stores";

export const holdingsStore = derived(rootStore<RootState>(), ($rootStore) => $rootStore.holdings);

export const holdings = derived(holdingsStore, ($holdingsStore) =>
  $holdingsStore.ids.map((id) => $holdingsStore.entities[id]),
);

export const isLiveMode = derived(holdingsStore, ($holdingsStore) => $holdingsStore.isLiveMode);

export const symbols = derived(holdingsStore, ($holdingsStore) => $holdingsStore.ids);

export const totalMarketValue = derived(holdings, ($holdings) =>
  add(...$holdings.map((holding) => multiply(holding.price, holding.quantity))),
);

export const totalMarketValueAud = derived(
  [totalMarketValue, usdAudRate],
  ([$totalMarketValue, $usdAudRate]) => convertToForeign($totalMarketValue, $usdAudRate?.value),
);

export const totalCost = derived(holdings, ($holdings) =>
  add(...$holdings.map((holding) => multiply(holding.avgPrice, holding.quantity))),
);

export const gain = derived([totalMarketValue, totalCost], ([$totalMarketValue, $totalCost]) =>
  subtract($totalMarketValue, $totalCost),
);

export const gainAud = derived([gain, usdAudRate], ([$gain, $usdAudRate]) =>
  convertToForeign($gain, $usdAudRate?.value),
);

export const gainPercentage = derived([gain, totalCost], ([$gain, $totalCost]) =>
  percentageOf($gain, $totalCost),
);

export const isLoss = derived(gain, ($gain) => isNegative($gain));

const totalPrevMarketValue = derived(holdings, ($holdings) =>
  add(...$holdings.map((holding) => multiply(holding.prevPrice, holding.quantity))),
);

export const dayGain = derived(
  [totalMarketValue, totalPrevMarketValue],
  ([$totalMarketValue, $totalPrevMarketValue]) =>
    subtract($totalMarketValue, $totalPrevMarketValue),
);

export const dayGainAud = derived([dayGain, usdAudRate], ([$dayGain, $usdAudRate]) =>
  convertToForeign($dayGain, $usdAudRate?.value),
);

export const dayGainPercentage = derived(
  [dayGain, totalPrevMarketValue],
  ([$dayGain, $totalPrevMarketValue]) => percentageOf($dayGain, $totalPrevMarketValue),
);

export const isDayLoss = derived(dayGain, ($dayGain) => isNegative($dayGain));
