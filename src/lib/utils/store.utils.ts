import { Observable } from "rxjs";
import type { Readable } from "svelte/store";

const observe = <T>(store: Readable<T>): Observable<T> =>
  new Observable<T>((subscriber) => store.subscribe((state) => subscriber.next(state)));

export { observe };
