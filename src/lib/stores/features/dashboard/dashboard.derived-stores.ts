import { derived } from "svelte/store";
import type { RootState } from "../../root-state";
import { rootStore } from "../../root-store";

export const dashboardStore = derived(rootStore<RootState>(), ($rootStore) => $rootStore.dashboard);

export const targetCurrencyCode = derived(dashboardStore, ($dashboardStore) => $dashboardStore.targetCurrencyCode);
