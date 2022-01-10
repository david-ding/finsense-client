import { orderBy } from "lodash-es";
import { derived } from "svelte/store";
import type { RootState } from "../../root-state";
import { rootStore } from "../../root-store";

export const ordersStore = derived(rootStore<RootState>(), ($rootStore) => $rootStore.orders);

export const orders = derived(ordersStore, ($ordersStore) => orderBy($ordersStore.entities, "date", "desc"));

export const isLoading = derived(ordersStore, ($ordersStore) => $ordersStore.isLoading);

export const validationErrors = derived(
  ordersStore,
  ($ordersStore) => $ordersStore.validationErrors,
);

export const orderModalDisplayed = derived(
  ordersStore,
  ($ordersStore) => $ordersStore.orderModalDisplayed,
);
