import { orderBy } from "lodash-es";
import { derived } from "svelte/store";
import { rootStore } from "$lib/stores/root-store";

export const stockSplitsStore = derived(rootStore(), ($rootStore) => $rootStore.stockSplits);

export const stockSplits = derived(stockSplitsStore, ($stockSplitsStore) =>
  orderBy($stockSplitsStore.entities, "date", "desc"),
);

export const isLoading = derived(
  stockSplitsStore,
  ($stockSplitsStore) => $stockSplitsStore.isLoading,
);

export const validationErrors = derived(
  stockSplitsStore,
  ($stockSplitsStore) => $stockSplitsStore.validationErrors,
);

export const stockSplitModalDisplayed = derived(
  stockSplitsStore,
  ($stockSplitsStore) => $stockSplitsStore.stockSplitModalDisplayed,
);
