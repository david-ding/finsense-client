<script lang="ts">
  import mergeClassNames from "$lib/utils/merge-class-names";
  // import type { Observable } from "rxjs";
  import { createEventDispatcher, getContext } from "svelte";

  // const invalid = getContext<Observable<boolean>>("invalid");
  const htmlId = getContext<string>("htmlId");

  export let name: string = null;
  export let value: string | number = null;

  const dispatch = createEventDispatcher();

  const handleInput = () => {
    // const eventTarget = event.target as HTMLInputElement;
    // value = type === "number" ? +eventTarget.value : eventTarget.value;
    dispatch("input", value);
  };
</script>

<div class="rounded-md shadow-sm flex justify-center border border-gray-300">
  <input
    class={mergeClassNames([
      "focus:shadow-none",
      "focus:border-none",
      "shadow-none",
      "border-none",
      "rounded-md",
      "flex-grow-0",
      "flex-shrink",
      "px-4",
      "w-full",
      "sm:text-sm",
    ])}
    type="text"
    name={name || htmlId}
    on:input={handleInput}
    id={htmlId}
  />
  <div class="text-gray-500 sm:text-sm flex flex-1 items-center">-for-</div>
  <input
    class={mergeClassNames([
      "focus:shadow-none",
      "focus:border-none",
      "shadow-none",
      "border-none",
      "rounded-md",
      "flex-grow-0",
      "flex-shrink",
      "px-4",
      "w-full",
      "sm:text-sm",
    ])}
    type="text"
    name={name || htmlId}
    on:input={handleInput}
    id={htmlId}
  />
</div>
