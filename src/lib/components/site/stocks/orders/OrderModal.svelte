<script lang="ts">
  import type { Order } from "../../../../entities/order";
  import { ordersApiEndpoints } from "../../../../stores/features/orders/orders.api";
  import { createOrderModalDisplayed } from "../../../../stores/features/orders/orders.derived-stores";
  import { ordersActions } from "../../../../stores/features/orders/orders.store";
  import { dispatch } from "../../../../stores/redux-store";
  import Button from "../../../common/Button.svelte";
  import Modal from "../../../common/Modal.svelte";
  import OrderForm from "./OrderForm.svelte";

  let modal: Modal;
  $: $createOrderModalDisplayed ? modal?.open() : modal?.close();

  let order: Order;

  const handleCreateClick = () => {
    dispatch(ordersApiEndpoints.create.initiate(order));
  };

  const handleModalClose = () => {
    dispatch(ordersActions.hideCreateOrderModal()); // sync store state if modal is closed inside Modal component
  };
</script>

<Modal bind:this={modal} on:close={handleModalClose}>
  <svelte:fragment slot="title">Create Order</svelte:fragment>
  <OrderForm slot="body" bind:order />
  <Button class="btn-primary" slot="actionButtons" on:click={handleCreateClick}>Create</Button>
</Modal>
