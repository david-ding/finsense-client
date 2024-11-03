<script
  lang="ts"
  context="module"
>
  export type ButtonGroupItem<T> = {
    label: string;
    id?: T;
    onClick: (id: string) => void;
    isActive?: boolean;
  };
</script>

<script lang="ts">
  import Button from "$lib/components/common/Button.svelte";
  import mergeClassNames from "$lib/utils/merge-class-names";

  export let items: ButtonGroupItem<string>[];
</script>

<span class="isolate inline-flex rounded-md h-10">
  {#each items as item, index}
    <Button
      class={mergeClassNames([
        "relative inline-flex items-center px-10 text-sm font-semibold border",
        {
          "hover:bg-gray-600 bg-gray-700 text-white": item.isActive,
          "hover:bg-gray-100 bg-white": !item.isActive,
          "rounded-l-md": index === 0,
          "rounded-r-md": index === items.length - 1,
          "-ml-px": index !== 0,
        },
      ])}
      on:click={() => item.onClick(item.id)}
    >
      {item.label}
    </Button>
  {/each}
</span>
