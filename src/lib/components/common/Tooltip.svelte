<script lang="ts">
  export let message: string = null;

  let visible: boolean = false;

  const show = () => {
    visible = true;
  };

  const hide = () => {
    visible = false;
  };
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  on:mouseover={show}
  on:mouseleave={hide}
>
  <slot />
</div>

{#if visible && message}
  <div class="absolute text-xs top-12 z-10 rounded-md bg-red-500/90 text-white px-2 py-1">
    {message}
  </div>
{/if}
