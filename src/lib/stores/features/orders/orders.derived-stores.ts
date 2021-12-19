import { derived } from "svelte/store";
import type { RootState } from "../../root-state";
import { rootStore } from "../../root-store";

export const ordersStore = derived(rootStore<RootState>(), ($rootStore) => $rootStore.orders);

export const orders = derived(ordersStore, ($ordersStore) => $ordersStore.entities);

export const validationErrors = derived(
  ordersStore,
  ($ordersStore) => $ordersStore.validationErrors,
);

export const createOrderModalDisplayed = derived(
  ordersStore,
  ($ordersStore) => $ordersStore.createOrderModalDisplayed,
);
