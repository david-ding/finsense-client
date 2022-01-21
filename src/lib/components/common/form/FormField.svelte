<script lang="ts">
  import { isEmpty, negate } from "lodash-es";
  import { map } from "rxjs/operators";
  import { getContext, setContext } from "svelte";
  import type { ClassNames } from "svelte-selectbox/types";
  import { readable, Readable } from "svelte/store";
  import type { ValidationErrors } from "$lib/entities/validation-errors";
  import mergeClassNames from "$lib/utils/merge-class-names";
  import { observe } from "$lib/utils/store.utils";
  import Tooltip from "$lib/components/common/Tooltip.svelte";

  let classNames: ClassNames = null;
  export let name: string;
  export let label: string = null;
  export let htmlId: string = _generateHtmlId();

  const errorMessages =
    getContext<Readable<ValidationErrors>>("errorMessages") || readable<ValidationErrors>(null);
  const fieldError = observe(errorMessages).pipe(map((errorMessages) => errorMessages?.[name]));
  const invalid = fieldError.pipe(map(negate(isEmpty)));

  setContext("invalid", invalid);
  setContext("htmlId", htmlId);

  function _generateHtmlId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  export { classNames as class };
</script>

<div class={mergeClassNames(classNames)}>
  <label for={htmlId} class="block text-sm font-medium text-gray-700">{label}</label>
  <div class="mt-1 relative">
    <Tooltip message={$fieldError}>
      <slot {htmlId} invalid={$invalid} />
    </Tooltip>
  </div>
</div>
