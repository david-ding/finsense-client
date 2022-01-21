<script lang="ts">
  import type { SelectOption } from "svelte-selectbox";
  import Select from "./Select.svelte";

  export let appendTo: string = "main";
  export let options: Array<SelectOption> = null;
  export let searchFn: (query: string) => void = null;
  export let value: unknown = null;

  const valueFormatterFn = (value: unknown) =>
    options.find((option) => option.value === value)?.label || value?.toString();
</script>

<Select
  {appendTo}
  cursorType="text"
  {options}
  {searchFn}
  {valueFormatterFn}
  bind:value
  on:clear
  on:reset
  on:select
  showChevron={false}
  showEmptyResults={false}
/>
