<script lang="ts" context="module">
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
  import type { ClassNames } from "../../../../entities/class-names";
  import type { CurrencyAmount } from "../../../../entities/currency-amount";
  import type { Holding } from "../../../../entities/holding";
  import { holdingsApiEndpoints } from "../../../../stores/features/holdings/holdings.api";
  import {
    holdings,
    isLiveMode,
    totalMarketValue,
  } from "../../../../stores/features/holdings/holdings.derived-stores";
  import { dispatch } from "../../../../stores/redux-store";
  import { multiply, subtract, percentageOf } from "../../../../utils/currency-amount.utils";
  import CurrencyAmountFormatter from "../../../common/formatters/CurrencyAmountFormatter.svelte";
  import Table, { TableColumn } from "../../../common/Table.svelte";

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
  rows={$holdingsListItems}
  rowIdentifier={(holding) => holding.symbol}
>
  <div slot="cell" let:column let:row>
    {#if column.prop === "avgPrice" || column.prop === "marketValue"}
      <CurrencyAmountFormatter amount={row[column.prop]} />
    {:else if column.prop === "price"}
      <div
        class:animate-flash-green={$isLiveMode && row._tracking === "inc"}
        class:animate-flash-red={$isLiveMode && row._tracking === "dec"}
      >
        <CurrencyAmountFormatter amount={row[column.prop]} />
      </div>
    {:else if column.prop === "gainLoss"}
      <div
        class:text-red-500={row.gainLossAmount.value < 0}
        class:text-green-600={row.gainLossAmount.value > 0}
      >
        <CurrencyAmountFormatter amount={row.gainLossAmount} /> ({row.gainLossPercent})
      </div>
    {:else if column.prop === "dayGainLoss"}
      <div
        class:text-red-500={row.dayGainLossAmount.value < 0}
        class:text-green-600={row.dayGainLossAmount.value > 0}
      >
        <CurrencyAmountFormatter amount={row.dayGainLossAmount} /> ({row.dayGainLossPercent})
      </div>
    {:else}
      {row[column.prop]}
    {/if}
  </div>
</Table>
