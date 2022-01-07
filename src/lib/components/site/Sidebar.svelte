<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { formatDate } from "../../utils/date.utils";
  import mergeClassNames from "../../utils/merge-class-names";
  import type { MenuItem } from "../../entities/menu-item";

  import { isLoading, usdAudRate } from "../../stores/features/exchange-rates/exchange-rates.derived-stores";
  import Button from "../common/Button.svelte";
  import RefreshIcon from "../common/icons/RefreshIcon.svelte";
  import { dispatch } from "../../stores/redux-store";
  import { exchangeRatesApiEndpoints } from "../../stores/features/exchange-rates/exchange-rates.api";

  export let menuItems: Array<MenuItem> = [];

  onMount(() => dispatch(exchangeRatesApiEndpoints.index.initiate()));

  function handleRefreshRateClick(): void {
    dispatch(exchangeRatesApiEndpoints.update.initiate());
  }
</script>

<div class="p-4 -mb-8">
  <div class="mb-4">
    <a href="/">Finsense</a>
  </div>
  <div class="-mx-4 mb-4 px-4 py-2 bg-tertiary text-sm flex justify-between items-center">
    {#if $isLoading}
      <div class="animate-pulse">
        <div class="bg-gray-500 w-36 h-4 mb-2">&nbsp;</div>
        <div class="bg-gray-500 w-44 h-4">&nbsp;</div>
      </div>
    {:else}
      <div>
        <div class="text-yellow-300">1 USD = {$usdAudRate?.value} AUD</div>
        <div class="text-xs text-gray-400">Updated at: {formatDate($usdAudRate?.updatedAt)}</div>
      </div>
      <Button
        class="text-white"
        on:click={handleRefreshRateClick}
      >
        <RefreshIcon />
      </Button>
    {/if}
  </div>
  <nav>
    {#each menuItems as menuItem}
      <div class="mb-8">
        <div class="uppercase text-sm font-bold mb-2">
          {menuItem.label}
        </div>
        <ul>
          {#each menuItem.subItems as subItem}
            <a href={subItem.path}>
              <li
                class={mergeClassNames([
                  "-mx-4",
                  "px-4",
                  "py-1",
                  "hover:bg-secondary",
                  { "bg-secondary": subItem.path === $page.path },
                ])}
              >
                {subItem.label}
              </li>
            </a>
          {/each}
        </ul>
      </div>
    {/each}
  </nav>
</div>
