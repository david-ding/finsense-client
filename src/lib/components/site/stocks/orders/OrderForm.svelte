<script lang="ts">
  import { setContext } from "svelte";
  import type { SelectOption } from "svelte-selectable";
  import type { Order, OrderType } from "$lib/entities/order";
  import { validationErrors } from "$lib/stores/features/orders/orders.derived-stores";
  import { stockSymbolsApiEndpoints } from "$lib/stores/features/stock-symbols/stock-symbols.api";
  import { stockSymbolOptions } from "$lib/stores/features/stock-symbols/stock-symbols.derived-stores";
  import { stockSymbolsActions } from "$lib/stores/features/stock-symbols/stock-symbols.store";
  import { dispatch } from "$lib/stores/redux-store";
  import CurrencyInput from "$lib/components/common/form/CurrencyInput.svelte";
  import DateInput from "$lib/components/common/form/DateInput.svelte";
  import FormField from "$lib/components/common/form/FormField.svelte";
  import Input from "$lib/components/common/form/Input.svelte";
  import Select from "$lib/components/common/form/Select.svelte";
  import Typeahead from "$lib/components/common/form/Typeahead.svelte";

  const ORDER_TYPE_OPTIONS: Array<SelectOption> = [
    { value: "buy", label: "Buy" },
    { value: "sell", label: "Sell" },
  ];

  export let orderType: OrderType = null;
  export let order: Order = { type: orderType };

  let currencyCode: string;

  setContext("errorMessages", validationErrors);

  const resetStockSymbols = () => dispatch(stockSymbolsActions.reset());
  const setCurrencyCode = (event: CustomEvent) => {
    const stockSymbol = event.detail;
    currencyCode = stockSymbol.value.endsWith(".AX") ? "AUD" : "USD";
  };
</script>

<div class="grid grid-cols-3 gap-4">
  <FormField class="col-span-2" label="Symbol" name="symbol">
    <Typeahead
      appendTo="#modal-frame"
      bind:value={order.symbol}
      on:clear={resetStockSymbols}
      on:reset={resetStockSymbols}
      on:select={setCurrencyCode}
      options={$stockSymbolOptions}
      searchFn={(query) => dispatch(stockSymbolsApiEndpoints.search.initiate(query))}
    />
  </FormField>
  <FormField label="Type" name="type">
    <Select appendTo="#modal-frame" bind:value={order.type} options={ORDER_TYPE_OPTIONS} />
  </FormField>
  <FormField class="col-span-3" label="Date" name="date">
    <DateInput maxDate={new Date()} bind:value={order.date} />
  </FormField>
  <FormField class="col-span-3 sm:col-span-1" label="Price" name="price">
    <CurrencyInput bind:value={order.price} {currencyCode} />
  </FormField>
  <FormField class="col-span-3 sm:col-span-1" label="Quantity" name="quantity">
    <Input type="number" min={0} bind:value={order.quantity} />
  </FormField>
</div>
