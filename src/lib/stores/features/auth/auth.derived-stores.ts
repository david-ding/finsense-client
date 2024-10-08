import { derived } from "svelte/store";
import { rootStore } from "$lib/stores/root-store";

export const authStore = derived(rootStore(), ($rootStore) => $rootStore.auth);

export const isLoading = derived(authStore, ($authStore) => $authStore.isLoading);

export const validationErrors = derived(authStore, ($authStore) => $authStore.validationErrors);

export const loginFailed = derived(authStore, ($authStore) => $authStore.loginFailed);
