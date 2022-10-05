<script lang="ts">
  import dayjs from "dayjs";
  import Input from "./Input.svelte";

  const DATE_FORMAT = "YYYY-MM-DD";

  export let name: string = null;
  export let value: Date = null;
  export let minDate: Date = null;
  export let maxDate: Date = null;

  $: inputValue = value ? _formatDate(value) : null;
  $: min = minDate ? _formatDate(minDate) : null;
  $: max = maxDate ? _formatDate(maxDate) : null;

  const _formatDate = (date: Date): string => {
    return dayjs(date).format(DATE_FORMAT);
  };

  const handleInput = (event: CustomEvent) => {
    value = dayjs(event.detail).toDate();
  };
</script>

<Input
  {name}
  on:input={handleInput}
  type="date"
  {min}
  {max}
  value={inputValue}
/>
