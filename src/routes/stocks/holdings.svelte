<script lang="ts">
  import Button from "$lib/components/common/Button.svelte";
  import CurrencyAmountFormatter from "$lib/components/common/formatters/CurrencyAmountFormatter.svelte";
  import StatsCard from "$lib/components/common/StatsCard.svelte";
  import HoldingsList from "$lib/components/site/stocks/holdings/HoldingsList.svelte";
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
  import { onDestroy, onMount } from "svelte";
  import ColoredGainLossStat from "../../lib/components/common/ColoredGainLossStat.svelte";

  onMount(() => {
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

<h2>Holdings</h2>

<Button
  class="btn-primary sm:absolute sm:top-4 sm:right-4"
  on:click={() => dispatch(holdingsActions.toggleLiveMode(!$isLiveMode))}
>
  {#if $isLiveMode}
    Pause <span class="ml-4 animate-ping inline-flex h-1 w-1 rounded-full bg-white" />
  {:else}
    Turn on live mode
  {/if}
</Button>

<div class="mt-4 grid grid-cols-12 gap-4">
  <StatsCard class="col-span-12 md:col-span-4">
    <svelte:fragment slot="label">Market Value</svelte:fragment>
    <svelte:fragment slot="value">
      <CurrencyAmountFormatter amount={$totalMarketValue} />
      /
      <CurrencyAmountFormatter amount={$totalMarketValueAud} />
    </svelte:fragment>
  </StatsCard>
  <StatsCard class="col-span-12 md:col-span-4">
    <svelte:fragment slot="label">Gain/Loss</svelte:fragment>
    <ColoredGainLossStat amount={$gain} slot="value">
      <CurrencyAmountFormatter amount={$gain} />
      /
      <CurrencyAmountFormatter amount={$gainAud} />
      ({$gainPercentage})
    </ColoredGainLossStat>
  </StatsCard>
  <StatsCard class="col-span-12 md:col-span-4">
    <svelte:fragment slot="label">Day change</svelte:fragment>
    <ColoredGainLossStat amount={$dayGain} slot="value">
      <CurrencyAmountFormatter amount={$dayGain} />
      /
      <CurrencyAmountFormatter amount={$dayGainAud} />
      ({$dayGainPercentage})
    </ColoredGainLossStat>
  </StatsCard>
</div>

<HoldingsList class="mt-4" />
