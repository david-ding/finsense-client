<script lang="ts">
  import { isNumber } from "lodash-es";
  import { BehaviorSubject, combineLatest } from "rxjs";
  import { map } from "rxjs/operators";
  import { getContext } from "svelte";
  import type { Readable } from "svelte/store";

  import type { CurrencyAmount } from "../../../entities/currency-amount";
  import { usdAudRate } from "../../../stores/features/exchange-rates/exchange-rates.derived-stores";
  import { convertToForeign, isNegative } from "../../../utils/currency-amount.utils";
  import { observe } from "../../../utils/store.utils";
  import Number from "./NumberFormatter.svelte";

  export let amount: CurrencyAmount;

  const sourceAmount = new BehaviorSubject(amount);
  $: sourceAmount.next(amount);

  const targetCurrencyCode = getContext<Readable<string>>("targetCurrencyCode");
  const targetAmount = combineLatest([
    observe(targetCurrencyCode),
    sourceAmount.asObservable(),
  ]).pipe(
    map(([code, sourceAmount]) =>
      !code || sourceAmount.code === code ? sourceAmount : convertToForeign(sourceAmount, $usdAudRate?.value, code),
    ),
  );
</script>

{#if isNumber($targetAmount?.value)}
  {#if isNegative($targetAmount)}-{/if}{$targetAmount.code === "USD" ? "U" : "A"}$<Number
    value={$targetAmount.value}
    unsigned
  />
{/if}
