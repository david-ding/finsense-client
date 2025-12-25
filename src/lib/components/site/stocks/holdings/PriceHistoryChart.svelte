<script lang="ts">
  import type { Holding } from "$lib/entities/holding";
  import type { PriceHistory } from "$lib/stores/features/price-history/price-history.store";
  import Chart from "chart.js/auto";
  import dayjs from "dayjs";
  import { beforeUpdate } from "svelte";

  export let priceHistory: PriceHistory[];
  export let holding: Holding;
  let canvas: HTMLCanvasElement;

  beforeUpdate(() => {
    if (!priceHistory || priceHistory.length === 0) {
      console.log("No price history data available");
      return;
    }

    if (canvas) {
      const chartInstance = Chart.getChart(canvas);
      if (chartInstance) {
        return;
      }
    }

    const labels = priceHistory.map((ph) => dayjs(ph.date).format("DD-MM-YYYY"));
    const data = {
      labels,
      datasets: [
        {
          label: "Price History",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          data: priceHistory.map((ph) => ph.adjustedClose.value),
        },
        {
          label: "Purchase Price",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          data: priceHistory.map(() => holding.avgPrice.value),
        },
      ],
    };

    new Chart(canvas, {
      type: "line",
      data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Price History Chart",
          },
        },
        elements: {
          line: {
            borderWidth: 2,
          },
          point: {
            radius: 0,
          },
        },
      },
    });
  });
</script>

<canvas bind:this={canvas}></canvas>
