<script lang="ts">
  export let fill: string = "none";
  export let size: number = 6;
  export let stroke: string = "currentColor";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-{size} w-{size}"
  {fill}
  viewBox="0 0 24 24"
  {stroke}
>
  <slot />
</svg>
