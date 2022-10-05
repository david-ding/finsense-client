<script lang="ts">
  import { afterUpdate, beforeUpdate } from "svelte";

  let inc: boolean = false;
  let dec: boolean = false;

  export let value: number;
  let prevValue: number;

  beforeUpdate(() => {
    if (value < prevValue) {
      dec = true;
      setTimeout(() => (dec = false), 1000);
    }

    if (value > prevValue) {
      inc = true;
      setTimeout(() => (inc = false), 1000);
    }
  });

  afterUpdate(() => {
    prevValue = value;
  });
</script>

<div
  class:animate-flash-green={inc}
  class:animate-flash-red={dec}
>
  <slot />
</div>
