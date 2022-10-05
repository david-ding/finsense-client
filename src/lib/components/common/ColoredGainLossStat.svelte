<script lang="ts">
  import type { CurrencyAmount } from "$lib/entities/currency-amount";
  import { isNegative, isPositive } from "$lib/utils/currency-amount.utils";

  export let amount: CurrencyAmount;
</script>

<div
  class:text-red-600={isNegative(amount)}
  class:text-green-600={isPositive(amount)}
>
  <slot />
</div>
