<script lang="ts">
  import Modal from "$lib/components/common/Modal.svelte";
  import { holdingsActions } from "$lib/stores/features/holdings/holdings.store";
  import { getPriceHistory } from "$lib/stores/features/price-history/price-history.derived-stores";
  import { dispatch } from "$lib/stores/redux-store";
  import PriceHistoryChart from "./PriceHistoryChart.svelte";
  import {
    getHoldingBySymbol,
    holdingModalDisplayed,
  } from "$lib/stores/features/holdings/holdings.derived-stores";
  import { onMount } from "svelte";
  import { observe } from "$lib/utils/store.utils";
  import { distinctUntilChanged, tap } from "rxjs/operators";

  let modal: Modal;

  function handleModalClose() {
    dispatch(holdingsActions.closeHoldingsModal());
  }

  onMount(() => {
    return observe(holdingModalDisplayed)
      .pipe(distinctUntilChanged(), tap(console.log))
      .subscribe(async (data) => {
        if (!data) {
          return modal?.close();
        }
        modal?.open();
      });
  });
</script>

<Modal
  bind:this={modal}
  on:close={handleModalClose}
>
  <svelte:fragment slot="title">
    {$getHoldingBySymbol($holdingModalDisplayed.symbol)
      ? `Holding Details - ${$holdingModalDisplayed.symbol}`
      : "Holding Details"}
  </svelte:fragment>

  <PriceHistoryChart
    slot="body"
    priceHistory={$getPriceHistory($holdingModalDisplayed.symbol)}
    holding={$getHoldingBySymbol($holdingModalDisplayed.symbol)}
  />
</Modal>
