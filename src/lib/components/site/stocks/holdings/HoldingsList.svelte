<script
  lang="ts"
  context="module"
>
  export type HoldingsListItem = {
    gainLossAmount?: CurrencyAmount;
    gainLossPercent?: string;
    dayGainLossAmount?: CurrencyAmount;
    dayGainLossPercent?: string;
    marketValue?: CurrencyAmount;
    percent?: string;
  } & Holding;

  function getGainLossAmount(holding: Holding) {
    const diff = subtract(holding.price, holding.avgPrice);
    return multiply(diff, holding.quantity);
  }

  function getGainLossPercent(holding: Holding) {
    const diff = subtract(holding.price, holding.avgPrice);
    return percentageOf(diff, holding.avgPrice);
  }

  function getDayGainLossAmount(holding: Holding) {
    const diff = subtract(holding.price, holding.prevPrice);
    return multiply(diff, holding.quantity);
  }

  function getDayGainLossPercent(holding: Holding) {
    const diff = subtract(holding.price, holding.prevPrice);
    return percentageOf(diff, holding.prevPrice);
  }

  export const holdingsListItems = derived(
    [holdings, totalMarketValue],
    ([$holdings, $totalMarketValue]) => {
      return $holdings.map((holding) => {
        const marketValue = multiply(holding.price, holding.quantity);
        return {
          ...holding,
          gainLossAmount: getGainLossAmount(holding),
          gainLossPercent: getGainLossPercent(holding),
          dayGainLossAmount: getDayGainLossAmount(holding),
          dayGainLossPercent: getDayGainLossPercent(holding),
          marketValue,
          percent: percentageOf(marketValue, $totalMarketValue),
        } as HoldingsListItem;
      });
    },
  );
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import type { ClassNames } from "$lib/entities/class-names";
  import type { CurrencyAmount } from "$lib/entities/currency-amount";
  import type { Holding } from "$lib/entities/holding";
  import { holdingsApiEndpoints } from "$lib/stores/features/holdings/holdings.api";
  import {
    holdings,
    isLoading,
    totalMarketValue,
  } from "$lib/stores/features/holdings/holdings.derived-stores";
  import { dispatch } from "$lib/stores/redux-store";
  import { multiply, subtract, percentageOf } from "$lib/utils/currency-amount.utils";
  import ColoredGainLossStat from "$lib/components/common/ColoredGainLossStat.svelte";
  import CurrencyAmountFormatter from "$lib/components/common/formatters/CurrencyAmountFormatter.svelte";
  import Table from "$lib/components/common/Table.svelte";
  import type { TableColumn } from "$lib/components/common/Table.svelte";
  import TrackedNumberic from "$lib/components/common/TrackedNumberic.svelte";

  let classNames: ClassNames = null;
  export { classNames as class };

  const columns: Array<TableColumn> = [
    { prop: "symbol" },
    { prop: "avgPrice" },
    { prop: "quantity" },
    { prop: "price" },
    { prop: "dayGainLoss", name: "Day Gain/Loss" },
    { prop: "gainLoss", name: "Gain/Loss" },
    { prop: "marketValue" },
    { prop: "percent", name: "%" },
  ];

  onMount(() => dispatch(holdingsApiEndpoints.index.initiate()));
</script>

<Table
  class={classNames}
  {columns}
  isLoading={$isLoading}
  rows={$holdingsListItems}
  rowIdentifier={(holding) => holding.symbol}
>
  <div
    slot="cell"
    let:column
    let:row
  >
    {#if column.prop === "avgPrice" || column.prop === "marketValue" || column.prop === "price"}
      <TrackedNumberic value={row[column.prop].value}>
        <CurrencyAmountFormatter amount={row[column.prop]} />
      </TrackedNumberic>
    {:else if column.prop === "gainLoss" || column.prop === "dayGainLoss"}
      <TrackedNumberic value={row[`${column.prop}Amount`].value}>
        <ColoredGainLossStat amount={row[`${column.prop}Amount`]}>
          <CurrencyAmountFormatter amount={row[`${column.prop}Amount`]} />
          ({row[`${column.prop}Percent`]})
        </ColoredGainLossStat>
      </TrackedNumberic>
    {:else}
      {row[column.prop]}
    {/if}
  </div>
</Table>
