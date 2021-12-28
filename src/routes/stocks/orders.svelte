<script lang="ts">
  import Button from "$lib/components/common/Button.svelte";
  import PlusIcon from "$lib/components/common/icons/PlusIcon.svelte";
  import OrderModal from "$lib/components/site/stocks/orders/OrderModal.svelte";
  import OrdersList from "$lib/components/site/stocks/orders/OrdersList.svelte";
  import { ordersActions } from "../../lib/stores/features/orders/orders.store";
  import { dispatch } from "../../lib/stores/redux-store";

  const handleCreateOrderClick = () => {
    dispatch(ordersActions.showOrderModal(null));
  };
</script>

<h2 class="flex items-center">
  Orders
  <Button class="btn-secondary-outline px-2 ml-4" on:click={handleCreateOrderClick}>
    <PlusIcon />
  </Button>
</h2>

<OrderModal />

<div class="mt-4">
  <OrdersList />
</div>
