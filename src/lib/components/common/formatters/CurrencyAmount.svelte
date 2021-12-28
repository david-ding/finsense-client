<script lang="ts">
  import { isNumber } from "lodash-es";

  import type { CurrencyAmount } from "../../../entities/currency-amount";
  import Number from "./Number.svelte";

  export let amount: CurrencyAmount;
</script>

{#if isNumber(amount?.value)}
  $<Number value={amount.value} />
{/if}
