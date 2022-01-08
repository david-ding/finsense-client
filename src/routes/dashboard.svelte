<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Button from "$lib/components/common/Button.svelte";
  import CurrencyAmountFormatter from "$lib/components/common/formatters/CurrencyAmountFormatter.svelte";
  import StatsCard from "$lib/components/common/StatsCard.svelte";
  import HoldingsList from "$lib/components/site/stocks/holdings/HoldingsList.svelte";
  import OnlineIcon from "$lib/components/common/icons/OnlineIcon.svelte";
  import OfflineIcon from "$lib/components/common/icons/OfflineIcon.svelte";
  import { exchangeRatesApiEndpoints } from "$lib/stores/features/exchange-rates/exchange-rates.api";
  import { holdingsApiEndpoints } from "$lib/stores/features/holdings/holdings.api";
  import {
    dayGain,
    dayGainAud,
    dayGainPercentage,
    gain,
    gainAud,
    gainPercentage,
    isLiveMode,
    totalMarketValue,
    totalMarketValueAud,
  } from "$lib/stores/features/holdings/holdings.derived-stores";
  import { holdingsActions } from "$lib/stores/features/holdings/holdings.store";
  import { dispatch } from "$lib/stores/redux-store";
  import {
    connectFinnhubLiveQuotes,
    disconnectFinnhubLiveQuotes,
  } from "$lib/streams/finnhub.stream";
  import ColoredGainLossStat from "$lib/components/common/ColoredGainLossStat.svelte";
  import { usdAudRate } from "../lib/stores/features/exchange-rates/exchange-rates.derived-stores";
  import { formatDate } from "../lib/utils/date.utils";

  onMount(() => {
    dispatch(exchangeRatesApiEndpoints.index.initiate());
    dispatch(holdingsApiEndpoints.index.initiate());
    return isLiveMode.subscribe((isLiveMode) =>
      isLiveMode ? connectFinnhubLiveQuotes() : disconnectFinnhubLiveQuotes(),
    );
  });

  onDestroy(() => {
    dispatch(holdingsActions.toggleLiveMode(false));
    disconnectFinnhubLiveQuotes();
  });
</script>

<h2>Dashboard</h2>

<Button
  class="btn-phantom sm:absolute sm:top-8 sm:right-4"
  on:click={() => dispatch(holdingsActions.toggleLiveMode(!$isLiveMode))}
>
  {#if $isLiveMode}
    <OfflineIcon /> <span class="ml-4 animate-ping inline-flex h-1 w-1 rounded-full bg-gray-700" />
  {:else}
    <OnlineIcon />
  {/if}
</Button>

<div class="mt-4 grid grid-cols-12 gap-4">
  <StatsCard class="col-span-12">
    <svelte:fragment slot="label">
      USD/AUD Exchange Rate (Updated at: {formatDate($usdAudRate?.updatedAt)})
    </svelte:fragment>
    <svelte:fragment slot="value">{$usdAudRate?.value}</svelte:fragment>
  </StatsCard>
  <StatsCard class="col-span-12 lg:col-span-4">
    <svelte:fragment slot="label">Market Value</svelte:fragment>
    <svelte:fragment slot="value">
      <CurrencyAmountFormatter amount={$totalMarketValue} />
      /
      <CurrencyAmountFormatter amount={$totalMarketValueAud} />
    </svelte:fragment>
  </StatsCard>
  <StatsCard class="col-span-12 lg:col-span-4">
    <svelte:fragment slot="label">Gain/Loss</svelte:fragment>
    <ColoredGainLossStat amount={$gain} slot="value">
      <CurrencyAmountFormatter amount={$gain} />
      /
      <CurrencyAmountFormatter amount={$gainAud} />
      ({$gainPercentage})
    </ColoredGainLossStat>
  </StatsCard>
  <StatsCard class="col-span-12 lg:col-span-4">
    <svelte:fragment slot="label">Day Change</svelte:fragment>
    <ColoredGainLossStat amount={$dayGain} slot="value">
      <CurrencyAmountFormatter amount={$dayGain} />
      /
      <CurrencyAmountFormatter amount={$dayGainAud} />
      ({$dayGainPercentage})
    </ColoredGainLossStat>
  </StatsCard>
</div>

<h3 class="mt-4">Holdings</h3>
<HoldingsList class="mt-4" />
