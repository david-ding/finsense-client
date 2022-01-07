<script lang="ts">
  import { isNumber } from "lodash-es";

  import type { CurrencyAmount } from "../../../entities/currency-amount";
  import { isNegative } from "../../../utils/currency-amount.utils";
  import Number from "./NumberFormatter.svelte";

  export let amount: CurrencyAmount;
</script>

{#if isNumber(amount?.value)}
  {#if isNegative(amount)}-{/if}{amount.code === "USD" ? "U" : "A"}$<Number value={amount.value} unsigned />
{/if}
