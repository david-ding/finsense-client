import type { Readable } from "svelte/store";
import reduxStore from "./redux-store";

export function rootStore<T>(): Readable<T> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const subscribe = (fn: Function) => {
    fn(reduxStore.getState());

    return reduxStore.subscribe(() => {
      fn(reduxStore.getState());
    });
  };

  return { subscribe };
}
