<script lang="ts">
  import dayjs from "dayjs";

  export let value: Date | string;
  export let format: string = "DD/MM/YYYY";
</script>

{#if value}
  {dayjs(value).format(format)}
{/if}
