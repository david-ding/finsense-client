<script lang="ts">
  import "../app.postcss";
  import Sidebar from "../lib/components/site/Sidebar.svelte";
  import type { MenuItem } from "../lib/entities/menu-item";

  const menuItems: Array<MenuItem> = [
    {
      label: "Stocks",
      subItems: [
        {
          label: "Holdings",
          path: "/stocks/holdings",
        },
        {
          label: "Orders",
          path: "/stocks/orders",
        },
      ],
    },
  ];
</script>

<div class="w-64 bg-primary text-white fixed h-screen overflow-y-auto">
  <Sidebar {menuItems} />
</div>

<main class="ml-64 p-4 h-screen overflow-y-auto">
  <slot />
</main>
