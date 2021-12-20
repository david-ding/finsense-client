<script lang="ts">
  import mergeClassNames from "../../../utils/merge-class-names";
  import { imask } from "@imask/svelte";
  import { createEventDispatcher, getContext } from "svelte";
  import type { Observable } from "rxjs";

  const invalid = getContext<Observable<boolean>>("invalid");
  const htmlId = getContext<string>("htmlId");

  export let maskOptions: unknown = null;
  export let name: string = null;
  export let placeholder: string = null;
  export let prefix: string = null;
  export let type: "text" | "number" | "date" = "text";
  export let value: string | number = null;

  const dispatch = createEventDispatcher();

  const handleInput = (event: Event) => {
    const eventTarget = event.target as HTMLInputElement;
    value = type === "number" ? +eventTarget.value : eventTarget.value;
    dispatch("input", value);
  };
</script>

<div class="rounded-md shadow-sm">
  {#if prefix}
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span class="text-gray-500 sm:text-sm">{prefix}</span>
    </div>
  {/if}
  <input
    {type}
    name={name || htmlId}
    on:input={handleInput}
    id={htmlId}
    class={mergeClassNames([
      "focus:ring-indigo-500",
      "focus:border-indigo-500",
      "block",
      "w-full",
      "px-4",
      { "pl-6": !!prefix },
      "sm:text-sm",
      "border-gray-300",
      $invalid ? "border-red-300 focus:ring-red-500 focus:border-red-500" : null,
      "rounded-md",
    ])}
    {placeholder}
    use:imask={maskOptions}
    {value}
    {...$$restProps}
  />
  <!-- <div class="absolute inset-y-0 right-0 flex items-center">
    <label for="currency" class="sr-only">Currency</label>
    <select
      id="currency"
      name="currency"
      class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
    >
      <option>USD</option>
      <option>CAD</option>
      <option>EUR</option>
    </select>
  </div> -->
</div>
