<script lang="ts">
  import type { Observable } from "rxjs";
  import { debounce } from "lodash-es";
  import { getContext } from "svelte";
  import SvelteSelectableSelect from "svelte-selectbox";
  import type { SelectOption } from "svelte-selectbox";

  const invalid = getContext<Observable<boolean>>("invalid");
  const htmlId = getContext<string>("htmlId");

  export let appendTo: string = "main";
  export let cursorType: "text" | "default" | "pointer" = "default";
  export let options: Array<SelectOption> = null;
  export let searchFn: (query: string) => void = null;
  export let showChevron: boolean = true;
  export let showEmptyResults: boolean = true;
  export let value: unknown = null;
  export let valueFormatterFn: (value: unknown) => string = null;

  const debouncedSearchFn = searchFn ? debounce(searchFn, 300) : null;
</script>

<SvelteSelectableSelect
  {appendTo}
  {htmlId}
  {options}
  searchable={true}
  searchFn={debouncedSearchFn}
  {showChevron}
  {showEmptyResults}
  {valueFormatterFn}
  yOffset="0.5rem"
  bind:value
  on:clear
  on:reset
  on:select
  --border-radius="0.375rem"
  --line-height="1.25rem"
  --font-size="0.875rem"
  --padding="0.5rem 0.75rem 0.5rem 0.75rem"
  --box-shadow="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
  --border={$invalid ? "1px solid #FCA5A5" : "1px solid #d1d5db"}
  --border-focused={$invalid ? "1px solid #EF4444" : "1px solid #6366f1"}
  --border-expanded="var(--border-focused)"
  --border-hover={$invalid ? "1px solid #FCA5A5" : "1px solid #9ca3af"}
  --box-shadow-focused={$invalid ? "0 0 0 1px #EF4444" : "0 0 0 1px #6366f1"}
  --dropdown-box-shadow="none"
  --dropdown-item-background-highlighted="#6366f1"
  --dropdown-item-background-hover="#e0e7ff"
  --cursor={cursorType}
/>
