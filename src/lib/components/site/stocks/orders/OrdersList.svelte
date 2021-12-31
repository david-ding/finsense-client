<script lang="ts">
  import { onMount } from "svelte";
  import type { Order } from "../../../../entities/order";
  import { ordersApiEndpoints } from "../../../../stores/features/orders/orders.api";
  import { orders } from "../../../../stores/features/orders/orders.derived-stores";
  import { ordersActions } from "../../../../stores/features/orders/orders.store";
  import { dispatch } from "../../../../stores/redux-store";
  import Badge from "../../../common/Badge.svelte";
  import ConfirmModal from "../../../common/ConfirmModal.svelte";
  import CurrencyAmount from "../../../common/formatters/CurrencyAmount.svelte";
  import DateTime from "../../../common/formatters/DateTime.svelte";
  import Link from "../../../common/Link.svelte";
  import Table, { TableColumn } from "../../../common/Table.svelte";

  let confirmModal: ConfirmModal<Order>;

  const columns: Array<TableColumn> = [
    { prop: "type" },
    { prop: "symbol" },
    { prop: "price" },
    { prop: "quantity" },
    { prop: "fee" },
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

<Table {columns} rows={$orders}>
  <div slot="cell" let:column let:row>
    {#if column.prop === "price" || column.prop === "fee"}
      <CurrencyAmount amount={row[column.prop]} />
    {:else if column.prop === "date"}
      <DateTime value={row.date} />
    {:else if column.prop === "type"}
      <Badge class={{
        "bg-green-100 text-green-800": row.type === "buy",
        "bg-red-100 text-red-800": row.type === "sell",
      }}>
        {row.type.toUpperCase()}
      </Badge>
    {:else}
      {row[column.prop]}
    {/if}
  </div>

  <div slot="actions" let:row>
    <Link on:click={() => editOrder(row.id)}>
      Edit
    </Link>
    <Link class="text-red-500 ml-4" on:click={() => deleteOrder(row)}>
      Delete
    </Link>
  </div>
</Table>

<ConfirmModal
  bind:this={confirmModal}
  confirmFn={confirmDelete}
  messageFn={(order) => `Are you sure to delete this order for ${order.symbol}?`}
/>
