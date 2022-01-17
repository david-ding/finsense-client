<script lang="ts">
  import type { CurrencyAmount } from "$lib/entities/currency-amount";
  import { createCurrencyAmount } from "$lib/utils/currency-amount.utils";
  import Input from "./Input.svelte";

  export let currencyCode: string = "AUD";
  export let name: string = null;
  export let value: CurrencyAmount = null;
  $: inputValue = value?.value;

  const handleInput = (event: CustomEvent) => {
    value = createCurrencyAmount(event.detail, value?.code || currencyCode);
  };
</script>

<Input
  {name}
  on:input={handleInput}
  maskOptions={{
    mask: Number,
    signed: false,
    scale: 2,
    thousandsSeparator: ",",
    padFractionalZeros: true,
    radix: ".",
    mapToRadix: ["."],
    max: 999999999999,
  }}
  prefix="$"
  type="text"
  value={inputValue}
/>
