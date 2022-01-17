import { actions } from "$lib/stores/redux-store";
import { filter, take } from "rxjs/operators";
import type { Unsubscriber } from "svelte/store";

export const onFirstAction = (actionType: string, callback: () => void): Unsubscriber => {
  const subscription = actions
    .pipe(
      filter((action) => action.type === actionType),
      take(1),
    )
    .subscribe(callback);

  return () => subscription.unsubscribe();
};
