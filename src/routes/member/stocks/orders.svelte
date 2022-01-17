<script lang="ts">
  import Button from "$lib/components/common/Button.svelte";
  import PlusIcon from "$lib/components/common/icons/PlusIcon.svelte";
  import OrderModal from "$lib/components/site/stocks/orders/OrderModal.svelte";
  import OrdersList from "$lib/components/site/stocks/orders/OrdersList.svelte";
  import { ordersActions } from "$lib/stores/features/orders/orders.store";
  import { dispatch } from "$lib/stores/redux-store";

  const handleCreateOrderClick = () => {
    dispatch(ordersActions.showOrderModal(null));
  };
</script>

<h2>Orders</h2>
<Button class="btn-phantom sm:absolute sm:top-8 sm:right-4" on:click={handleCreateOrderClick}>
  <PlusIcon />
</Button>

<OrderModal />
<OrdersList class="mt-4" />
