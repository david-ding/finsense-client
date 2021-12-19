<script lang="ts">
  import type { SelectOption } from "svelte-selectable";
  import Select from "./Select.svelte";

  export let appendTo: string = "main";
  export let htmlId: string = null;
  export let invalid: boolean = false;
  export let options: Array<SelectOption> = null;
  export let searchFn: (query: string) => void = null;
  export let value: unknown = null;

  const valueFormatterFn = (value: unknown) =>
    options.find((option) => option.value === value)?.label || value?.toString();
</script>

<Select
  {appendTo}
  {htmlId}
  {invalid}
  {options}
  {searchFn}
  {valueFormatterFn}
  bind:value
  on:clear
  on:reset
  showChevron={false}
  showEmptyResults={false}
/>
