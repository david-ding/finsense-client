<script lang="ts">
  import type { Ratio } from "$lib/entities/ratio";

  export let value: Ratio;
</script>

{#if value}
  {`${value.antecedent}:${value.consequent}`}
{/if}
