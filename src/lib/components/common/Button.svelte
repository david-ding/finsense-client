<script lang="ts">
  import type { ClassNames } from "$lib/entities/class-names";
  import mergeClassNames from "$lib/utils/merge-class-names";

  let classNames: ClassNames = null;
  export { classNames as class };
  export let disabled: boolean = false;
</script>

<button
  class={mergeClassNames(classNames)}
  {disabled}
  on:click
>
  <slot name="leftIcon" />
  <slot />
  <slot name="rightIcon" />
</button>
