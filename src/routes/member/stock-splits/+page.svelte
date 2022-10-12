<script lang="ts">
  import Button from "$lib/components/common/Button.svelte";
  import PlusIcon from "$lib/components/common/icons/PlusIcon.svelte";
  import StockSplitModal from "$lib/components/site/stocks/stock-splits/StockSplitModal.svelte";
  import StockSplitsList from "$lib/components/site/stocks/stock-splits/StockSplitsList.svelte";
  import { stockSplitsActions } from "$lib/stores/features/stock-splits/stock-splits.store";
  import { dispatch } from "$lib/stores/redux-store";

  const handleCreateStockSplitClick = () => {
    dispatch(stockSplitsActions.showStockSplitModal(null));
  };
</script>

<h2>Stock Splits</h2>
<Button
  class="btn-phantom sm:absolute sm:top-8 sm:right-4"
  on:click={handleCreateStockSplitClick}
>
  <PlusIcon />
</Button>

<StockSplitModal />
<StockSplitsList class="mt-4" />
