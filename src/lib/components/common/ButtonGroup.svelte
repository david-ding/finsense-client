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
  import type { ClassNames } from "$lib/entities/class-names";
  import mergeClassNames from "$lib/utils/merge-class-names";

  export let items: ButtonGroupItem<string>[];

  let classNames: ClassNames = null;
  export { classNames as class };
</script>

<span class={mergeClassNames(["isolate inline-flex rounded-md w-full h-10", classNames])}>
  {#each items as item, index}
    <Button
      class={mergeClassNames([
        "relative inline-flex items-center text-sm font-semibold border flex-1 justify-center",
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
