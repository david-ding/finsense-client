<script lang="ts">
  import type { ClassNames } from "$lib/entities/class-names";
  import mergeClassNames from "$lib/utils/merge-class-names";
  import Card from "./Card.svelte";

  export let isLoading: boolean = true;
  let classNames: ClassNames = null;

  export { classNames as class };
</script>

<Card class={mergeClassNames(["px-4", "py-2", "flex", "flex-col", "justify-center", classNames])}>
  <div class="text-xs text-gray-400"><slot name="label" /></div>
  {#if isLoading}
    <div class="animate-pulse bg-gray-500 w-24 leading-4 my-1">&nbsp;</div>
  {:else}
    <div class="font-bold"><slot name="value" /></div>
  {/if}
</Card>
