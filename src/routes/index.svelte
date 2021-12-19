<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  let prices: Record<string, number> = {};
  let socket: WebSocket;

  onMount(() => {
    socket = new WebSocket("wss://ws.finnhub.io?token=bqdeoq7rh5rf95updm4g");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "subscribe",
          symbol: "TSLA",
        }),
      );
      socket.send(
        JSON.stringify({
          type: "subscribe",
          symbol: "RIVN",
        }),
      );
    };

    socket.onmessage = (event) => {
      console.log("Message from server ", event.data);
      const { data } = JSON.parse(event.data);
      console.log(data);
      const tslaData = data.find((d) => d.s === "TSLA");
      const rivnData = data.find((d) => d.s === "RIVN");
      if (tslaData?.p) prices["TSLA"] = tslaData.p;
      if (rivnData?.p) prices["RIVN"] = rivnData.p;
    };
  });

  onDestroy(() => socket?.close());
</script>

<div class="mb-4">
  <p>TSLA stock price: ${prices["TSLA"]}</p>
  <p>RIVN stock price: ${prices["RIVN"]}</p>
</div>

<button class="btn-primary py-2 px-4">Click me</button>
