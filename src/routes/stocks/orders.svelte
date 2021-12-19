<script lang="ts">
  import Button from "$lib/components/common/Button.svelte";
  import PlusIcon from "$lib/components/common/icons/PlusIcon.svelte";
  import OrderModal from "$lib/components/site/stocks/orders/OrderModal.svelte";
  import { ordersActions } from "../../lib/stores/features/orders/orders.store";
  import { dispatch } from "../../lib/stores/redux-store";

  const handleCreateOrderClick = () => {
    dispatch(ordersActions.showCreateOrderModal());
  };
</script>

<h2>Orders</h2>

<Button class="btn-primary" on:click={handleCreateOrderClick}>
  <PlusIcon slot="leftIcon" />
  Create Order
</Button>

<OrderModal />
