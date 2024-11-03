<script lang="ts">
  import DateInput from "$lib/components/common/form/DateInput.svelte";
  import FormField from "$lib/components/common/form/FormField.svelte";
  import RatioInput from "$lib/components/common/form/RatioInput.svelte";
  import Typeahead from "$lib/components/common/form/Typeahead.svelte";
  import type { StockSplit } from "$lib/entities/stock-split";
  import { validationErrors } from "$lib/stores/features/stock-splits/stock-splits.derived-stores";
  import { stockSymbolOptions } from "$lib/stores/features/stock-symbols/stock-symbols.derived-stores";
  import { stockSymbolsApiEndpoints } from "$lib/stores/features/stock-symbols/stock-symbols.api";
  import { dispatch } from "$lib/stores/redux-store";
  import { setContext } from "svelte";

  export let stockSplit: StockSplit = { id: null };

  setContext("errorMessages", validationErrors);
</script>

<div class="grid grid-cols-3 gap-4">
  <FormField
    class="col-span-2"
    label="Symbol"
    name="symbol"
  >
    <Typeahead
      appendTo="#modal-frame"
      bind:value={stockSplit.symbol}
      options={$stockSymbolOptions}
      searchFn={(query) => dispatch(stockSymbolsApiEndpoints.search.initiate(query))}
    />
  </FormField>
  <FormField
    class="col-span-1"
    label="Split Ratio"
    name="ratio"
  >
    <RatioInput bind:value={stockSplit.ratio} />
  </FormField>
  <FormField
    class="col-span-3"
    label="Date"
    name="date"
  >
    <DateInput
      maxDate={new Date()}
      bind:value={stockSplit.date}
    />
  </FormField>
</div>
