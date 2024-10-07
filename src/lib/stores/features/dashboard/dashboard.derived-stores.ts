import { derived } from "svelte/store";
import { rootStore } from "$lib/stores/root-store";

export const dashboardStore = derived(rootStore(), ($rootStore) => $rootStore.dashboard);

export const targetCurrencyCode = derived(
  dashboardStore,
  ($dashboardStore) => $dashboardStore.targetCurrencyCode,
);
