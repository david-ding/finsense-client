import type { RootState } from "$lib/stores/root-state";
import { Observable } from "rxjs";
import type { Readable } from "svelte/store";

const observe = <T>(store: Readable<T>): Observable<T> =>
  new Observable<T>((subscriber) => store.subscribe((state) => subscriber.next(state)));

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const prepareHeadersWithAuth = (headers, { getState }) => {
  const token = (getState() as RootState).auth.token;

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};

export { observe, prepareHeadersWithAuth };
