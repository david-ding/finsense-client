<script lang="ts">
  import mergeClassNames from "../../utils/merge-class-names";
  import type { ClassNames } from "../../entities/class-names";

  let classNames: ClassNames = null;

  export { classNames as class };
</script>

<span class={mergeClassNames([
  "px-2",
  "inline-flex",
  "text-xs",
  "leading-5",
  "font-semibold",
  "rounded-full",
  classNames,
])}>
  <slot />
</span>
