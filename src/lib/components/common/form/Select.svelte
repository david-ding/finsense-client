<script lang="ts">
  import { debounce } from "lodash-es";
  import SvelteSelectableSelect, { SelectOption } from "svelte-selectable";

  export let appendTo: string = "main";
  export let htmlId: string = null;
  export let invalid: boolean = false;
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
  {invalid}
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
  --borderRadius="0.375rem"
  --lineHeight="1.25rem"
  --fontSize="0.875rem"
  --padding="0.5rem 0.75rem 0.5rem 0.75rem"
  --boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
  --borderFocused="1px solid #6366f1"
  --borderExpanded="var(--borderFocused)"
  --boxShadowFocused="0 0 0 1px #6366f1"
  --dropdownBoxShadow="none"
  --dropdownItemBackgroundColorHighlighted="#6366f1"
  --dropdownItemBackgroundColorHover="#e0e7ff"
  --borderColorInvalid="#FCA5A5"
  --borderFocusedInvalid="1px solid #EF4444"
  --boxShadowFocusedInvalid="0 0 0 1px #EF4444"
  --borderHoverInvalid="1px solid #FCA5A5"
/>
