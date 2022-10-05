<script lang="ts">
  import { onMount } from "svelte";
  import type { ClassNames } from "$lib/entities/class-names";
  import type { Order } from "$lib/entities/order";
  import { ordersApiEndpoints } from "$lib/stores/features/orders/orders.api";
  import { isLoading, orders } from "$lib/stores/features/orders/orders.derived-stores";
  import { ordersActions } from "$lib/stores/features/orders/orders.store";
  import { dispatch } from "$lib/stores/redux-store";
  import Badge from "$lib/components/common/Badge.svelte";
  import ConfirmModal from "$lib/components/common/ConfirmModal.svelte";
  import CurrencyAmountFormatter from "$lib/components/common/formatters/CurrencyAmountFormatter.svelte";
  import DateTimeFormatter from "$lib/components/common/formatters/DateTimeFormatter.svelte";
  import Link from "$lib/components/common/Link.svelte";
  import Table from "$lib/components/common/Table.svelte";
  import type { TableColumn } from "$lib/components/common/Table.svelte";

  let classNames: ClassNames = null;
  let confirmModal: ConfirmModal<Order>;

  export { classNames as class };

  const columns: Array<TableColumn> = [
    { prop: "type" },
    { prop: "symbol" },
    { prop: "price" },
    { prop: "quantity" },
    { prop: "date" },
  ];

  onMount(() => dispatch(ordersApiEndpoints.index.initiate()));

  function editOrder(orderId: string): void {
    dispatch(ordersActions.showOrderModal(orderId));
  }

  function deleteOrder(order: Order): void {
    confirmModal.open(order);
  }

  function confirmDelete(order: Order): void {
    dispatch(ordersApiEndpoints.delete.initiate(order.id));
    confirmModal.close();
  }
</script>

<Table
  class={classNames}
  {columns}
  isLoading={$isLoading}
  rows={$orders}
>
  <div
    slot="cell"
    let:column
    let:row
  >
    {#if column.prop === "price"}
      <CurrencyAmountFormatter amount={row[column.prop]} />
    {:else if column.prop === "date"}
      <DateTimeFormatter value={row.date} />
    {:else if column.prop === "type"}
      <Badge
        class={{
          "bg-green-100 text-green-800": row.type === "buy",
          "bg-red-100 text-red-800": row.type === "sell",
        }}
      >
        {row.type.toUpperCase()}
      </Badge>
    {:else}
      {row[column.prop]}
    {/if}
  </div>

  <div
    slot="actions"
    let:row
  >
    <Link on:click={() => editOrder(row.id)}>Edit</Link>
    <Link
      class="text-red-500 ml-4"
      on:click={() => deleteOrder(row)}
    >
      Delete
    </Link>
  </div>
</Table>

<ConfirmModal
  bind:this={confirmModal}
  confirmFn={confirmDelete}
  messageFn={(order) => `Are you sure to delete this order for ${order.symbol}?`}
/>
