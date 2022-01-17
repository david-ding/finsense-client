<script lang="ts">
  import type { ClassNames } from "$lib/entities/class-names";
  import mergeClassNames from "$lib/utils/merge-class-names";

  let classNames: ClassNames = null;

  export { classNames as class };
</script>

<div
  class={mergeClassNames([
    "bg-white",
    "shadow",
    "overflow-hidden",
    "border-b",
    "border-gray-200",
    "sm:rounded-lg",
    classNames,
  ])}
>
  <slot />
</div>
