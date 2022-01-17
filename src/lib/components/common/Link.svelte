<script lang="ts">
  import type { ClassNames } from "$lib/entities/class-names";
  import mergeClassNames from "$lib/utils/merge-class-names";

  let classNames: ClassNames = null;
  export let to: string = null;
  export let openInNewWindow: boolean = false;

  export { classNames as class };
</script>

<a
  class={mergeClassNames([
    "no-underline text-current cursor-pointer",
    classNames,
  ])}
  href={to}
  target={openInNewWindow ? "_blank" : undefined}
  on:click
>
  <slot />
</a>
