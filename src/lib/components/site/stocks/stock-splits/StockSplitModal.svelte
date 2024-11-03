<script lang="ts">
  import { lastValueFrom } from "rxjs";
  import { distinctUntilChanged, map, take } from "rxjs/operators";
  import { onMount } from "svelte";
  import { cloneDeep } from "lodash-es";

  import type { StockSplit } from "$lib/entities/stock-split";
  import { stockSplitsApiEndpoints } from "$lib/stores/features/stock-splits/stock-splits.api";
  import {
    stockSplitModalDisplayed,
    stockSplits,
  } from "$lib/stores/features/stock-splits/stock-splits.derived-stores";
  import { stockSplitsActions } from "$lib/stores/features/stock-splits/stock-splits.store";
  import { dispatch } from "$lib/stores/redux-store";
  import { observe } from "$lib/utils/store.utils";
  import Button from "$lib/components/common/Button.svelte";
  import Modal from "$lib/components/common/Modal.svelte";
  import StockSplitForm from "./StockSplitForm.svelte";
  import { holdingsApiEndpoints } from "$lib/stores/features/holdings/holdings.api";

  let modal: Modal;
  let stockSplit: StockSplit;

  function handleSubmit() {
    const endpoint = stockSplit.id
      ? stockSplitsApiEndpoints.update
      : stockSplitsApiEndpoints.create;
    dispatch(endpoint.initiate(stockSplit));
  }

  function handleModalClose() {
    dispatch(stockSplitsActions.hideStockSplitModal()); // sync store state if modal is closed inside Modal component
  }

  async function getStockSplit(id: string) {
    return await lastValueFrom(
      observe(stockSplits).pipe(
        map((stockSplits) => stockSplits.find((stockSplit) => stockSplit.id === id)),
        take(1),
      ),
    );
  }

  onMount(() => {
    dispatch(holdingsApiEndpoints.index.initiate());
    return observe(stockSplitModalDisplayed)
      .pipe(distinctUntilChanged())
      .subscribe(async (data) => {
        if (!data) {
          return modal?.close();
        }
        const { id } = data;
        stockSplit = id ? cloneDeep(await getStockSplit(id)) : { id: null };

        modal?.open();
      });
  });
</script>

<Modal
  bind:this={modal}
  on:close={handleModalClose}
>
  <svelte:fragment slot="title">
    {stockSplit.id ? "Update" : "Create"} Stock Split
  </svelte:fragment>
  <StockSplitForm
    slot="body"
    bind:stockSplit
  />
  <Button
    class="btn-primary"
    slot="actionButtons"
    on:click={handleSubmit}
  >
    {stockSplit.id ? "Update" : "Create"}
  </Button>
</Modal>
