<script lang="ts">
  export let to: string = null;
  export let openInNewWindow: boolean = false;
</script>

<a
  class="no-underline text-current cursor-pointer"
  href={to}
  target={openInNewWindow ? "_blank" : undefined}
  on:click
>
  <slot />
</a>
