<script lang="ts">
  import Button from "$lib/components/common/Button.svelte";
  import ButtonGroup from "$lib/components/common/ButtonGroup.svelte";
  import ColoredGainLossStat from "$lib/components/common/ColoredGainLossStat.svelte";
  import CurrencyAmountFormatter from "$lib/components/common/formatters/CurrencyAmountFormatter.svelte";
  import OfflineIcon from "$lib/components/common/icons/OfflineIcon.svelte";
  import OnlineIcon from "$lib/components/common/icons/OnlineIcon.svelte";
  import RefreshIcon from "$lib/components/common/icons/RefreshIcon.svelte";
  import StatsCard from "$lib/components/common/StatsCard.svelte";
  import HoldingsList from "$lib/components/site/stocks/holdings/HoldingsList.svelte";
  import { Currency } from "$lib/entities/currency-amount";
  import { Exchange } from "$lib/entities/exchange";
  import { targetCurrencyCode } from "$lib/stores/features/dashboard/dashboard.derived-stores";
  import { dashboardActions } from "$lib/stores/features/dashboard/dashboard.store";
  import { exchangeRatesApiEndpoints } from "$lib/stores/features/exchange-rates/exchange-rates.api";
  import {
    isLoading as exchangeRatesIsLoading,
    usdAudRate,
  } from "$lib/stores/features/exchange-rates/exchange-rates.derived-stores";
  import { holdingsApiEndpoints } from "$lib/stores/features/holdings/holdings.api";
  import {
    dayGain,
    dayGainPercentage,
    exchangeFilter,
    gain,
    gainPercentage,
    isLoading as holdingsIsLoading,
    isLiveMode,
    totalMarketValue,
  } from "$lib/stores/features/holdings/holdings.derived-stores";
  import { holdingsActions } from "$lib/stores/features/holdings/holdings.store";
  import { dispatch } from "$lib/stores/redux-store";
  import {
    connectFinnhubLiveQuotes,
    disconnectFinnhubLiveQuotes,
  } from "$lib/streams/finnhub.stream";
  import { formatDate } from "$lib/utils/date.utils";
  import { onDestroy, onMount, setContext } from "svelte";

  setContext("targetCurrencyCode", targetCurrencyCode);

  const handleExchangeFilterChange = (exchange: Exchange) => {
    switch (exchange) {
      case Exchange.US:
        dispatch(holdingsActions.setExchangeFilter(Exchange.US));
        break;
      case Exchange.AU:
        dispatch(holdingsActions.setExchangeFilter(Exchange.AU));
        break;
      default:
        dispatch(holdingsActions.setExchangeFilter(undefined));
    }

    switch (exchange) {
      case Exchange.AU:
        dispatch(dashboardActions.setTargetCurrencyCode(Currency.AUD));
        break;
      default:
        dispatch(dashboardActions.setTargetCurrencyCode(Currency.USD));
    }
  };

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

<div class="sm:flex sm:justify-between">
  <h2>Dashboard</h2>

  <div class="flex items-center flex-wrap">
    <Button
      class="btn-phantom w-full sm:w-32"
      on:click={() => dispatch(holdingsApiEndpoints.updateEodQuotes.initiate())}
    >
      <RefreshIcon />
    </Button>

    <Button
      class="btn-phantom w-full mt-4 sm:w-32 sm:mt-0 sm:ml-4"
      on:click={() =>
        dispatch(
          dashboardActions.setTargetCurrencyCode(
            $targetCurrencyCode === Currency.USD ? Currency.AUD : Currency.USD,
          ),
        )}
    >
      <span class="text-xs">
        <span class="text-xl leading-6">{$targetCurrencyCode}</span>
        ->
        {$targetCurrencyCode === Currency.USD ? Currency.AUD : Currency.USD}
      </span>
    </Button>

    <Button
      class="btn-phantom w-full mt-4 sm:w-32 sm:mt-0 sm:ml-4"
      on:click={() => dispatch(holdingsActions.setLiveMode(!$isLiveMode))}
    >
      {#if $isLiveMode}
        <OfflineIcon />
        <span class="ml-4 animate-ping inline-flex h-1 w-1 rounded-full bg-gray-700" />
      {:else}
        <OnlineIcon />
      {/if}
    </Button>
  </div>
</div>

<div class="mt-4 grid grid-cols-12 gap-4">
  <StatsCard
    class="col-span-12 lg:col-span-3"
    isLoading={$holdingsIsLoading}
  >
    <svelte:fragment slot="label">Market Value</svelte:fragment>
    <svelte:fragment slot="value">
      <CurrencyAmountFormatter amount={$totalMarketValue} />
    </svelte:fragment>
  </StatsCard>
  <StatsCard
    class="col-span-12 lg:col-span-3"
    isLoading={$holdingsIsLoading}
  >
    <svelte:fragment slot="label">Gain/Loss</svelte:fragment>
    <ColoredGainLossStat
      amount={$gain}
      slot="value"
    >
      <CurrencyAmountFormatter amount={$gain} />
      ({$gainPercentage})
    </ColoredGainLossStat>
  </StatsCard>
  <StatsCard
    class="col-span-12 lg:col-span-3"
    isLoading={$holdingsIsLoading}
  >
    <svelte:fragment slot="label">Day Change</svelte:fragment>
    <ColoredGainLossStat
      amount={$dayGain}
      slot="value"
    >
      <CurrencyAmountFormatter amount={$dayGain} />
      ({$dayGainPercentage})
    </ColoredGainLossStat>
  </StatsCard>
  <StatsCard
    class="col-span-12 lg:col-span-3"
    isLoading={$exchangeRatesIsLoading}
  >
    <svelte:fragment slot="label">
      USD/AUD ({formatDate($usdAudRate?.updatedAt)})
    </svelte:fragment>
    <svelte:fragment slot="value">{$usdAudRate?.value}</svelte:fragment>
  </StatsCard>
</div>

<div class="flex justify-between items-center mt-4">
  <h3 class="mt-4">Holdings</h3>
  <ButtonGroup
    items={[
      {
        label: "All",
        id: undefined,
        onClick: handleExchangeFilterChange,
        isActive: !$exchangeFilter,
      },
      {
        label: "US",
        id: Exchange.US,
        onClick: handleExchangeFilterChange,
        isActive: $exchangeFilter === Exchange.US,
      },
      {
        label: "AU",
        id: Exchange.AU,
        onClick: handleExchangeFilterChange,
        isActive: $exchangeFilter === Exchange.AU,
      },
    ]}
  />
</div>
<HoldingsList class="mt-4" />
