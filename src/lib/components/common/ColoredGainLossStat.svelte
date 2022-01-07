<script lang="ts">
  import type { CurrencyAmount } from "../../entities/currency-amount";
  import { isNegative, isPositive } from "../../utils/currency-amount.utils";

  export let amount: CurrencyAmount;
</script>

<div class:text-red-600={isNegative(amount)} class:text-green-600={isPositive(amount)}>
  <slot />
</div>
