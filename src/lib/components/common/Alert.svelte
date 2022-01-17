<script lang="ts">
  import CrossIcon from "$lib/components/common/icons/CrossIcon.svelte";
  import Link from "$lib/components/common/Link.svelte";
  import mergeClassNames from "$lib/utils/merge-class-names";

  let shouldRender: boolean = true;

  export let type: "danger" | "success" | "warning" = "success";

  function dismiss(): void {
    shouldRender = false;
  }
</script>

{#if shouldRender}
  <div
    class={mergeClassNames([
      "w-full",
      "rounded",
      "text-white",
      "flex",
      "justify-between",
      "items-center",
      "text-sm",
      "py-2",
      "px-4",
      { "bg-red-500": type === "danger" },
      { "bg-yellow-500": type === "warning" },
      { "bg-green-500": type === "success" },
    ])}
  >
    <slot />
    <Link on:click={dismiss}>
      <CrossIcon />
    </Link>
  </div>
{/if}
