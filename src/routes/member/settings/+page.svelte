<script lang="ts">
  import Button from "$lib/components/common/Button.svelte";
  import Card from "$lib/components/common/Card.svelte";
  import { stockSymbolsApiEndpoints } from "$lib/stores/features/stock-symbols/stock-symbols.api";
  import { isLoading } from "$lib/stores/features/stock-symbols/stock-symbols.derived-stores";
  import { dispatch } from "$lib/stores/redux-store";

  function handleUpdateSymbolsClick() {
    dispatch(stockSymbolsApiEndpoints.update.initiate());
  }
</script>

<h2>Settings</h2>

<Card class="px-4 py-2 lg:w-1/3 flex justify-between items-center">
  <div class="text-sm">Update Symbols</div>
  <Button
    class="btn btn-primary"
    disabled={$isLoading}
    on:click={handleUpdateSymbolsClick}
  >
    Update
  </Button>
</Card>
