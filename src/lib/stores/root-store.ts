import reduxStore, { type RootState } from "$lib/stores/redux-store";
import type { Readable, Subscriber } from "svelte/store";

export function rootStore(): Readable<RootState> {
  const subscribe = (fn: Subscriber<RootState>) => {
    fn(reduxStore.getState());

    return reduxStore.subscribe(() => {
      fn(reduxStore.getState());
    });
  };

  return { subscribe };
}
