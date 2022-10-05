import { derived } from "svelte/store";
import type { RootState } from "$lib/stores/root-state";
import { rootStore } from "$lib/stores/root-store";

export const dashboardStore = derived(rootStore<RootState>(), ($rootStore) => $rootStore.dashboard);

export const targetCurrencyCode = derived(
  dashboardStore,
  ($dashboardStore) => $dashboardStore.targetCurrencyCode,
);
