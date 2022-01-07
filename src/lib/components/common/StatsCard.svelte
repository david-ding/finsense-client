<script lang="ts">
  import type { ClassNames } from "../../entities/class-names";
  import mergeClassNames from "../../utils/merge-class-names";
  import Card from "./Card.svelte";

  let classNames: ClassNames = null;

  export { classNames as class };
</script>

<Card
  class={mergeClassNames([
    "px-4",
    "py-2",
    "flex",
    "flex-col",
    "justify-center",
    classNames,
  ])}
>
  <div class="text-xs text-gray-400"><slot name="label" /></div>
  <div class="font-bold"><slot name="value" /></div>
</Card>
