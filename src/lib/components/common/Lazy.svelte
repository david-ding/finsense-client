<script lang="ts">
  import type { SvelteComponent } from "svelte";

  type T = $$Generic<typeof SvelteComponent>;

  export let componentResolver: () => Promise<{ default: T }>;
  export let shouldRender: boolean = false;
</script>

{#if shouldRender}
  {#await componentResolver() then { default: Component }}
    <slot {Component} />
  {/await}
{/if}
