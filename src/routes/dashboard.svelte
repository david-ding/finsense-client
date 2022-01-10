<script lang="ts">
  import { onDestroy, onMount, setContext } from "svelte";
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
    dayGainPercentage,
    gain,
    gainPercentage,
    isLiveMode,
    totalMarketValue,
  } from "$lib/stores/features/holdings/holdings.derived-stores";
  import { holdingsActions } from "$lib/stores/features/holdings/holdings.store";
  import { dashboardActions } from "$lib/stores/features/dashboard/dashboard.store";
  import { dispatch } from "$lib/stores/redux-store";
  import {
    connectFinnhubLiveQuotes,
    disconnectFinnhubLiveQuotes,
  } from "$lib/streams/finnhub.stream";
  import ColoredGainLossStat from "$lib/components/common/ColoredGainLossStat.svelte";
  import { usdAudRate } from "$lib/stores/features/exchange-rates/exchange-rates.derived-stores";
  import { formatDate } from "$lib/utils/date.utils";
  import { targetCurrencyCode } from "$lib/stores/features/dashboard/dashboard.derived-stores";

  setContext("targetCurrencyCode", targetCurrencyCode);

  onMount(() => {
    dispatch(exchangeRatesApiEndpoints.index.initiate());
    dispatch(holdingsApiEndpoints.index.initiate());
    return isLiveMode.subscribe((isLiveMode) =>
      isLiveMode ? connectFinnhubLiveQuotes() : disconnectFinnhubLiveQuotes(),
    );
  });

  onDestroy(() => {
    dispatch(holdingsActions.setLiveMode(false));
    disconnectFinnhubLiveQuotes();
  });
</script>

<div class="flex justify-between">
  <h2>Dashboard</h2>

  <div class="flex items-center">
    <Button
      class="btn-phantom leading-4"
      on:click={() => dispatch(dashboardActions.setTargetCurrencyCode($targetCurrencyCode === "USD" ? "AUD" : "USD"))}
    >
      <span class="text-xs">
        <span class="text-xl leading-6">{$targetCurrencyCode}</span>
         ->
        {$targetCurrencyCode === "USD" ? "AUD" : "USD"}
      </span>
    </Button>

    <Button
      class="btn-phantom ml-4"
      on:click={() => dispatch(holdingsActions.setLiveMode(!$isLiveMode))}
    >
      {#if $isLiveMode}
        <OfflineIcon /> <span class="ml-4 animate-ping inline-flex h-1 w-1 rounded-full bg-gray-700" />
      {:else}
        <OnlineIcon />
      {/if}
    </Button>
  </div>

</div>

<div class="mt-4 grid grid-cols-12 gap-4">
  <StatsCard class="col-span-12 lg:col-span-3">
    <svelte:fragment slot="label">Market Value</svelte:fragment>
    <svelte:fragment slot="value">
      <CurrencyAmountFormatter amount={$totalMarketValue} />
    </svelte:fragment>
  </StatsCard>
  <StatsCard class="col-span-12 lg:col-span-3">
    <svelte:fragment slot="label">Gain/Loss</svelte:fragment>
    <ColoredGainLossStat amount={$gain} slot="value">
      <CurrencyAmountFormatter amount={$gain} />
      ({$gainPercentage})
    </ColoredGainLossStat>
  </StatsCard>
  <StatsCard class="col-span-12 lg:col-span-3">
    <svelte:fragment slot="label">Day Change</svelte:fragment>
    <ColoredGainLossStat amount={$dayGain} slot="value">
      <CurrencyAmountFormatter amount={$dayGain} />
      ({$dayGainPercentage})
    </ColoredGainLossStat>
  </StatsCard>
  <StatsCard class="col-span-12 lg:col-span-3">
    <svelte:fragment slot="label">
      USD/AUD ({formatDate($usdAudRate?.updatedAt)})
    </svelte:fragment>
    <svelte:fragment slot="value">{$usdAudRate?.value}</svelte:fragment>
  </StatsCard>
</div>

<h3 class="mt-4">Holdings</h3>
<HoldingsList class="mt-4" />
