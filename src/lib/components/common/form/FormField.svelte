<script lang="ts">
  import { isEmpty, negate } from "lodash-es";
  import { map } from "rxjs/operators";
  import { getContext, setContext } from "svelte";
  import type { ClassNames } from "svelte-selectable/types";
  import type { Readable } from "svelte/store";
  import type { ValidationErrors } from "../../../entities/validation-errors";
  import mergeClassNames from "../../../utils/merge-class-names";
  import { observe } from "../../../utils/store.utils";

  let classNames: ClassNames = null;
  export let name: string;
  export let label: string = null;
  export let htmlId: string = _generateHtmlId();

  const errorMessages = getContext<Readable<ValidationErrors>>("errorMessages");
  setContext(
    "invalid",
    observe(errorMessages).pipe(
      map((errorMessages) => errorMessages?.[name]),
      map(negate(isEmpty)),
    ),
  );
  setContext("htmlId", htmlId);

  function _generateHtmlId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  export { classNames as class };
</script>

<div class={mergeClassNames(classNames)}>
  <label for={htmlId} class="block text-sm font-medium text-gray-700">{label}</label>
  <div class="mt-1 relative">
    <slot {htmlId} invalid={!!$errorMessages?.[name]?.length} />
  </div>

  {#if $errorMessages?.[name]}
    <small class="text-xs text-red-600">{$errorMessages[name]}</small>
  {/if}
</div>
