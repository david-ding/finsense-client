<script lang="ts">
  export let precision: number = 2;
  export let numberFormat: string = "en-US";
  export let unsigned: boolean = false;
  export let value: number | string;

  let formattedValue: string;
  $: {
    const adjustedValue = unsigned ? Math.abs(Number(value)) : Number(value);
    formattedValue = adjustedValue.toLocaleString(numberFormat, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision,
    });
  };
</script>

{formattedValue}
