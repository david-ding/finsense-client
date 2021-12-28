<script lang="ts">
  import { round } from "lodash-es";
  export let value: number | string;
  export let precision: number = 2;
</script>

{round(Number(value), precision).toFixed(precision).toLocaleString()}
