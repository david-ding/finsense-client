<script lang="ts">
  import { isNumber } from "lodash-es";
  import { BehaviorSubject } from "rxjs";
  import { map } from "rxjs/operators";

  import { Currency, type CurrencyAmount } from "$lib/entities/currency-amount";
  import { usdAudRate } from "$lib/stores/features/exchange-rates/exchange-rates.derived-stores";
  import { convertToForeign, isNegative } from "$lib/utils/currency-amount.utils";
  import Number from "./NumberFormatter.svelte";

  export let amount: CurrencyAmount;
  export let targetCurrencyCode: string | undefined = undefined;

  const sourceAmount = new BehaviorSubject(amount);
  $: sourceAmount.next(amount);

  // This assumes we only have 2 currencies: USD and AUD
  const targetAmount = sourceAmount.asObservable().pipe(
    map((sourceAmount) => {
      if (!targetCurrencyCode || sourceAmount.code === targetCurrencyCode) {
        return sourceAmount;
      }

      if (sourceAmount.code === Currency.USD) {
        return convertToForeign(sourceAmount, $usdAudRate?.value, targetCurrencyCode);
      }

      return convertToForeign(sourceAmount, 1 / $usdAudRate?.value, targetCurrencyCode);
    }),
  );
</script>

{#if isNumber($targetAmount?.value)}
  {#if isNegative($targetAmount)}-{/if}{$targetAmount.code === Currency.USD ? "U" : "A"}$<Number
    value={$targetAmount.value}
    unsigned
  />
{/if}
