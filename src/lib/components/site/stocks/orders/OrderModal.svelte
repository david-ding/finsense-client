<script lang="ts">
  import { lastValueFrom } from "rxjs";
  import { distinctUntilChanged, map, take } from "rxjs/operators";
  import { onMount } from "svelte";
  import { cloneDeep } from "lodash-es";

  import type { Order } from "$lib/entities/order";
  import { ordersApiEndpoints } from "$lib/stores/features/orders/orders.api";
  import { orderModalDisplayed, orders } from "$lib/stores/features/orders/orders.derived-stores";
  import { ordersActions } from "$lib/stores/features/orders/orders.store";
  import { dispatch } from "$lib/stores/redux-store";
  import { observe } from "$lib/utils/store.utils";
  import Button from "$lib/components/common/Button.svelte";
  import Modal from "$lib/components/common/Modal.svelte";
  import OrderForm from "./OrderForm.svelte";

  let modal: Modal;
  let order: Order;

  function handleSubmit() {
    const endpoint = order.id ? ordersApiEndpoints.update : ordersApiEndpoints.create;
    dispatch(endpoint.initiate(order));
  }

  function handleModalClose() {
    dispatch(ordersActions.hideOrderModal()); // sync store state if modal is closed inside Modal component
  }

  async function getOrder(id: string) {
    return await lastValueFrom(
      observe(orders).pipe(
        map((orders) => orders.find((order) => order.id === id)),
        take(1),
      ),
    );
  }

  onMount(() => {
    return observe(orderModalDisplayed)
      .pipe(distinctUntilChanged())
      .subscribe(async (data) => {
        if (!data) {
          return modal?.close();
        }
        const { id } = data;
        order = id ? cloneDeep(await getOrder(id)) : {};

        modal?.open();
      });
  });
</script>

<Modal
  bind:this={modal}
  on:close={handleModalClose}
>
  <svelte:fragment slot="title">
    {order.id ? "Update" : "Create"} Order
  </svelte:fragment>
  <OrderForm
    slot="body"
    bind:order
  />
  <Button
    class="btn-primary"
    slot="actionButtons"
    on:click={handleSubmit}
  >
    {order.id ? "Update" : "Create"}
  </Button>
</Modal>
