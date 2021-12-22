<script lang="ts">
  import { setContext } from "svelte";
  import type { SelectOption } from "svelte-selectable";
  import type { Order, OrderType } from "../../../../entities/order";
  import { validationErrors } from "../../../../stores/features/orders/orders.derived-stores";
  import { stockSymbolsApiEndpoints } from "../../../../stores/features/stock-symbols/stock-symbols.api";
  import { stockSymbolOptions } from "../../../../stores/features/stock-symbols/stock-symbols.derived-stores";
  import { stockSymbolsActions } from "../../../../stores/features/stock-symbols/stock-symbols.store";
  import { dispatch } from "../../../../stores/redux-store";
  import CurrencyInput from "../../../common/form/CurrencyInput.svelte";
  import DateInput from "../../../common/form/DateInput.svelte";
  import FormField from "../../../common/form/FormField.svelte";
  import Input from "../../../common/form/Input.svelte";
  import Select from "../../../common/form/Select.svelte";
  import Typeahead from "../../../common/form/Typeahead.svelte";

  const ORDER_TYPE_OPTIONS: Array<SelectOption> = [
    { value: "buy", label: "Buy" },
    { value: "sell", label: "Sell" },
  ];

  export let orderType: OrderType = null;
  export let order: Order = { type: orderType };

  setContext("errorMessages", validationErrors);

  const resetStockSymbols = () => dispatch(stockSymbolsActions.reset());
</script>

<div class="grid grid-cols-3 gap-4">
  <FormField class="col-span-2" label="Symbol" name="symbol">
    <Typeahead
      appendTo="#modal-frame"
      bind:value={order.symbol}
      on:clear={resetStockSymbols}
      on:reset={resetStockSymbols}
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
    <CurrencyInput bind:value={order.price} />
  </FormField>
  <FormField class="col-span-3 sm:col-span-1" label="Quantity" name="quantity">
    <Input type="number" bind:value={order.quantity} />
  </FormField>
  <FormField class="col-span-3 sm:col-span-1" label="Fees" name="fee">
    <CurrencyInput bind:value={order.fee} />
  </FormField>
</div>
