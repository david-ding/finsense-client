<script lang="ts">
  import ConfirmModal from "$lib/components/common/ConfirmModal.svelte";
  import DateTimeFormatter from "$lib/components/common/formatters/DateTimeFormatter.svelte";
  import Link from "$lib/components/common/Link.svelte";
  import type { TableColumn } from "$lib/components/common/Table.svelte";
  import Table from "$lib/components/common/Table.svelte";
  import type { ClassNames } from "$lib/entities/class-names";
  import type { StockSplit } from "$lib/entities/stock-split";
  import { stockSplitsApiEndpoints } from "$lib/stores/features/stock-splits/stock-splits.api";
  import {
    isLoading,
    stockSplits,
  } from "$lib/stores/features/stock-splits/stock-splits.derived-stores";
  import { stockSplitsActions } from "$lib/stores/features/stock-splits/stock-splits.store";
  import { dispatch } from "$lib/stores/redux-store";
  import { onMount } from "svelte";

  let classNames: ClassNames = null;
  let confirmModal: ConfirmModal<StockSplit>;

  export { classNames as class };

  const columns: Array<TableColumn> = [{ prop: "symbol" }, { prop: "date" }];

  onMount(() => dispatch(stockSplitsApiEndpoints.index.initiate()));

  function editStockSplit(stockSplitId: string): void {
    dispatch(stockSplitsActions.showStockSplitModal(stockSplitId));
  }

  function deleteStockSplit(stockSplit: StockSplit): void {
    confirmModal.open(stockSplit);
  }

  function confirmDelete(stockSplit: StockSplit): void {
    dispatch(stockSplitsApiEndpoints.delete.initiate(stockSplit.id));
    confirmModal.close();
  }
</script>

<Table
  class={classNames}
  {columns}
  isLoading={$isLoading}
  rows={$stockSplits}
>
  <div
    slot="cell"
    let:column
    let:row
  >
    {#if column.prop === "date"}
      <DateTimeFormatter value={row.date} />
    {:else}
      {row[column.prop]}
    {/if}
  </div>

  <div
    slot="actions"
    let:row
  >
    <Link on:click={() => editStockSplit(row.id)}>Edit</Link>
    <Link
      class="text-red-500 ml-4"
      on:click={() => deleteStockSplit(row)}
    >
      Delete
    </Link>
  </div>
</Table>

<ConfirmModal
  bind:this={confirmModal}
  confirmFn={confirmDelete}
  messageFn={(stockSplit) => `Are you sure to delete this stock split for ${stockSplit.symbol}?`}
/>
